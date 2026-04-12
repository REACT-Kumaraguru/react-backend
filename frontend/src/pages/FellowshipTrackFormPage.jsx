import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgrammeDynamicForm from '../components/programmes/ProgrammeDynamicForm';
import { fetchProgrammeBySlug } from '../api/programmesApi';
import { getFellowshipTrackBySlug } from '../data/fellowshipTracks';

/**
 * Application forms: /fellowship/:slug/forms
 * - CMS programme: dynamic fields via ProgrammeDynamicForm (same API as before).
 * - Static track: optional externalFormUrl redirect in fellowshipTracks.js, else placeholder.
 */
export default function FellowshipTrackFormPage() {
  const { slug: slugParam } = useParams();
  const slug = String(slugParam || '').trim();
  const staticTrack = getFellowshipTrackBySlug(slug);
  const trackPath = slug ? `/fellowship/${encodeURIComponent(slug)}` : '/';

  const externalStatic = String(staticTrack?.externalFormUrl || '').trim();
  const isExternalStatic = /^https?:\/\//i.test(externalStatic);

  const [programme, setProgramme] = useState(undefined);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (staticTrack && isExternalStatic) {
      window.location.replace(externalStatic);
    }
  }, [staticTrack, isExternalStatic, externalStatic]);

  useEffect(() => {
    if (!slug) return;
    if (staticTrack) {
      setProgramme(null);
      return;
    }
    let cancelled = false;
    setLoadError('');
    setProgramme(undefined);
    (async () => {
      try {
        const data = await fetchProgrammeBySlug(slug);
        if (!cancelled) setProgramme(data ?? null);
      } catch (e) {
        if (!cancelled) {
          setLoadError(e.message || 'Could not load programme');
          setProgramme(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, staticTrack]);

  if (!slug) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-center text-slate-600">
        <Link to="/" className="font-semibold text-[#FF6B5C] hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  if (staticTrack && isExternalStatic) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28">
        <div className="mx-auto max-w-md text-center">
          <p className="text-slate-600">Opening application form…</p>
          <a href={externalStatic} className="mt-4 inline-block font-semibold text-[#FF6B5C] hover:underline">
            Continue to form
          </a>
        </div>
      </main>
    );
  }

  if (programme === undefined && !staticTrack) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-center text-slate-600">
        <p>Loading…</p>
      </main>
    );
  }

  if (programme?.formFields?.length > 0 && programme.slug) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] pb-16 pt-24 text-[#0F172A] sm:pt-28">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Apply</p>
            <h1 className="mt-2 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">{programme.title}</h1>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <ProgrammeDynamicForm slug={programme.slug} fields={programme.formFields} />
          </div>
          <p className="mt-8 text-center">
            <Link to={trackPath} className="text-sm font-semibold text-slate-600 hover:text-[#FF6B5C]">
              ← Back to programme
            </Link>
          </p>
        </div>
      </main>
    );
  }

  if (programme && (!programme.formFields || programme.formFields.length === 0)) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] px-6 pb-16 pt-28 text-[#0F172A]">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-serif text-2xl font-semibold text-slate-900">{programme.title}</h1>
          <p className="mt-4 text-slate-600">Applications are not open yet for this programme.</p>
          <Link
            to={trackPath}
            className="mt-6 inline-block font-semibold text-[#FF6B5C] hover:underline"
          >
            ← Back to programme
          </Link>
        </div>
      </main>
    );
  }

  if (staticTrack) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] text-[#0F172A]">
        <section className="border-b border-slate-200 bg-white px-6 py-12 sm:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Apply</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">{staticTrack.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Application for this track. Add <span className="font-mono text-sm text-slate-700">externalFormUrl</span>{' '}
              in <span className="font-mono text-sm text-slate-700">fellowshipTracks.js</span> to redirect here, or publish
              a programme with the same slug in admin to use the built-in form.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-xl space-y-8 px-6 py-12">
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-sm text-slate-500">
            <p className="font-medium text-slate-700">Form placeholder</p>
            <p className="mt-2 text-slate-600">Reach out and we will walk you through it.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a49]"
            >
              Book a Call
            </Link>
            <Link
              to={trackPath}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              ← Back to track
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F6F8] px-6 pb-16 pt-28 text-slate-900">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-serif text-2xl font-semibold">Form not available</h1>
        <p className="mt-3 text-slate-600">
          {loadError || 'No application form is published for this URL yet.'}
        </p>
        <Link to="/programmes" className="mt-6 inline-block font-semibold text-[#FF6B5C] hover:underline">
          ← Browse programmes
        </Link>
      </div>
    </main>
  );
}
