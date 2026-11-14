export default function SectionLabel({ index, label }) {
  return (
    <p className="section-label" data-reveal>
      <span className="section-label__index">{index}</span>
      <span className="section-label__line" />
      <span>{label}</span>
    </p>
  );
}
