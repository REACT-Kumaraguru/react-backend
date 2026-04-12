import { Link } from 'react-router-dom';
import { normalizeAccentHex } from './programmeAccentColor';

/** Split "Title — description" or "Title - description" for bold + muted styling */
function splitFeatureLine(text) {
  const s = String(text).trim();
  const m = s.match(/^(.+?)\s*[—–-]\s+(.+)$/s);
  if (m) return { lead: m[1].trim(), rest: m[2].trim() };
  return { lead: null, rest: s };
}

/**
 * Public programme card — dynamic info row, features, eligibility, CTA.
 * Footer button defaults to /fellowship/:slug (track page; apply at /fellowship/:slug/forms) when link override is empty.
 * @param {'default'|'detail'} variant - detail: hide footer CTA (detail page has form below)
 * @param {boolean} preview - admin preview: no navigation on title or CTA
 */
export default function ProgrammeCard({ programme, variant = 'default', onSelect, selected = false, preview = false }) {
  const accent =
    normalizeAccentHex(programme.accentColor) ||
    (programme.theme === 'purple' ? '#a855f7' : '#f97316');
  const info = Array.isArray(programme.info) ? programme.info.filter((x) => x?.label && x?.value) : [];
  const features = Array.isArray(programme.features) ? programme.features.filter(Boolean) : [];
  const explicitLink = programme.buttonLink?.trim();
  const slugPath =
    !preview && programme.slug && String(programme.slug).trim()
      ? `/fellowship/${encodeURIComponent(String(programme.slug).trim())}`
      : null;
  const hasCtaTarget = Boolean(
    explicitLink || (programme.slug && String(programme.slug).trim()),
  );
  const cta = programme.buttonText?.trim() || 'Learn more';

  const CtaContent = () => (
    <span className="inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800">
      {cta}
      <span className="ml-1" aria-hidden>
        →
      </span>
    </span>
  );

  const renderCta = () => {
    if (preview) {
      if (!hasCtaTarget) {
        return (
          <span
            className="pointer-events-none inline-flex select-none rounded-md bg-slate-200 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-500"
            title="Add a URL slug or custom button link to enable this button"
          >
            {cta}
          </span>
        );
      }
      return (
        <span
          className="pointer-events-none inline-flex select-none opacity-[0.92]"
          title="Preview — not clickable"
        >
          <CtaContent />
        </span>
      );
    }
    if (!explicitLink && !slugPath) {
      return (
        <span className="inline-flex cursor-not-allowed rounded-md bg-slate-200 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          {cta}
        </span>
      );
    }
    const href = explicitLink || slugPath;
    const formHint =
      !explicitLink && slugPath
        ? `${cta} — open programme page and application form`
        : `${cta} — open link`;
    if (!href) return null;

    if (/^https?:\/\//i.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" title={formHint}>
          <CtaContent />
        </a>
      );
    }
    return (
      <Link to={href} title={formHint}>
        <CtaContent />
      </Link>
    );
  };

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl border-t-4 border-solid border-transparent bg-white p-6 shadow-md ring-1 ring-slate-100 ${
        selected ? 'ring-2 ring-slate-900/10' : ''
      }`}
      style={{ borderTopColor: accent }}
    >
      {programme.tagline ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{programme.tagline}</p>
      ) : null}

      <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-slate-900 sm:text-[1.65rem]">
        {variant === 'default' && slugPath && !explicitLink ? (
          <Link to={slugPath} className="hover:text-orange-700">
            {programme.title}
          </Link>
        ) : (
          programme.title
        )}
      </h2>

      {programme.shortDescription ? (
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{programme.shortDescription}</p>
      ) : null}

      <div className="my-5 border-t border-slate-200" />

      {info.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {info.map((row) => (
            <div key={`${row.label}-${row.value}`}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{row.label}</p>
              <p className="mt-1 text-lg font-bold leading-snug text-slate-900">{row.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {info.length > 0 && (programme.longDescription || features.length) ? (
        <div className="my-5 border-t border-slate-200" />
      ) : null}

      {programme.longDescription ? (
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{programme.longDescription}</div>
      ) : null}

      {features.length > 0 ? (
        <ul className={programme.longDescription ? 'mt-4' : 'mt-0'}>
          {features.map((f) => {
            const { lead, rest } = splitFeatureLine(f);
            return (
              <li key={f} className="flex items-start gap-2.5 py-1.5 text-sm">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
                <span className="text-slate-800">
                  {lead ? (
                    <>
                      <span className="font-bold text-slate-900">{lead}</span>
                      <span className="text-slate-600"> — {rest}</span>
                    </>
                  ) : (
                    rest
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-1 flex-col justify-end pt-6">
        {variant === 'detail' ? (
          programme.eligibility ? (
            <div className="border-t border-slate-200 pt-5">
              <p className="text-sm text-slate-500">{programme.eligibility}</p>
            </div>
          ) : null
        ) : (
          <div className="border-t border-slate-200 pt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">{programme.eligibility || '\u00a0'}</p>
              <div className="shrink-0">{renderCta()}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
