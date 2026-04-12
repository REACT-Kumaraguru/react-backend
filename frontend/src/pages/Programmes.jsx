import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ClipboardCheck, Microscope, Play, Rocket, Scale, Search, ShoppingCart, Users } from 'lucide-react';
import ProgrammeCard from '../components/programmes/ProgrammeCard';
import ShinyText from '../components/FooterCom/ShinyText';
import { fetchProgrammes } from '../api/programmesApi';
import KhsLogo from '../assets/logos/KHS.png';
import WwoofLogo from '../assets/logos/wwoof.webp';

/** Set `videoUrl` to a YouTube or Shorts link when ready; empty string keeps a non-clickable placeholder. */
/** Problem section — scroll story beats (order = reveal sequence). */
const PROBLEM_STORY_LINES = [
  { key: 'ideas', kind: 'serif', text: 'You have always had ideas.' },
  { key: 'notice', kind: 'serif', text: 'You notice things others walk past.' },
  {
    key: 'gap-talk',
    kind: 'serif',
    text: 'But somewhere between the classroom and the real world, there is a gap nobody talks about.',
  },
  { key: 'intel', kind: 'sans', text: 'Not a gap in your intelligence.' },
  { key: 'ambition', kind: 'sans', text: 'Not a gap in your ambition.' },
  { key: 'path', kind: 'path', text: 'A gap in the path.' },
  {
    key: 'product',
    kind: 'bold',
    text: 'You have never been shown how to turn a real problem into a real product.',
  },
  {
    key: 'mentor',
    kind: 'bold',
    text: 'You have never had a mentor who has done it themselves.',
  },
  {
    key: 'room',
    kind: 'bold',
    text: 'You have never been in a room where everyone around you is building something.',
  },
];

const STUDENT_VOICES_PLACEHOLDERS = [
  { id: 'sv1', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
  { id: 'sv2', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
  { id: 'sv3', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
  { id: 'sv4', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
  { id: 'sv5', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
  { id: 'sv6', name: 'Student name', building: 'What they are building (placeholder)', videoUrl: '' },
];

function problemLineClass(kind, lineKey) {
  if (kind === 'sans')
    return 'mb-10 font-sans text-base font-normal text-slate-700 sm:mb-12 sm:text-lg';
  if (kind === 'serif' && lineKey === 'gap-talk')
    return 'mb-14 text-[1.125rem] leading-snug sm:mb-16 sm:text-xl md:text-[1.35rem] md:leading-relaxed';
  if (kind === 'path') return 'mb-14 font-semibold text-slate-900 sm:mb-16 md:mb-20';
  if (kind === 'bold') {
    const base =
      'font-serif text-[1.05rem] font-bold leading-snug text-slate-900 sm:text-lg md:text-xl';
    return lineKey === 'room' ? `${base} mb-12 sm:mb-14` : `${base} mb-8 sm:mb-10 md:mb-11`;
  }
  return 'mb-10 text-[1.125rem] leading-snug sm:mb-12 sm:text-xl md:text-[1.35rem] md:leading-relaxed';
}

export const Programmes = () => {
  const reduceMotion = useReducedMotion();
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

  function scrollToCards() {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F6F8] text-[#0F172A]">
      {/* HERO (landing-style) */}
      <section className="relative overflow-hidden bg-[#0F2A44] text-white">
        {/* Blueprint-style grid: fine cells + slightly stronger major lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: [
              'linear-gradient(to right, rgba(168, 198, 224, 0.11) 1px, transparent 1px)',
              'linear-gradient(to bottom, rgba(168, 198, 224, 0.11) 1px, transparent 1px)',
              'linear-gradient(to right, rgba(200, 220, 240, 0.16) 1px, transparent 1px)',
              'linear-gradient(to bottom, rgba(200, 220, 240, 0.16) 1px, transparent 1px)',
            ].join(', '),
            backgroundSize: '36px 36px, 36px 36px, 144px 144px, 144px 144px',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" aria-hidden />

        <div className="relative px-6 pb-12 pt-32 sm:pt-36 md:pt-40 [perspective:1500px]">
          <motion.div
            className="mx-auto max-w-6xl"
            initial={
              reduceMotion
                ? { opacity: 0, y: 14 }
                : { opacity: 0, rotateX: 16, y: 36, z: -52 }
            }
            animate={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, rotateX: 0, y: 0, z: 0 }
            }
            transition={{ duration: reduceMotion ? 0.42 : 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 0%',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/70 sm:text-xs">REACT Programmes</p>

              <h1 className="max-w-4xl font-serif text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.35rem] md:leading-[1.15] lg:max-w-5xl">
                The fellowship for students who know that knowledge alone doesn’t build ventures — and want to leave
                with a product, a patent, and a registered startup to prove it.
              </h1>

              <p className="max-w-3xl pt-1 text-base leading-relaxed text-white/80 sm:text-lg">
                A 12-month venture-building fellowship at KCT, Coimbatore. Real problems. Real communities. Real outputs.
              </p>

              <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6B5C] px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#ff5a49] sm:text-base"
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-7 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:text-base"
                >
                  Book a Call First
                </Link>
              </div>
              <p className="max-w-2xl pt-4 text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                Admission process varies by programme. We will walk you through everything personally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem — after hero (scroll-driven 3D story beats) */}
      <section
        className="border-b border-slate-200/90 bg-[#EEF1F6] px-6 py-20 text-slate-800 sm:py-24 md:py-28"
        aria-labelledby="programmes-problem-heading"
      >
        <div className="mx-auto max-w-2xl [perspective:1200px]">
          <h2 id="programmes-problem-heading" className="sr-only">
            The gap between classroom and the real world
          </h2>

          <div className="font-serif text-[1.125rem] leading-snug text-slate-900 sm:text-xl sm:leading-snug md:text-[1.35rem] md:leading-relaxed">
            {PROBLEM_STORY_LINES.map((line, index) => {
              const motionProps = reduceMotion
                ? {
                    initial: { opacity: 0, y: 12 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
                    viewport: { once: true, amount: 0.32, margin: '0px 0px -10% 0px' },
                  }
                : {
                    initial: { opacity: 0, rotateX: 15, y: 48, z: -42 },
                    whileInView: { opacity: 1, rotateX: 0, y: 0, z: 0 },
                    transition: { duration: 0.88, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] },
                    viewport: { once: true, amount: 0.26, margin: '0px 0px -14% 0px' },
                  };

              return (
                <motion.div
                  key={line.key}
                  {...motionProps}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: '50% 0%',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <p className={problemLineClass(line.kind, line.key)}>{line.text}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 10, y: 24, z: -20 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
            transition={{
              duration: reduceMotion ? 0.4 : 0.85,
              delay: reduceMotion ? 0.05 : PROBLEM_STORY_LINES.length * 0.11 + 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.4 }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 0%' }}
            className="mt-20 border-t border-slate-300/70 pt-14 text-center sm:mt-24 sm:pt-16"
          >
            <p className="font-serif text-lg font-normal tracking-wide text-slate-500 sm:text-xl">
              That is what REACT is.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Methodology / Pipeline (landing-style) */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-700/80 sm:text-xs">The methodology</p>
            <h2 className="mt-3 font-sans text-2xl font-semibold text-slate-900 sm:text-3xl">
              The <span className="inline-block">
                  <ShinyText
                    text="REACT"
                    speed={3}
                    color="#FF6B5C"
                    shineColor="#ffffff"
                    spread={120}
                  />
                </span>{" "} Pipeline
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

      {/* PROGRAMME CARDS (catalogue) */}
      <section className="px-6 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10" ref={cardsRef} id="programmes">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Explore</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Programmes that meet you in the field
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">
              Choose a track, see the details, and apply on each programme&apos;s fellowship page.
            </p>
          </div>

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
            <div className="grid grid-cols-1 gap-8 [perspective:1400px] md:grid-cols-2 md:gap-10">
              {rows.map((p, cardIndex) => (
                <motion.div
                  key={p.id ?? p.slug ?? p.title}
                  initial={
                    reduceMotion
                      ? { opacity: 0, y: 14 }
                      : { opacity: 0, rotateX: 11, y: 40, z: -36 }
                  }
                  whileInView={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, rotateX: 0, y: 0, z: 0 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.45 : 0.82,
                    delay: reduceMotion ? cardIndex * 0.04 : cardIndex * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: '50% 0%',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <ProgrammeCard programme={p} />
                </motion.div>
              ))}
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

      {/* Student Voices — after Entrepreneur Index */}
      <section
        id="student-voices"
        className="border-t border-slate-200 bg-white px-6 py-14 sm:py-16"
        aria-labelledby="student-voices-heading"
      >
        <div className="mx-auto max-w-6xl">
          <header className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-500">Student voices</p>
            <h2 id="student-voices-heading" className="mt-3 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
              Do not take our word for it.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
              Hear from the people building inside REACT right now.
            </p>
          </header>

          <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {STUDENT_VOICES_PLACEHOLDERS.map((v) => {
              const hasLink = Boolean(String(v.videoUrl || '').trim());
              const thumb = (
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500">
                  <span className="sr-only">Video thumbnail placeholder</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0F2A44] shadow-lg ring-1 ring-black/10 transition group-hover:scale-105 group-hover:shadow-xl"
                      aria-hidden
                    >
                      <Play className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
                    </span>
                  </div>
                </div>
              );
              const meta = (
                <div className="space-y-1 p-4">
                  <p className="font-semibold text-slate-900">{v.name}</p>
                  <p className="text-sm leading-snug text-slate-600">{v.building}</p>
                </div>
              );
              const shellClass =
                'group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md';

              return (
                <li key={v.id}>
                  {hasLink ? (
                    <a
                      href={v.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${shellClass} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B5C]`}
                    >
                      {thumb}
                      {meta}
                    </a>
                  ) : (
                    <article className={shellClass}>
                      {thumb}
                      {meta}
                    </article>
                  )}
                </li>
              );
            })}
          </ul>
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
    </main>
  );
};
