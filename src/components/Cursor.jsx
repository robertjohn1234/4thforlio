// A ring that follows the mouse and grows over links/buttons/cards (desktop only).
import { useRef } from 'react';
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/gsap';

export default function Cursor() {
  const ref = useRef(null);

  useGSAP(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const el = ref.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    const move = (e) => {
      document.body.classList.add('has-cursor');
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const hovering = e.target.closest('a, button, .project-card');
      el.classList.toggle('is-hover', Boolean(hovering));
    };
    const leave = () => document.body.classList.remove('has-cursor');

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.body.classList.remove('has-cursor');
    };
  });

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
