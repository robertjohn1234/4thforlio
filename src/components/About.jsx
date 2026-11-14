import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { about } from '../data';

export default function About() {
  const ref = useRef(null);
  const statementRef = useRef(null);
  useReveal(ref);

  // Words of the big statement light up one by one, tied to the scrollbar
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          statementRef.current.querySelectorAll('.w'),
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <SectionLabel index="01" label="About me" />

        <p className="statement" ref={statementRef}>
          {about.statement.split(' ').map((word, i) => (
            <span className="w" key={i}>
              {word}{' '}
            </span>
          ))}
        </p>

        <div className="about__grid">
          <div className="about__text" data-reveal>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="about__stats">
            {about.stats.map((s) => (
              <li key={s.label} data-reveal>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
