import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import SectionLabel from './SectionLabel.jsx';
import { skills } from '../data';

export default function Skills() {
  const ref = useRef(null);
  useReveal(ref);

  // Split all skills into two rows for the scrolling marquee
  const all = skills.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <SectionLabel index="03" label="Skills & tools" />
        <h2 className="section__title" data-reveal>
          Things I <span className="accent">work with</span>
        </h2>
      </div>

      {/* Infinite scrolling text rows (the list is repeated 4x so it loops seamlessly) */}
      <div className="marquee-wrap" aria-hidden="true">
        {rows.map((row, r) => (
          <div className={`marquee${r % 2 ? ' marquee--reverse' : ''}`} key={r}>
            <div className="marquee__track">
              {[...row, ...row, ...row, ...row].map((skill, i) => (
                <span className="marquee__item" key={i}>
                  {skill}
                  <span className="marquee__sep">✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container skills__grid">
        {skills.map((group) => (
          <div className="skill-card" key={group.group} data-reveal>
            <h3>{group.group}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
