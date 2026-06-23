import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgrammeCard from '../components/programmes/ProgrammeCard';
import { fetchProgrammeBySlug } from '../api/programmesApi';
import { getFellowshipTrackBySlug } from '../data/fellowshipTracks';

function normalizeSlugParam(slug) {
  return String(slug || '').trim();
}

export default function FellowshipTrackPage() {
  const { slug: slugParam } = useParams();
  const slug = normalizeSlugParam(slugParam);
  const staticTrack = getFellowshipTrackBySlug(slug);
  const [apiProgramme, setApiProgramme] = useState(undefined);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (!slug || staticTrack) {
      setApiProgramme(null);
      return;
    }
    let cancelled = false;
    setApiError('');
    (async () => {
      try {
        const data = await fetchProgrammeBySlug(slug);
        if (!cancelled) setApiProgramme(data ?? null);
      } catch (e) {
        if (!cancelled) {
          setApiError(e.message || 'Could not load programme');
          setApiProgramme(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, staticTrack]);

  const formsPath = useMemo(() => `/fellowship/${encodeURIComponent(slug)}/forms`, [slug]);

  if (!slug) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-center text-slate-600">
        <Link to="/" className="font-semibold text-[#FF6B5C] hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  /* ——— CMS programme (no static template) ——— */
  if (!staticTrack) {
    if (apiProgramme === undefined) {
      return (
        <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-center text-slate-600">
          <p>Loading…</p>
        </main>
      );
    }
    if (!apiProgramme) {
      return (
        <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-slate-900">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="font-serif text-2xl font-semibold">Programme not found</h1>
            <p className="mt-3 text-slate-600">
              {apiError || 'There is no published programme at this address.'}
            </p>
            <Link to="/programmes" className="mt-6 inline-block font-semibold text-[#FF6B5C] hover:underline">
              ← Browse programmes
            </Link>
          </div>
        </main>
      );
    }

    const accent = apiProgramme.accentColor || '#FF6B5C';

    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] text-[#0F172A]">
        <section
          className="relative overflow-hidden bg-[#0F2A44] text-white"
          style={{ borderBottom: `3px solid ${accent}` }}
        >
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-28 sm:pt-32 md:pt-36">
            <p className="text-[11px] tracking-[0.22em] text-white/60">REACT Programme</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              {apiProgramme.title}
            </h1>
            <p className="mt-3 text-base font-sans font-normal text-white/75 sm:text-lg">Details</p>
            {apiProgramme.shortDescription ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                {apiProgramme.shortDescription}
              </p>
            ) : null}
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
          <div className="mb-8 flex flex-col items-center gap-4">
            <Link
              to="/programmes"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              ← Back to all programmes
            </Link>
          </div>

          <ProgrammeCard programme={apiProgramme} selected variant="detail" />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="font-semibold text-slate-900">Apply to this programme</p>
            <p className="mt-2 text-sm text-slate-600">Applications are on the dedicated form page for this track.</p>
            <Link
              to={formsPath}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a49]"
            >
              Open application form
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ——— Static fellowship template ——— */
  const track = staticTrack;
  const formPath = `/fellowship/${encodeURIComponent(track.slug)}/forms`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] text-[#0F172A]">
      <section
        className="relative overflow-hidden bg-[#0F2A44] text-white"
        style={{ borderBottom: `3px solid ${track.accent}` }}
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-28 sm:pt-32 md:pt-36">
          <p className="text-[11px] tracking-[0.22em] text-white/60">Fellowship track</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-5xl md:text-6xl">{track.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{track.heroFor}</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-6 py-14 sm:py-16">
        <section aria-labelledby="what-you-build">
          <h2 id="what-you-build" className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
            What you build
          </h2>
          <p className="mt-2 text-sm text-slate-500">The outputs for this track (team to finalise wording).</p>
          <ul className="mt-6 space-y-3">
            {track.outputs.map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed text-slate-700">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: track.accent }}
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="the-journey">
          <h2 id="the-journey" className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
            The journey
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Milestone timeline — dates are placeholders until the team updates them.
          </p>
          <ol className="relative mt-8 space-y-0 border-l border-slate-200 pl-8">
            {track.milestones.map((m, i) => (
              <li key={`${m.title}-${i}`} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ring-1 ring-slate-300"
                  style={{ backgroundColor: i === track.milestones.length - 1 ? track.accent : '#e2e8f0' }}
                  aria-hidden
                />
                <p className="font-semibold text-slate-900">{m.title}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{m.date}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="eligibility">
          <h2 id="eligibility" className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
            Eligibility
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{track.eligibility}</p>
        </section>

        <section aria-labelledby="admission">
          <h2 id="admission" className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
            Admission process
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{track.admission}</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="font-serif text-xl font-semibold text-slate-900 sm:text-2xl">Ready to take the next step?</h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={formPath}
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[#FF6B5C] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a49] sm:text-base"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 sm:text-base"
            >
              Book a Call
            </Link>
          </div>
        </section>

        <p className="text-center text-sm text-slate-500">
          <Link to="/" className="font-medium text-slate-700 hover:text-[#FF6B5C]">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
