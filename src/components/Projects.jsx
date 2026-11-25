import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollTrigger, useGSAP, hasFinePointer } from '../lib/gsap';
import { getLenis } from '../lib/lenis';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { projects, profile } from '../data';

// 3D tilt toward the mouse + soft spotlight (desktop only)
function useTilt() {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!hasFinePointer()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    });
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };

  const onMouseLeave = () =>
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });

  return { ref, onMouseMove, onMouseLeave };
}

// "Live demo" + "GitHub" buttons. Shows "Demo coming soon" when there are no links yet.
function ProjectLinks({ live, code }) {
  if (!live && !code) return <span className="pill-muted">Demo coming soon</span>;
  return (
    <>
      {live && (
        <a className="plink plink--primary" href={live} target="_blank" rel="noreferrer">
          Live demo ↗
        </a>
      )}
      {code && (
        <a className="plink" href={code} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      )}
    </>
  );
}

function ProjectCard({ project, index }) {
  const tilt = useTilt();
  const media = project.image ? (
    <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
  ) : (
    <span className="project-card__placeholder">{project.title}</span>
  );

  return (
    <article className="project-card" {...tilt} style={{ '--card-accent': project.color }}>
      {/* The picture opens the live demo too, when there is one */}
      {project.live ? (
        <a
          className="project-card__media"
          href={project.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title} live demo`}
        >
          {media}
          <span className="project-card__view">View live ↗</span>
        </a>
      ) : (
        <div className="project-card__media">{media}</div>
      )}

      <div className="project-card__body">
        <span className="project-card__num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-card__links">
          <ProjectLinks live={project.live} code={project.code} />
        </div>
      </div>
    </article>
  );
}

// A "folder" card that groups several small sites (ice cream, cakes, ...)
function CollectionCard({ project, index, onOpen }) {
  const tilt = useTilt();
  const preview = project.sites.slice(0, 3);

  return (
    <article className="project-card project-card--collection" {...tilt} style={{ '--card-accent': project.color }}>
      <button className="project-card__media folder" onClick={onOpen} aria-label={`Open ${project.title} folder`}>
        <span className="folder__tab">
          {project.sites.length} site{project.sites.length > 1 ? 's' : ''} inside
        </span>
        <span className="folder__stack" aria-hidden="true">
          {preview.map((s, i) => (
                        <span
              className="mini-site"
              key={s.name}
              style={{
                '--c': s.color,
                '--n': i,
                // Use the site's screenshot on the tile when there is one
                ...(s.image && {
                  backgroundImage: `linear-gradient(rgba(0,0,0,0) 35%, rgba(10,10,15,0.85)), url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }),
              }}
            >
              <span className="mini-site__bar">
                <i />
                <i />
                <i />
              </span>
              <strong>{s.name}</strong>
              <small>{s.kind}</small>
            </span>
          ))}
        </span>
        <span className="project-card__view">Open folder →</span>
      </button>

      <div className="project-card__body">
        <span className="project-card__num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <ul className="site-list">
          {project.sites.slice(0, 2).map((s) => (
            <li key={s.name}>
              <span className="site-list__dot" style={{ background: s.color }} />
              <span className="site-list__name">
                {s.name}
                <small>{s.kind}</small>
              </span>
              {s.live ? (
                <a href={s.live} target="_blank" rel="noreferrer">
                  Live ↗
                </a>
              ) : (
                <span className="soon">{s.status || 'Coming soon'}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="project-card__links">
          <button className="plink plink--primary" onClick={onOpen}>
            Open folder ({project.sites.length})
          </button>
        </div>
      </div>
    </article>
  );
}

// Popup listing every site in a folder
function SitesModal({ project, onClose }) {
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop(); // pause smooth scroll behind the popup
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="sites-modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <div className="sites-modal__panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
        <div className="sites-modal__head">
          <div>
            <span className="project-card__num">Folder</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <button className="sites-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="sites-grid">
          {project.sites.map((s) => (
            <article className="site-card" key={s.name} style={{ '--c': s.color }}>
              <div className="site-card__preview">
                {s.image ? <img src={s.image} alt={`${s.name} screenshot`} loading="lazy" /> : <span>{s.name}</span>}
                <span className={`site-card__status${s.live ? ' is-live' : ''}`}>
                  {s.live ? 'Live' : s.status || 'Coming soon'}
                </span>
              </div>
              <div className="site-card__body">
                <h4>{s.name}</h4>
                <small>{s.kind}</small>
                <p>{s.description}</p>
                <div className="project-card__links">
                  <ProjectLinks live={s.live} code={s.code} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [openFolder, setOpenFolder] = useState(null);
  const closeFolder = useCallback(() => setOpenFolder(null), []);
  useReveal(sectionRef);

  // Desktop: the section pins in place and the cards scroll sideways as you scroll down.
  // Mobile / reduced motion: cards simply stack vertically.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Re-measure once all images have loaded, so the last card is always reachable
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh, { once: true });
    return () => window.removeEventListener('load', refresh);
  }, []);

  const github = profile.socials.find((s) => s.label === 'GitHub');

  return (
    <section id="projects" className="section projects" ref={sectionRef}>
      <div className="container projects__head">
        <div>
          <SectionLabel index="04" label="Selected work" />
          <h2 className="section__title" data-reveal>
            Featured <span className="accent">projects</span>
          </h2>
        </div>
        <p className="projects__hint" data-reveal>
          Keep scrolling →
        </p>
      </div>

      <div className="projects__track" ref={trackRef}>
        {projects.map((p, i) =>
          p.sites ? (
            <CollectionCard project={p} index={i} key={p.title} onOpen={() => setOpenFolder(p)} />
          ) : (
            <ProjectCard project={p} index={i} key={p.title} />
          )
        )}
        {github && (
          <a className="project-card project-card--more" href={github.url} target="_blank" rel="noreferrer">
            <span>
              More on GitHub <span className="accent">↗</span>
            </span>
          </a>
        )}
      </div>

      {openFolder && <SitesModal project={openFolder} onClose={closeFolder} />}
    </section>
  );
}
