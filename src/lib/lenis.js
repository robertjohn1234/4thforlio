// Smooth scrolling with Lenis, kept in sync with GSAP ScrollTrigger.
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis = null;

export function useSmoothScroll() {
  useEffect(() => {
    // Respect visitors who turned off animations in their system settings
    if (prefersReducedMotion()) return;

    lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    // Tell ScrollTrigger whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both use the same animation frame
    const update = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

// Smoothly scroll to a section, e.g. scrollToTarget('#projects')
export function scrollToTarget(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: selector === '#home' ? 0 : -40 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
