import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer } from '../lib/gsap';
import { scrollToTarget } from '../lib/lenis';
import { profile } from '../data';

// Splits text into words and letters so each letter can animate on its own
function SplitWords({ text }) {
  return text.split(' ').map((word, w) => (
    <span className="word" key={w}>
      {word.split('').map((ch, c) => (
        <span className="char" key={c}>
          {ch}
        </span>
      ))}
    </span>
  ));
}

export default function Hero() {
  const ref = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Intro timeline: letters rise up one by one, then the rest fades in
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 }, 0.3)
          .from('.char', { yPercent: 110, duration: 1, stagger: 0.025 }, 0.4)
          .from('.hero__sub', { y: 30, opacity: 0, duration: 1 }, '-=0.6')
          .from('.hero__cta > *', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.7')
          .from('.hero__scroll', { opacity: 0, duration: 1 }, '-=0.4');

        // 2. As you scroll away, the hero content drifts up and fades out
        gsap.to(contentRef.current, {
          yPercent: -25,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });

        // 3. Background blobs follow the mouse slightly (desktop only)
        if (!hasFinePointer()) return;
        const movers = [...ref.current.querySelectorAll('.blob-wrap')].map((el, i) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power3.out' }),
          depth: (i + 1) * 40,
        }));
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.depth);
            m.y(ny * m.depth);
          });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const lastLine = profile.heroTitle.length - 1;

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <div className="blob-wrap"><div className="blob blob--1" /></div>
        <div className="blob-wrap"><div className="blob blob--2" /></div>
        <div className="blob-wrap"><div className="blob blob--3" /></div>
        <div className="hero__grid" />
      </div>

      <div className="container hero__content" ref={contentRef}>
        <p className="hero__eyebrow">
          <span className="dot" /> {profile.availability}
        </p>

        <h1 className="hero__title" aria-label={profile.heroTitle.join(' ')}>
          {profile.heroTitle.map((line, i) => (
            <span className={`line${i === lastLine ? ' line--accent' : ''}`} key={i} aria-hidden="true">
              <SplitWords text={line} />
            </span>
          ))}
        </h1>

        <p className="hero__sub">{profile.intro}</p>

        <div className="hero__cta">
          <button className="btn btn--primary" onClick={() => scrollToTarget('#projects')}>
            View my work →
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToTarget('#contact')}>
            Get in touch
          </button>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
