import { Link } from 'react-router-dom';
import React from 'react';

const DEFAULT_ACCENT = '#E46F47';

function normalizeMetaList(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((x) => ({
      label: String(x?.label ?? '').trim(),
      value: String(x?.value ?? '').trim(),
    }))
    .filter((x) => x.label || x.value);
}

function buildStats(meta_stats, duration, format) {
  const fromMeta = normalizeMetaList(meta_stats);
  if (fromMeta.length) return fromMeta;
  const fb = [];
  if (duration) fb.push({ label: 'Duration', value: duration });
  if (format) fb.push({ label: 'Format', value: format });
  return fb;
}

/**
 * Programme card — Venture Fellowship style: orange top accent, serif title,
 * stats grid, description + bullets, footnote + coral CTA.
 */
const Card = ({
  title,
  tagline,
  who,
  duration,
  format,
  description,
  meta_stats,
  bullets,
  footnote,
  ctaText = 'Apply',
  comingSoon = false,
  link,
  accentColor,
}) => {
  const accent = accentColor?.trim() || DEFAULT_ACCENT;
  const stats = buildStats(meta_stats, duration, format);
  const bulletList = Array.isArray(bullets) ? bullets.map((s) => String(s).trim()).filter(Boolean) : [];

  const ctaClass =
    'inline-flex items-center justify-center rounded-md px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-sm transition hover:opacity-95 active:scale-[0.99]';

  const CtaInner = ({ children }) => (
    <span className={ctaClass} style={{ backgroundColor: accent }}>
      {children}
    </span>
  );

  return (
    <article className="relative w-full max-w-4xl font-sans text-[#0f172a]">
      {comingSoon ? (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-slate-200 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow">
          Coming Soon
        </div>
      ) : null}

      <div
        className={`overflow-hidden rounded-sm border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${
          comingSoon ? 'opacity-95' : ''
        }`}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: accent }} aria-hidden />

        {/* Header */}
        <div className="border-b border-slate-200 px-6 pb-6 pt-6 sm:px-8">
          {who ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">{who}</p>
          ) : null}
          <h2
            className={`mt-2 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-[2rem] ${
              comingSoon ? 'text-slate-500' : 'text-slate-900'
            }`}
          >
            {title}
          </h2>
          {tagline ? (
            <p className="mt-3 text-[17px] leading-relaxed text-slate-700 sm:text-[18px]">{tagline}</p>
          ) : null}
        </div>

        {/* Stats row */}
        {stats.length > 0 ? (
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-x-4">
              {stats.map((s) => (
                <div key={`${s.label}-${s.value}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{s.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Body + bullets */}
        <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
          {description ? (
            <p className="text-base leading-relaxed text-slate-700">{description}</p>
          ) : null}
          {bulletList.length > 0 ? (
            <ul className={description ? 'mt-5 space-y-2.5' : 'space-y-2.5'}>
              {bulletList.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] leading-snug text-slate-800">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Footer: footnote + CTA */}
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="min-h-[44px] flex-1 text-sm text-slate-500">{footnote}</p>
          <div className="shrink-0">
            {link && !comingSoon ? (
              /^https?:\/\//i.test(link) ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <CtaInner>
                    {ctaText}
                    <span aria-hidden> →</span>
                  </CtaInner>
                </a>
              ) : (
                <Link to={link}>
                  <CtaInner>
                    {ctaText}
                    <span aria-hidden> →</span>
                  </CtaInner>
                </Link>
              )
            ) : (
              <button type="button" disabled className={`${ctaClass} cursor-not-allowed bg-slate-200 text-slate-500`}>
                {comingSoon ? 'Coming soon' : `${ctaText} →`}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
