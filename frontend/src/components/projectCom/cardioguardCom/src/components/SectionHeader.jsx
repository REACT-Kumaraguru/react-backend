export default function SectionHeader({ eyebrow, title, copy, align = 'center' }) {
  return (
    <div className={`reveal mx-auto max-w-3xl ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-green-deep">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-tight text-ink md:text-6xl">{title}</h2>
      {copy && <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">{copy}</p>}
    </div>
  );
}
