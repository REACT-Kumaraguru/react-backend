import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClipboardCheck, Microscope, Rocket, Scale, Search, ShoppingCart, Users } from 'lucide-react';
import ProgrammeCard from '../components/programmes/ProgrammeCard';
import ProgrammeDynamicForm from '../components/programmes/ProgrammeDynamicForm';
import { fetchProgrammes } from '../api/programmesApi';
import KhsLogo from '../assets/logos/KHS.png';
import WwoofLogo from '../assets/logos/wwoof.webp';

export const Programmes = () => {
  const { slug } = useParams();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const cardsRef = useRef(null);

  const pipeline = [
    { title: 'Field', subtitle: 'Identifying sector friction', Icon: Search },
    { title: 'Validation', subtitle: 'Demand signal testing', Icon: ClipboardCheck },
    { title: 'Research', subtitle: 'Deep technical audit', Icon: Microscope },
    { title: 'Engineering', subtitle: 'Scalable MVP builds', Icon: Users },
    { title: 'IP', subtitle: 'Legal moat strategy', Icon: Scale },
    { title: 'Market', subtitle: 'Go-to-market execution', Icon: ShoppingCart },
    { title: 'Venture', subtitle: 'Series A readiness', Icon: Rocket },
  ];

  const whyReactPillars = [
    {
      num: '01',
      title: 'Field First',
      body: 'Fellows spend their first weeks in real communities, not classrooms. Problems are validated before anything is built. You cannot design a solution for a reality you have never been inside.',
    },
    {
      num: '02',
      title: 'Mentored by Practitioners',
      body: 'Every team is guided by people who have filed patents, built products, and worked in the field. Not professors who study entrepreneurship. People who have done it.',
    },
    {
      num: '03',
      title: 'Partners in the Real World',
      body: 'We work with organisations operating on the ground. Fellows do not simulate problems — they solve real ones.',
    },
  ];

  const fieldPartnerLines = [
    {
      org: 'Keystone Foundation, The Nilgiris',
      detail: 'field partner, biodiversity and tribal livelihood domain',
    },
    {
      org: 'WWOOF India',
      detail: 'field partner, sustainable agriculture and rural community domain',
    },
  ];

  const admissionSteps = [
    {
      num: '01',
      title: 'Apply',
      body: 'Tell us about yourself and a problem you have noticed. Ten minutes.',
    },
    {
      num: '02',
      title: 'Connect',
      body: 'We reach out within 7 days. Meet the team. Ask everything you want to know.',
    },
    {
      num: '03',
      title: 'Build',
      body: 'Join your cohort. Start your journey. Leave with something real.',
    },
  ];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError('');
      try {
        const data = await fetchProgrammes();
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load programmes');
          setRows([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // If user lands on /programmes/:slug, preselect it once rows load.
  useEffect(() => {
    if (!slug) return;
    if (rows === null) return;
    const normalized = String(slug || '').trim();
    if (!normalized) return;
    // Let layout paint, then scroll to cards.
    setTimeout(() => {
      cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, [slug, rows]);

  const selectedProgramme = useMemo(() => {
    if (!Array.isArray(rows) || !slug) return null;
    const normalized = String(slug || '').trim();
    if (!normalized) return null;
    return rows.find((p) => String(p?.slug || '').trim() === normalized) || null;
  }, [rows, slug]);

  function scrollToCards() {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] text-[#0F172A]">
      {/* HERO (landing-style) */}
      <section className="relative overflow-hidden bg-[#0F2A44] text-white">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" aria-hidden />

        <div className="relative px-6 pt-32 pb-12 sm:pt-36 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/70 sm:text-xs">
                REACT Programmes · Find Your Path
              </p>

              <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                <span className="block text-white">Every kind of builder.</span>
                <span className="mt-1 block italic text-[#FF6B5C]">One movement.</span>
              </h1>

              <p className="max-w-3xl pt-1 text-sm leading-relaxed text-white/70 sm:text-base">
                Whether you are in school, in college, in a career, or between two — REACT has a structured path that
                meets you where you are and takes you somewhere worth going.
                <br />
                <br />
                Four tracks. One standard. Real outputs at the end of every one.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={scrollToCards}
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-7 py-3 text-sm text-white transition-colors hover:bg-[#ff5a49] sm:text-base"
                >
                  Find your path
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME CARDS */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10" ref={cardsRef} id="programmes">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Explore</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Programmes that meet you in the field
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
              Choose a track, see the details, and apply right here.
            </p>
          </div>

          {slug ? (
            <div className="mb-8 flex items-center justify-center">
              <Link
                to="/programmes"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                ← Back to all programmes
              </Link>
            </div>
          ) : null}

          {error ? (
            <p className="mt-8 text-center text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          {rows === null ? (
            <p className="mt-12 text-center text-slate-500">Loading…</p>
          ) : rows.length === 0 ? (
            <p className="mt-12 text-center text-slate-600">No programmes published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {rows.map((p) => {
                const pSlug = String(p?.slug || '').trim();
                const isSelected = !!slug && pSlug && pSlug === String(slug).trim();
                return (
                  <React.Fragment key={p.id ?? p.slug ?? p.title}>
                    <ProgrammeCard programme={p} selected={isSelected} />
                    {isSelected ? (
                      <div className="md:col-span-2">
                        <div className="mt-2 rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm backdrop-blur sm:p-6">
                          {selectedProgramme?.formFields?.length > 0 && selectedProgramme?.slug ? (
                            <ProgrammeDynamicForm
                              slug={selectedProgramme.slug}
                              fields={selectedProgramme.formFields}
                            />
                          ) : (
                            <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-center">
                              <p className="text-base font-semibold text-slate-900">Applications are not open yet.</p>
                              <p className="mt-2 text-sm text-slate-600">
                                This programme doesn’t have an application form published.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why REACT Works — dark split + grid (landing-style) */}
      <section className="border-t border-white/10 bg-[#0B1D33] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
            <div className="border-b border-white/15 pb-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:border-white/15 lg:pb-0 lg:pr-10 xl:pr-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#FF6B5C]">Why REACT Works</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
                Built differently. For a reason.
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/70">
                Every track shares the same standard: start in the field, learn from practitioners, and build with
                partners who operate where the problem actually lives.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-2 sm:divide-x sm:divide-y">
                {whyReactPillars.map((pillar) => (
                  <div key={pillar.num} className="px-6 py-10 sm:px-8 sm:py-10">
                    <p className="text-xs font-semibold tracking-[0.2em] text-[#FF6B5C]">{pillar.num}</p>
                    <h4 className="mt-3 font-serif text-xl font-semibold leading-snug sm:text-2xl">{pillar.title}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{pillar.body}</p>
                  </div>
                ))}

                <div className="px-6 py-10 sm:px-8 sm:py-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">Field partners</p>
                  <div className="mt-4 flex gap-3">
                    <div className="h-14 flex-1 rounded-sm bg-white/[0.06] ring-1 ring-inset ring-white/10">
                      <img
                        src={KhsLogo}
                        alt="Keystone Foundation logo"
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="h-14 flex-1 rounded-sm bg-white/[0.06] ring-1 ring-inset ring-white/10">
                      <img src={WwoofLogo} alt="WWOOF India logo" className="h-full w-full object-contain p-1" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 text-left">
                    {fieldPartnerLines.map((line) => (
                      <p key={line.org} className="text-[13px] leading-snug text-white/65">
                        <span className="font-medium text-white/85">{line.org}</span>
                        {' — '}
                        {line.detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneur Index Bridge Section (landing-style) */}
      <section className="bg-[#F4F6F8] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-[#ECEFF5] px-6 py-14 text-center sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9BB3FF]">Self-Assessment</p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-5xl">Find out how you think.</h3>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-xl">
            The Entrepreneur Index is a 30-question orientation tool built on entrepreneurship research. It tells you
            how you naturally engage with problems, people, and systems — and what kind of builder you are. Taken by
            thousands. Shared by many.
          </p>
          <div className="mt-9">
            <a
              href="/entrepreneur-index"
              className="inline-flex items-center justify-center rounded-full bg-[#2C3240] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#202531]"
            >
              Take the Index →
            </a>
          </div>
        </div>
      </section>

      {/* Admission steps (landing-style) */}
      <section className="bg-[#F4F6F8] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h3 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">Three steps. No complexity.</h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {admissionSteps.map((step) => (
              <article key={step.num} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6">
                <span className="pointer-events-none absolute right-4 top-2 text-5xl font-bold tracking-tight text-slate-200">
                  {step.num}
                </span>
                <h4 className="relative z-10 text-2xl font-semibold text-slate-900">{step.title}</h4>
                <p className="relative z-10 mt-3 text-base leading-relaxed text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-sm text-slate-600 sm:text-base">
              Admission process varies by programme. We will walk you through everything personally.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff5a49] sm:text-base"
              >
                Apply Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 sm:text-base"
              >
                Book a Call First
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology / Pipeline (landing-style) */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-700/80 sm:text-xs">The methodology</p>
            <h2 className="mt-3 font-sans text-2xl font-semibold text-slate-900 sm:text-3xl">
              The <span className="font-semibold text-[#FF6B5C]">REACT</span> Pipeline
            </h2>
          </div>

          <div className="mt-12">
            {/* Desktop */}
            <div className="relative hidden w-full lg:grid lg:grid-cols-7 lg:gap-x-3">
              <div className="pointer-events-none absolute left-0 right-0 top-[23px] z-0 h-[2px] bg-[#E5E7EB]" aria-hidden />
              {pipeline.map(({ title, subtitle, Icon }, idx) => {
                const isLast = idx === pipeline.length - 1;
                return (
                  <div key={title} className="group relative z-10 flex min-w-0 flex-col items-center text-center">
                    <div className="flex h-12 w-full items-center justify-center">
                      <div
                        className={[
                          'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
                          isLast
                            ? 'border-[#2F80ED] bg-[#2F80ED] text-white shadow-sm'
                            : 'border-slate-200 bg-slate-100 text-slate-600 group-hover:border-[#FF6B5C] group-hover:bg-white group-hover:text-[#FF6B5C] group-hover:shadow-sm',
                        ].join(' ')}
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 max-w-[9rem] text-[11px] leading-snug text-slate-500 group-hover:text-slate-600">
                      {subtitle}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile / tablet */}
            <div className="relative pl-1 lg:hidden">
              <div className="pointer-events-none absolute bottom-6 left-[23px] top-6 z-0 w-[2px] bg-[#E5E7EB]" aria-hidden />
              <ul className="relative z-10">
                {pipeline.map(({ title, subtitle, Icon }, idx) => {
                  const isLast = idx === pipeline.length - 1;
                  return (
                    <li key={title} className="group flex gap-4 pb-10 last:pb-0 sm:gap-5">
                      <div className="relative z-10 flex w-12 shrink-0 justify-center">
                        <div
                          className={[
                            'flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200',
                            isLast
                              ? 'border-[#2F80ED] bg-[#2F80ED] text-white shadow-sm'
                              : 'border-slate-200 bg-slate-100 text-slate-600 group-hover:border-[#FF6B5C] group-hover:bg-white group-hover:text-[#FF6B5C] group-hover:shadow-sm',
                          ].join(' ')}
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="text-xs font-semibold text-slate-900">{title}</p>
                        <p className="mt-1 text-[11px] leading-snug text-slate-500 group-hover:text-slate-600">
                          {subtitle}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
