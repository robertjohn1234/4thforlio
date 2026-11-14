// Fades + slides up every element with a `data-reveal` attribute
// inside the given section when it scrolls into view.
import { gsap, useGSAP } from '../lib/gsap';

export function useReveal(scopeRef) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        scopeRef.current.querySelectorAll('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}
