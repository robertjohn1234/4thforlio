import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { scrollToTarget } from '../lib/lenis';
import { profile, navLinks } from '../data';

export default function Navbar() {
  const navRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    // Thin progress bar at the top that fills as you scroll the page
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }
    );

    // Hide the navbar when scrolling down, show it when scrolling up
    const hide = gsap.to(navRef.current, {
      yPercent: -100,
      duration: 0.35,
      ease: 'power2.out',
      paused: true,
    });
    ScrollTrigger.create({
      start: 120,
      end: 'max',
      onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
      onLeaveBack: () => hide.reverse(),
    });

    // Intro: slide down on page load
    gsap.from(navRef.current, { y: -30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  });

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <header className="nav" ref={navRef}>
        <a href="#home" className="nav__logo" onClick={(e) => go(e, '#home')}>
          {profile.initials}
          <span>.</span>
        </a>
        <nav className="nav__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
