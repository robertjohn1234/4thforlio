import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { experience, education } from '../data';

export default function Experience() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const fillRef = useRef(null);
  useReveal(ref);

  // The timeline line "draws" itself as you scroll, and each dot lights up as you reach it
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: true,
            },
          }
        );

        timelineRef.current.querySelectorAll('.job').forEach((job) => {
          gsap.fromTo(job, { '--dot-on': 0 }, {
            '--dot-on': 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: job,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <SectionLabel index="02" label="Experience" />
        <h2 className="section__title" data-reveal>
          Where I've <span className="accent">worked</span>
        </h2>

        <ol className="timeline" ref={timelineRef}>
          <span className="timeline__line" aria-hidden="true">
            <span className="timeline__fill" ref={fillRef} />
          </span>

          {experience.map((job) => (
            <li className="job" key={`${job.company}-${job.period}`} data-reveal>
              <div className="job__meta">
                <span className="job__period">{job.period}</span>
                <span className="job__location">{job.location}</span>
              </div>
              <div className="job__card">
                <h3>{job.role}</h3>
                <p className="job__company">{job.company}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="edu__title" data-reveal>
          Education
        </h3>
        <div className="edu__grid">
          {education.map((e) => (
            <div className="edu-card" key={e.school} data-reveal>
              <span className="job__period">{e.period}</span>
              <h4>{e.course}</h4>
              <p>{e.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
