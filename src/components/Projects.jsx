import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { projects, profile } from '../data';

// A card that tilts in 3D toward the mouse, with a soft spotlight
function ProjectCard({ project, index }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!hasFinePointer()) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    });
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };

  const onLeave = () =>
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });

  return (
    <article
      className="project-card"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ '--card-accent': project.color }}
    >
      <div className="project-card__media">
        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
        ) : (
          <span className="project-card__placeholder">{project.title}</span>
        )}
      </div>

      <div className="project-card__body">
        <span className="project-card__num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-card__links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live site ↗
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noreferrer">
              Code ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  useReveal(sectionRef);

  // Desktop: the section pins in place and the cards scroll sideways as you scroll down.
  // Mobile / reduced motion: cards simply stack vertically.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;

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
        {projects.map((p, i) => (
          <ProjectCard project={p} index={i} key={p.title} />
        ))}
        {github && (
          <a className="project-card project-card--more" href={github.url} target="_blank" rel="noreferrer">
            <span>
              More on GitHub <span className="accent">↗</span>
            </span>
          </a>
        )}
      </div>
    </section>
  );
}
