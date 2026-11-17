import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { profile, contact } from '../data';

export default function Contact() {
  const ref = useRef(null);
  const btnRef = useRef(null);
  useReveal(ref);

  // "Magnetic" button: it gets pulled toward the mouse when you hover near it
  useGSAP(
    () => {
      if (!hasFinePointer()) return;
      const btn = btnRef.current;
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'power3.out' });

      const move = (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };

      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
      return () => {
        btn.removeEventListener('mousemove', move);
        btn.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <SectionLabel index="05" label="Contact" />

        <h2 className="contact__title" data-reveal>
          Let's build
          <br />
          <span className="accent">something.</span>
        </h2>

        <p className="contact__text" data-reveal>
          {contact.text}
        </p>

        <div className="contact__cta" data-reveal>
          <a ref={btnRef} className="btn btn--primary btn--big" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <ul className="socials" data-reveal>
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
