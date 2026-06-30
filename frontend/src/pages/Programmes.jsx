import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Mail,
  X,
  Globe,
  Copy,
  Check,
  ExternalLink,
  FileText,
  MessageSquare,
  Mic,
  Award,
  Users,
  Calendar,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const programmes = [
  {
    id: 'social-innovation-fellowship',
    number: '01',
    title: 'Social Innovation Fellowship',
    duration: '2 Years',
    credential: 'Diploma in Social Innovation + Partner Degree',
    openTo: 'UG and PG students at Kumaraguru Institutions',
    applicationWindow: 'February to July · Once a year',
    summary:
      'The flagship programme. Two years embedded inside a degree at Kumaraguru Institutions — engineering, management, or social work. The degree gives you disciplinary depth. REACT gives you the architecture to act on it. Both are built simultaneously. You graduate with a credential and a venture, not one or the other.',
    accent: '#E76758',
    gradientFrom: '#E76758',
    gradientTo: '#0F2A44',
    details: [
      {
        heading: 'Who this is for',
        body: 'UG students from second year onward and PG students at KCT, KCTBS, and KCLAS — any branch, any discipline. Students already enrolled at Kumaraguru apply directly. Applicants from outside institutions are admitted to the degree programme as part of the same process.',
      },
      {
        heading: 'Available degree tracks',
        items: [
          'BE / BTech / ME / MTech at KCT',
          'MBA in Entrepreneurship at KCTBS',
          'MSW in Community Development / MA / BSc / BA at KCLAS',
        ],
      },
      { heading: 'Credits', body: '40 credits across 4 semesters' },
      { heading: 'Cohort size', body: '30 fellows per batch' },
      {
        heading: 'What you produce across two years',
        items: [
          'A published or submitted research paper',
          'A filed patent or documented IP record',
          'A working proof of concept, tested and documented in the field',
          'A minimum viable product tested with real users in real conditions',
          'A submitted grant proposal',
          'An investor pitch deck presented at a public Demo Day',
          'A registered or actively developing social venture with a verified community impact report',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Innovation Fellowship',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-innovation-fellowship',
    applyHref: '/apply',
  },
  {
    id: 'social-impact-fellowship',
    number: '02',
    title: 'Social Impact Fellowship',
    duration: '1 Year',
    credential: 'Diploma in Social Innovation',
    openTo: 'Any graduate, anywhere in the world',
    applicationWindow: 'February to July · Once a year',
    summary:
      'The gap year with a permanent outcome. One year, full-time, intensive. The complete REACT methodology from field immersion to venture registration — for graduates who want to go deep on a real problem before their next chapter. Open to any graduate from any institution anywhere in the world. No host degree required.',
    accent: '#0F2A44',
    gradientFrom: '#0F2A44',
    gradientTo: '#1e4a6e',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any graduate from any discipline, any institution, anywhere in the world. Designed for graduates between a first degree and doctoral research, between education and building something, or at the point of deciding which direction their work takes.',
      },
      { heading: 'Credits', body: '40 credits · Full-time · Immersive' },
      {
        heading: 'What you produce',
        items: [
          'A published or submitted research paper',
          'A filed patent or documented IP record',
          'A working proof of concept, tested and documented',
          'A minimum viable product tested with real users',
          'A submitted grant proposal',
          'An investor pitch deck at a public Demo Day',
          'A registered or actively developing social venture with a verified community impact report',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Impact Fellowship',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-impact-fellowship',
    applyHref: '/fellowship/social-impact-fellowship/apply',
  },
  {
    id: 'social-innovation-certification',
    number: '03',
    title: 'Social Innovation Certification',
    duration: 'One Semester',
    credential: 'Certification in Social Innovation',
    openTo: 'Any current student at any institution',
    applicationWindow: 'May to July · December to January · Twice a year',
    summary:
      'The foundational skill every programme here is built on — understanding a problem so completely that the solution becomes inevitable. One semester. Four gap types. One validated problem statement you carry back to wherever you came from.',
    accent: '#C06840',
    gradientFrom: '#C06840',
    gradientTo: '#E76758',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any current UG, PG, or PhD student at any institution. You return to your own institution after the certification with a validated problem statement, a structured gap analysis, and a documented community understanding. A credential in its own right and the natural entry point for anyone considering the full Diploma.',
      },
      {
        heading: 'The four gaps you learn to map',
        items: [
          'Community Gap — what the community needs that current systems do not provide',
          'Solution Gap — where existing solutions fall short and why they fail at scale',
          'Market Gap — the unserved population and the viable economic model to reach them',
          'User Gap — the distance between what a user says they need and what they will actually adopt and sustain',
        ],
      },
      {
        heading: 'What you produce',
        items: [
          'Validated problem statement',
          'Structured gap analysis across all four gap types',
          'Documented community understanding',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Innovation Certification',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-innovation-certification',
    applyHref: '/apply',
  },
  {
    id: 'field-internship',
    number: '04',
    title: 'Field Internship',
    duration: 'Variable duration',
    credential: 'No formal credential',
    openTo: 'Students and early-career professionals',
    applicationWindow: 'Rolling intake · Write to us',
    summary:
      'Immersive, short-term placement inside live programme work. Every intern contributes to active fellow projects and field partner activities. This is not observation. Every position has real stakes and a real deliverable.',
    accent: '#374151',
    gradientFrom: '#374151',
    gradientTo: '#101827',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any student or early-career professional. Positions are confirmed individually, case by case, based on active programme needs.',
      },
      {
        heading: 'What you work on',
        items: [
          'Community gap analysis — working directly with communities to map unmet needs',
          'Solution gap research — analysing why existing interventions have failed at scale',
          'Market gap mapping — identifying unserved populations and viable economic models',
          'Programme operations — understanding how a social innovation centre functions in the Indian development context',
        ],
      },
      {
        heading: 'How to apply',
        body: 'Write directly to info.react@kumaraguru.in with your background, availability, and which area you want to work in. Positions confirmed on a rolling basis.',
      },
    ],
    applyLabel: 'Enquire About Field Internships',
    learnLabel: 'Learn more about field internships',
    learnHref: '/fellowship/field-internship',
    applyHref: 'mailto:info.react@kumaraguru.in',
  },
];

const fellowBenefits = [
  'REACT Fellow certificate — permanent, not a graduation award',
  'Permanent entry into the REACT Fellow network',
  'Mentor access and incubation pipeline priority for two years beyond graduation',
  'Priority consideration for grant introductions and investor connections',
  'A permanent record in the REACT Fellow archive, distinguished from all other alumni',
];

const selectionStages = [
  {
    stage: '01',
    Icon: FileText,
    title: 'Written Application',
    body: 'A 500-word personal statement and your initial domain choice.',
    color: '#E76758',
    bg: '#FFF0EE',
  },
  {
    stage: '02',
    Icon: MessageSquare,
    title: 'Problem Framing Exercise',
    body: 'A structured written response to a real domain challenge. The question is how you think, not what you already know.',
    color: '#0F2A44',
    bg: '#EEF4FB',
  },
  {
    stage: '03',
    Icon: Mic,
    title: 'Panel Interview',
    body: 'A conversation with the Faculty Mentor and Domain Coordinator for your chosen domain.',
    color: '#C06840',
    bg: '#FDF4EE',
  },
];

const cohortLinks = [];

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduce ? 0.15 : 0.72,
        delay: shouldReduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionWatermark({ text, light = false }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      aria-hidden="true"
    >
      <span
        className={`text-[clamp(2.5rem,10vw,10rem)] font-black uppercase leading-none tracking-[0.04em] whitespace-nowrap ${
          light ? 'text-white/[0.07]' : 'text-slate-900/[0.06]'
        }`}
      >
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODAL — spring scale + blur backdrop
// Mobile: full-screen single column with compact header + sticky actions
// Desktop (sm+): unchanged two-column side-by-side layout
// ─────────────────────────────────────────────────────────────
function ProgrammeModal({ programme, onClose }) {
  const applyHref = programme.applyHref || '/apply';
  const applyExternal = applyHref.startsWith('mailto:');
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#0a1628]/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative z-10 w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[92vh] flex flex-col lg:flex-row overflow-hidden rounded-none sm:rounded-3xl"
        initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.84, y: shouldReduce ? 0 : 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.93, y: shouldReduce ? 0 : 24 }}
        transition={
          shouldReduce
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 320, damping: 26, mass: 0.8 }
        }
        style={{
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.07), 0 56px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.30)',
        }}
      >
        {/* ── MOBILE HEADER (hidden sm+) ── */}
        <div
          className="sm:hidden shrink-0 relative px-5 pt-6 pb-5 text-white"
          style={{
            background: `linear-gradient(160deg, ${programme.gradientFrom} 0%, ${programme.gradientTo} 100%)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/28 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">
            Programme {programme.number}
          </span>
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
          >
            {programme.duration}
          </span>
          <h2 className="text-xl font-bold leading-snug">{programme.title}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/75">{programme.summary}</p>
        </div>

        {/* ── LEFT PANEL (desktop sm+ only) ── */}
        <div
          className="hidden sm:flex relative shrink-0 flex-col lg:w-[320px] xl:w-[360px] text-white"
          style={{
            background: `linear-gradient(160deg, ${programme.gradientFrom} 0%, ${programme.gradientTo} 100%)`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-tl-3xl rounded-bl-3xl pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
            />
            <div
              className="absolute bottom-10 -left-10 h-48 w-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
            />
          </div>

          <div className="relative flex-1 overflow-y-auto min-h-0 px-7 pt-8 pb-4 scroll-modern-light">
            <span className="text-white/50 text-[11px] font-bold uppercase tracking-[0.3em]">
              Programme {programme.number}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-snug">{programme.title}</h2>
            <p className="mt-4 text-white/80 text-[15px] leading-relaxed">{programme.summary}</p>
            <dl className="mt-5 space-y-3.5">
              {[
                { label: 'Duration', value: programme.duration },
                { label: 'Credential', value: programme.credential },
                { label: 'Open to', value: programme.openTo },
                { label: 'Application window', value: programme.applicationWindow },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45 mb-0.5">{label}</dt>
                  <dd className="text-[14.5px] font-semibold text-white/90 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative shrink-0 px-7 pb-7 pt-4 flex flex-col gap-2.5 border-t border-white/10">
            {applyExternal ? (
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white border-2 border-white/30 hover:bg-white/15 transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {programme.applyLabel}
              </a>
            ) : (
              <Link
                to={applyHref}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold bg-white transition-colors hover:bg-white/90"
                style={{ color: programme.accent }}
              >
                {programme.applyLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link
              to={programme.learnHref}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white border border-white/25 hover:bg-white/10 transition-colors"
            >
              {programme.learnLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── RIGHT PANEL / MOBILE SCROLLABLE BODY ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white min-h-0">
          <div className="hidden lg:flex shrink-0 items-center justify-between px-8 pt-6 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Programme details</span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-7 scroll-modern-dark">
            {/* Mobile key info — shown only below sm */}
            <dl className="sm:hidden space-y-3 mb-5 pb-5 border-b border-slate-100">
              {[
                { label: 'Credential', value: programme.credential },
                { label: 'Open to', value: programme.openTo },
                { label: 'Window', value: programme.applicationWindow },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 w-20 shrink-0 pt-0.5">
                    {label}
                  </dt>
                  <dd className="text-[13px] font-medium text-slate-700 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="space-y-6 sm:space-y-8">
              {programme.details.map((detail, i) => (
                <motion.section
                  key={detail.heading}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                    duration: shouldReduce ? 0.1 : 0.48,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="h-0.5 w-5 rounded-full shrink-0"
                      style={{ background: programme.accent }}
                      aria-hidden="true"
                    />
                    <h3
                      className="text-[11.5px] font-black uppercase tracking-[0.26em]"
                      style={{ color: programme.accent }}
                    >
                      {detail.heading}
                    </h3>
                  </div>
                  {detail.body && (
                    <p className="text-[14px] sm:text-[16px] leading-relaxed text-slate-700 font-medium pl-8">
                      {detail.body}
                    </p>
                  )}
                  {detail.items && (
                    <ul className="pl-8 mt-1 space-y-2">
                      {detail.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[13.5px] sm:text-[16px] leading-relaxed text-slate-700 font-medium">
                          <span
                            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: programme.accent }}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </div>
          </div>

          {/* Mobile action buttons — hidden sm+ */}
          <div className="sm:hidden shrink-0 px-5 pt-4 pb-6 flex flex-col gap-2.5 border-t border-slate-100">
            {applyExternal ? (
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-opacity active:opacity-80"
                style={{ background: programme.accent }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {programme.applyLabel}
              </a>
            ) : (
              <Link
                to={applyHref}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-opacity active:opacity-80"
                style={{ background: programme.accent }}
              >
                {programme.applyLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link
              to={programme.learnHref}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-slate-900 border border-slate-200 transition-colors active:bg-slate-50"
            >
              {programme.learnLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// STAGE CARD — static display; energy animation driven externally
// ─────────────────────────────────────────────────────────────
const STAGE_STYLES = [
  {
    cardBg:          'linear-gradient(145deg, #FFF7F5 0%, #FFEAE4 55%, #FFF0EE 100%)',
    topBar:          'linear-gradient(90deg, #E76758 0%, #FF9E80 100%)',
    iconBg:          'linear-gradient(135deg, #E76758 0%, #FF9E80 100%)',
    border:          'rgba(231, 103, 88, 0.22)',
    glow:            'rgba(231, 103, 88, 0.14)',
    overlayGradient: 'radial-gradient(ellipse at 50% 28%, rgba(231,103,88,0.18) 0%, transparent 72%)',
  },
  {
    cardBg:          'linear-gradient(145deg, #F2F6FF 0%, #DDEAFB 55%, #EEF4FB 100%)',
    topBar:          'linear-gradient(90deg, #0F2A44 0%, #2D70C8 100%)',
    iconBg:          'linear-gradient(135deg, #0F2A44 0%, #2D70C8 100%)',
    border:          'rgba(15, 42, 68, 0.15)',
    glow:            'rgba(15, 42, 68, 0.10)',
    overlayGradient: 'radial-gradient(ellipse at 50% 28%, rgba(15,42,68,0.14) 0%, transparent 72%)',
  },
  {
    cardBg:          'linear-gradient(145deg, #FFF8F0 0%, #FFE3C0 55%, #FDF4EE 100%)',
    topBar:          'linear-gradient(90deg, #C06840 0%, #E8944A 100%)',
    iconBg:          'linear-gradient(135deg, #C06840 0%, #E8944A 100%)',
    border:          'rgba(192, 104, 64, 0.20)',
    glow:            'rgba(192, 104, 64, 0.12)',
    overlayGradient: 'radial-gradient(ellipse at 50% 28%, rgba(192,104,64,0.16) 0%, transparent 72%)',
  },
];

function StageCard({ stage, index, articleRef: externalArticleRef, iconWrapRef, overlayRef }) {
  const st           = STAGE_STYLES[index] ?? STAGE_STYLES[0];
  const shouldReduce = useReducedMotion();

  const localArtRef  = useRef(null);
  const frontRef     = useRef(null);
  const backRef      = useRef(null);
  const bgNumRef     = useRef(null);
  const beamRef      = useRef(null);
  const wmRef        = useRef(null);
  const tlRef        = useRef(null);

  // Merge external ref (energy animation) with local ref
  function setArticleRef(el) {
    localArtRef.current = el;
    if (typeof externalArticleRef === 'function') externalArticleRef(el);
  }

  useEffect(() => {
    if (shouldReduce) return;

    const art   = localArtRef.current;
    const front = frontRef.current;
    const back  = backRef.current;
    const bgNum = bgNumRef.current;
    const wm    = wmRef.current;

    if (!art || !front || !back || !bgNum || !wm) return;

    // Establish initial hidden states for hover layers
    gsap.set(back,  { yPercent: 106 });
    gsap.set(bgNum, { opacity: 0 });

    // Single timeline — play() on enter, reverse() on leave
    // Each phase is precisely staggered to feel like layers reorganising
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

    // Phase 1 — front panel lifted mechanically upward
    // -130% ensures the front layer's bottom clears the article's top padding
    // zone (28px) before overflow:hidden clips it, regardless of content height.
    tl.to(front, { yPercent: -130, duration: 0.27 },            0);
    tl.to(wm,    { opacity: 0,     duration: 0.18 },            0);

    // Phase 2 — back layer rises like an elevator platform
    tl.to(back,  { yPercent: 0, duration: 0.36, ease: 'power3.out' }, 0.13);

    // Phase 3 — architectural number breathes into existence
    tl.to(bgNum, { opacity: 0.045, duration: 0.34, ease: 'power1.out' }, 0.27);

    tlRef.current = tl;
    return () => { tl.kill(); };
  }, [shouldReduce]);

  function onEnter() {
    if (shouldReduce) return;
    tlRef.current?.play();

    // Scan beam — born at the top accent bar, travels to the bottom
    const art  = localArtRef.current;
    const beam = beamRef.current;
    if (!art || !beam) return;

    const h = art.getBoundingClientRect().height;
    gsap.killTweensOf(beam);
    gsap.fromTo(
      beam,
      { y: 0, opacity: 1 },
      { y: h + 4, duration: 1.08, ease: 'power1.inOut' }
    );
  }

  function onLeave() {
    if (shouldReduce) return;
    tlRef.current?.reverse();

    // Fade the beam out wherever it currently is
    const beam = beamRef.current;
    if (beam) {
      gsap.killTweensOf(beam);
      gsap.to(beam, { opacity: 0, duration: 0.22, ease: 'power1.out' });
    }
  }

  return (
    <div className="h-full">
      <article
        ref={setArticleRef}
        className="relative h-full overflow-hidden rounded-2xl p-7"
        style={{
          background: st.cardBg,
          border:     `1px solid ${st.border}`,
          boxShadow:  `0 4px 24px ${st.glow}, 0 1px 4px rgba(0,0,0,0.04)`,
        }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Energy pulse overlay — animated by SelectionSection idle loop */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0, background: st.overlayGradient, zIndex: 0 }}
          aria-hidden="true"
        />

        {/* Static top accent bar — always at z-top */}
        <div
          className="absolute top-0 left-0 right-0 h-[3.5px]"
          style={{ background: st.topBar, zIndex: 22 }}
        />

        {/* Scan beam — same visual as accent bar, travels top → bottom */}
        <div
          ref={beamRef}
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: 0, height: '2px', background: st.topBar, opacity: 0, zIndex: 24 }}
          aria-hidden="true"
        />

        {/* Architectural stage number — large, barely visible on hover */}
        <div
          ref={bgNumRef}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize:      '10rem',
              fontWeight:    900,
              lineHeight:    1,
              color:         stage.color,
              letterSpacing: '-0.05em',
            }}
          >
            {stage.stage}
          </span>
        </div>

        {/* Resting watermark — fades as hover begins */}
        <div
          ref={wmRef}
          className="absolute -bottom-2 right-4 text-8xl font-black leading-none select-none pointer-events-none"
          style={{ color: stage.color, opacity: 0.035, zIndex: 5 }}
          aria-hidden="true"
        >
          {stage.stage}
        </div>

        {/* ── FRONT LAYER ─────────────────────────────────────────────
            In normal flow — determines card height.
            Slides upward on hover (mechanical lift). */}
        <div ref={frontRef} className="relative" style={{ zIndex: 10 }}>
          <div
            ref={iconWrapRef}
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: st.iconBg }}
          >
            <stage.Icon className="h-5 w-5 text-white" aria-hidden="true" />
          </div>

          <p className="text-[10.5px] font-bold uppercase tracking-[0.24em] mb-2" style={{ color: stage.color }}>
            Stage {stage.stage}
          </p>

          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">
            {stage.title}
          </h3>

          <p className="text-[14px] leading-relaxed text-slate-600">
            {stage.body}
          </p>
        </div>

        {/* ── BACK LAYER ──────────────────────────────────────────────
            Absolutely positioned; starts below the card.
            Rises like an elevator platform on hover.
            aria-hidden: same content as front, decorative layer. */}
        <div
          ref={backRef}
          className="absolute inset-0 p-7 flex flex-col"
          style={{ zIndex: 10 }}
          aria-hidden="true"
        >
          {/* Icon — larger via actual dimensions, not CSS transform scale */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shrink-0"
            style={{
              background: st.iconBg,
              boxShadow:  `0 0 0 8px ${stage.color}14`,
            }}
          >
            <stage.Icon className="h-7 w-7 text-white" aria-hidden="true" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">
            {stage.title}
          </h3>

          <p className="text-[14px] leading-relaxed text-slate-600">
            {stage.body}
          </p>

          {/* Stage progress indicator — bottom of the revealed layer */}
          <div
            className="mt-auto pt-4 flex items-center gap-2"
            style={{ borderTop: `1px solid ${stage.color}22` }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: stage.color }}
            >
              Stage {stage.stage}
            </span>
            <span className="text-[10px] font-medium text-slate-400">of 03</span>
          </div>
        </div>

      </article>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SELECTION SECTION — "Process Energy Transfer"
//
// A continuous pulse is born in Stage 01, travels to Stage 02,
// then Stage 03, then rests — looping infinitely. The connection
// between cards is implied through sequential activation rather
// than any visible line. A faint wave distortion passes across
// the "SELECT" watermark while the pulse is in transit.
//
// Animation is GPU-friendly (opacity + filter only), respects
// prefers-reduced-motion, and pauses when the section leaves
// the viewport via IntersectionObserver.
// ─────────────────────────────────────────────────────────────
function SelectionSection() {
  const sectionRef   = useRef(null);
  const watermarkRef = useRef(null);
  const artRefs      = useRef([null, null, null]);
  const iconRefs     = useRef([null, null, null]);
  const ovRefs       = useRef([null, null, null]);
  const tlRef        = useRef(null);
  const observerRef  = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;

    const section   = sectionRef.current;
    const watermark = watermarkRef.current;
    const arts      = artRefs.current;
    const icons     = iconRefs.current;
    const ovs       = ovRefs.current;

    if (
      !section || !watermark ||
      arts.some(el => !el) || icons.some(el => !el) || ovs.some(el => !el)
    ) return;

    // Establish clean initial states so GSAP can interpolate correctly
    gsap.set(ovs,       { opacity: 0 });
    gsap.set(icons,     { filter: 'brightness(1)' });
    gsap.set(arts,      { filter: 'brightness(1)' });
    gsap.set(watermark, { skewX: 0, filter: 'blur(0px)' });

    // ── Timing constants (seconds) ──────────────────────────────
    const RISE    = 0.72;   // activation rise
    const HOLD    = 1.55;   // sustain at full activation
    const FALL    = 0.92;   // graceful release
    const TRANSIT = 1.08;   // silence between card-N fall-start and card-(N+1) rise-start
    const REST    = 3.20;   // pause after Stage 03 before loop

    // Each inter-stage gap = RISE + HOLD + TRANSIT
    const slot      = RISE + HOLD + TRANSIT;            // 3.35 s
    const starts    = [0, slot, slot * 2];              // [0, 3.35, 6.70]
    const cycleEnd  = starts[2] + RISE + HOLD + FALL + REST;  // ≈ 13.09 s

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });

    selectionStages.forEach((_, i) => {
      const t     = starts[i];
      const fallT = t + RISE + HOLD;

      // Card activates — overlay illuminates, icon brightens, card gains subtle luminosity
      tl.to(ovs[i],   { opacity: 1,                  duration: RISE        }, t);
      tl.to(icons[i], { filter: 'brightness(1.38)',   duration: RISE * 0.88 }, t);
      tl.to(arts[i],  { filter: 'brightness(1.018)',  duration: RISE        }, t);

      // Card releases — everything eases back to rest
      tl.to(ovs[i],   { opacity: 0,                 duration: FALL }, fallT);
      tl.to(icons[i], { filter: 'brightness(1)',    duration: FALL }, fallT);
      tl.to(arts[i],  { filter: 'brightness(1)',    duration: FALL }, fallT);

      // Watermark wave passes while pulse is in transit to the next card
      if (i < 2) {
        const waveT = fallT + 0.28;
        tl.to(watermark, { skewX: 0.55,  filter: 'blur(0.45px)', duration: 0.45, ease: 'sine.inOut' }, waveT);
        tl.to(watermark, { skewX: 0,     filter: 'blur(0px)',    duration: 0.65, ease: 'sine.inOut' }, waveT + 0.46);
      }
    });

    // Anchor the timeline end so the REST period is part of the cycle
    tl.to({}, { duration: 0.01 }, cycleEnd);

    tlRef.current = tl;
    tl.pause();

    // Play only while the section is visible
    observerRef.current = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? tl.play() : tl.pause(); },
      { threshold: 0.15 }
    );
    observerRef.current.observe(section);

    return () => {
      tl.kill();
      observerRef.current?.disconnect();
    };
  }, [shouldReduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-16 sm:py-24">

      {/* Watermark — the skewX + blur wave is driven by the energy timeline */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span
          ref={watermarkRef}
          className="text-[clamp(2.5rem,10vw,10rem)] font-black uppercase leading-none tracking-[0.04em] whitespace-nowrap text-slate-900/[0.06]"
        >
          SELECT
        </span>
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <FadeUp>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E76758] mb-3">
            Selection Process
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Three stages. Zero compromise.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            The centre selects on quality of thinking and depth of commitment — problem curiosity,
            cross-context adaptability, collaborative drive. All three visible before any
            examination result.
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {selectionStages.map((stage, i) => (
            <StageCard
              key={stage.stage}
              stage={stage}
              index={i}
              articleRef={el  => { artRefs.current[i]  = el; }}
              iconWrapRef={el => { iconRefs.current[i] = el; }}
              overlayRef={el  => { ovRefs.current[i]   = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// COHORT LINK (unchanged)
// ─────────────────────────────────────────────────────────────
function CohortLink({ item }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.copyText);
    } catch {
      const el = document.createElement('textarea');
      el.value = item.copyText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  }

  const base =
    'inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer';

  if (item.action === 'link') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={base}>
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3 opacity-45" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button onClick={handleCopy} className={base} aria-label={`Copy ${item.label} to clipboard`}>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
      ) : (
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
      )}
      <span className="transition-all">{copied ? 'Copied to clipboard!' : item.label}</span>
      {!copied && <Copy className="h-3 w-3 opacity-45" aria-hidden="true" />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRAMME STACK SECTION  — stacked fan → full-width 2×2 grid
//
// Desktop (≥ 1024 px):
//   A pinned h-screen section.  Left text block (absolute, ~44 % wide) slides
//   up on scroll.  Four cards start stacked in a fan adjacent to the heading
//   then spread to fill the full viewport in a 2×2 grid.
//
// FLIP coordinate math (GSAP):
//   stackCX = midpoint between heading right-edge and section right-edge
//   stackCY = vertical centre of the heading element
//   xT = stackCX − naturalCX + fan.dx
//   yT = stackCY − naturalCY + fan.dy
//
// Timeline (scrub 0.15, end +=240%):
//   Phase 1  (0→1.0): left text exits upward (y: -sectionHeight)
//   Phase 2  (0→1.0): cards animate from stacked offsets → 2×2 grid
//   Phase 4  (0.85+): .prog-detail elements stagger-fade in
//
// Mobile (< 1024 px): normal-flow heading + 2×2 grid, no pin.
// ─────────────────────────────────────────────────────────────

const FAN_OFFSETS = [
  { dx:   0, dy:  -5, rotation:   5, depth: 1.00 },
  { dx: -68, dy:   8, rotation: -15, depth: 0.75 },
  { dx:  62, dy:  18, rotation:  11, depth: 0.58 },
  { dx: -18, dy:  38, rotation:  -6, depth: 0.42 },
];

function ProgrammeStackSection({ externalRef, setSelectedProgramme }) {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);
  const cardRefs   = useRef([]);
  const ctxRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl  = textRef.current;
    const heading = headingRef.current;
    const grid    = gridRef.current;
    const cards   = cardRefs.current.filter(Boolean);

    if (!section || !textEl || !heading || !grid || cards.length < 4) return;
    if (window.innerWidth < 1024) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.querySelectorAll('.prog-detail').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Compute FLIP offsets and apply initial stacked state.
    // Called on mount and via onRefresh so layout stays accurate after resize.
    function setInitialCardState() {
      const sR = section.getBoundingClientRect();
      const hR = heading.getBoundingClientRect();

      // X: midpoint between heading right-edge and section right-edge (original formula — do not change).
      // Y: 40 % of the visible viewport below the section top so the fan
      //    sits in the lower half of the right area, clear of the heading text.
      const stackCX = hR.right + (sR.right - hR.right) / 2;
      const stackCY = sR.top + window.innerHeight * 0.4;

      cards.forEach((card, i) => {
        const fan = FAN_OFFSETS[i];
        const cR  = card.getBoundingClientRect();
        gsap.set(card, {
          x:                    stackCX - (cR.left + cR.width  / 2) + fan.dx,
          y:                    stackCY - (cR.top  + cR.height / 2) + fan.dy,
          rotation:             fan.rotation,
          scale:                0.6,
          z:                    110 * fan.depth,
          zIndex:               Math.round(fan.depth * 10),
          transformPerspective: 1200,
          transformOrigin:      '50% 50%',
          filter:               `drop-shadow(${fan.dx * 0.1}px ${fan.dy * 0.1}px 16px rgba(0,0,0,0.22))`,
        });
      });

      section.querySelectorAll('.prog-detail').forEach(el => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
    }

    ctxRef.current?.revert();

    ctxRef.current = gsap.context(() => {
      setInitialCardState();

      const sectionH = section.offsetHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:             section,
          start:               'top top',
          end:                 '+=240%',
          pin:                 true,
          pinSpacing:          true,
          scrub:               0.15,
          invalidateOnRefresh: true,
          onRefresh:           setInitialCardState,
        },
      });

      // Phase 1: left text block exits upward
      tl.to(textEl, { y: -sectionH, ease: 'none', duration: 1 }, 0);

      // Phase 2: cards animate from stacked fan → natural 2×2 grid positions
      tl.to(cards, {
        x:        0,
        y:        0,
        z:        0,
        rotation: 0,
        scale:    1,
        filter:   'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
        zIndex:   1,
        ease:     'power2.out',
        stagger:  0.04,
        duration: 1,
      }, 0);

    }, section);

    return () => ctxRef.current?.revert();
  }, []);

  return (
    <section
      ref={el => { sectionRef.current = el; if (externalRef) externalRef.current = el; }}
      id="programmes"
      className="relative h-auto w-full overflow-hidden bg-[#F5F7FA]"
      style={{ perspective: '1200px' }}
    >
      <SectionWatermark text="FOUR" />

      {/* ══ DESKTOP (≥ lg) ══════════════════════════════════════════
          Full-viewport 2×2 grid — the cards' natural final positions.
          GSAP stacks all four near the heading on mount; they animate
          back here as the user scrolls. */}
      <div
        ref={gridRef}
        className="hidden lg:grid grid-cols-2 gap-4 max-w-[936px] w-full mx-auto pb-10"
        style={{ paddingTop: '105px', transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {programmes.map((p, i) => (
          <div
            key={p.id}
            ref={el => { cardRefs.current[i] = el; }}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform', position: 'relative', aspectRatio: '1/1' }}
          >
            <button
              type="button"
              onClick={() => setSelectedProgramme(p)}
              className="w-full h-full text-left flex flex-col bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm group hover:bg-slate-50/60 transition-colors focus:outline-none"
            >
              {/* Gradient accent bar — always visible, identifies card in stack */}
              <div
                className="h-1.5 w-full shrink-0"
                style={{ background: `linear-gradient(90deg, ${p.gradientFrom}, ${p.gradientTo})` }}
              />
              <div className="prog-detail relative flex flex-col flex-1 p-5 xl:p-7 overflow-hidden">
                <span
                  className="absolute top-3 right-4 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '8rem', color: `${p.accent}10` }}
                  aria-hidden="true"
                >
                  {p.number}
                </span>
                <span
                  className="relative z-10 self-start text-xs font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{ color: p.accent, background: `${p.accent}15` }}
                >
                  {p.duration}
                </span>
                <h3 className="relative z-10 mt-4 text-xl xl:text-2xl font-bold text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <div className="relative z-10 my-4 h-px w-10" style={{ background: p.accent }} />
                <p className="relative z-10 text-[14px] xl:text-[15px] leading-relaxed text-slate-700 mb-5">
                  {p.summary}
                </p>
                <dl className="relative z-10 space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[13.5px] text-slate-600 leading-snug">{p.credential}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[13.5px] text-slate-600 leading-snug">{p.openTo}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[13.5px] text-slate-600 leading-snug">{p.applicationWindow}</dd>
                  </div>
                </dl>
              </div>
              <div
                className="relative z-10 shrink-0 px-5 xl:px-7 py-4 border-t border-slate-100 flex items-center gap-2 text-[15px] font-semibold group-hover:gap-3 transition-all"
                style={{ color: p.accent }}
              >
                <span>View Programme</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </div>
              {i >= 2 && (
                <div
                  className="h-2 w-full shrink-0"
                  style={{ background: `linear-gradient(90deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Left text block — absolute, vertically centred, exits upward in Phase 1.
          Background matches the section so it cleanly masks cards behind it. */}
      <div
        ref={textRef}
        className="hidden lg:flex absolute left-0 top-0 flex-col justify-start pt-16 px-10 xl:px-14"
        style={{ width: '44%', willChange: 'transform', zIndex: 20 }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E76758]">
          The Programmes
        </p>
        <h2
          ref={headingRef}
          className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 xl:text-5xl"
        >
          Four programmes. Every one built on REACT.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          From a two-year fellowship with a degree to a semester-long certification — every
          programme runs on the same methodology, demands the same rigour, and produces people
          who have worked on real problems with something real to show for it.
        </p>
      </div>

      {/* ══ MOBILE (< lg) ════════════════════════════════════════
          Individual programme cards stacked vertically. */}
      <div className="lg:hidden">
        <div className="px-5 py-10 border-b border-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E76758]">
            The Programmes
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Four programmes. Every one built on REACT.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            From a two-year fellowship with a degree to a semester-long certification — every
            programme runs on the same methodology, demands the same rigour, and produces people
            who have worked on real problems with something real to show for it.
          </p>
        </div>

        <div className="px-4 py-6 space-y-4">
          {programmes.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60">
              <div
                className="h-1.5 w-full shrink-0"
                style={{ background: `linear-gradient(90deg, ${p.gradientFrom}, ${p.gradientTo})` }}
              />
              <div className="p-5">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3"
                  style={{ color: p.accent, background: `${p.accent}16` }}
                >
                  {p.duration}
                </span>
                <h3 className="text-[17px] font-bold text-slate-900 leading-snug mb-2">{p.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate-600 mb-4">{p.summary}</p>
                <dl className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[12.5px] text-slate-600 leading-snug">{p.credential}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[12.5px] text-slate-600 leading-snug">{p.openTo}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    <dd className="text-[12.5px] text-slate-600 leading-snug">{p.applicationWindow}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => setSelectedProgramme(p)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity active:opacity-80"
                  style={{ background: p.accent }}
                >
                  View Programme
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export const Programmes = () => {
  const cardsRef = useRef(null);
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const shouldReduce = useReducedMotion();

  const { scrollY } = useScroll();
  const orb1Y       = useTransform(scrollY, [0, 600], [0, -100]);
  const orb2Y       = useTransform(scrollY, [0, 600], [0, -60]);
  const floatCardsY = useTransform(scrollY, [0, 400], [0, -44]);

  function scrollToCards() {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FA] text-slate-900">

      {/* ── HERO (unchanged) ── */}
      <section className="relative overflow-hidden bg-white px-6 pb-24 pt-24 sm:pb-28 sm:pt-36">
        <SectionWatermark text="PROGRAMMES" />

        <motion.div
          className="pointer-events-none absolute -top-24 -right-24 h-[36rem] w-[36rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(231,103,88,0.14) 0%, transparent 70%)',
            y: shouldReduce ? 0 : orb1Y,
          }}
          animate={shouldReduce ? {} : { scale: [1, 1.14, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(15,42,68,0.09) 0%, transparent 70%)',
            y: shouldReduce ? 0 : orb2Y,
          }}
          animate={shouldReduce ? {} : { scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/4 h-48 w-48 rounded-full -translate-y-1/2"
          style={{ background: 'radial-gradient(circle, rgba(192,104,64,0.07) 0%, transparent 70%)' }}
          animate={shouldReduce ? {} : { scale: [1, 1.3, 1], opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38vw] max-w-[28rem] items-center justify-center lg:flex"
          style={{ y: shouldReduce ? 0 : floatCardsY }}
          aria-hidden="true"
        >
          <div style={{ perspective: '900px' }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-2xl border border-slate-300/70"
                style={{
                  width: `${16 - i * 2.6}rem`,
                  height: `${10 - i * 1.6}rem`,
                  top: `${i * 1.8}rem`,
                  left: `${i * 1.6}rem`,
                  background:
                    i === 2
                      ? 'rgba(231,103,88,0.22)'
                      : i === 1
                      ? 'linear-gradient(135deg, rgba(15,42,68,0.14), rgba(231,103,88,0.14))'
                      : 'linear-gradient(135deg, rgba(15,42,68,0.10), rgba(231,103,88,0.10))',
                  backdropFilter: 'blur(3px)',
                  transform: `rotateX(52deg) rotateZ(-14deg) translateZ(${i * 30}px)`,
                  boxShadow: '0 24px 56px rgba(15,42,68,0.16), 0 4px 12px rgba(0,0,0,0.07)',
                }}
                animate={shouldReduce ? {} : {
                  y: [0, -(26 - i * 6), 0],
                  x: i === 2 ? [0, 8, 0] : [0, 0, 0],
                }}
                transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Centre for REACT
          </motion.p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span
              className="block text-[#0F2A44]"
              initial={{ opacity: 0, x: shouldReduce ? 0 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.88, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              One standard.
            </motion.span>
            <motion.span
              className="block text-[#E76758]"
              initial={{ opacity: 0, x: shouldReduce ? 0 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.88, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              Four ways to meet it.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
          >
            The REACT methodology is the same across every programme — the field immersion, the
            frameworks, the real-world output. What changes is your entry point, your duration, and
            the credential you carry out. The standard never moves. Choose the one that fits where
            you stand today.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.84, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={scrollToCards}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F2A44] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#153a5d]"
            >
              Find Your Programme
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMME CARDS — GSAP pinned stack-to-grid reveal ── */}
      <ProgrammeStackSection
        externalRef={cardsRef}
        setSelectedProgramme={setSelectedProgramme}
      />

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProgramme && (
          <ProgrammeModal
            programme={selectedProgramme}
            onClose={() => setSelectedProgramme(null)}
          />
        )}
      </AnimatePresence>

      {/* ── REACT FELLOW (unchanged) ── */}
      <section className="relative overflow-hidden bg-[#0F2A44] px-6 py-20 text-white sm:py-24">
        <SectionWatermark text="FELLOW" light />

        <motion.div
          className="pointer-events-none absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(231,103,88,0.12) 0%, transparent 70%)' }}
          animate={shouldReduce ? {} : { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl relative z-10">
          <FadeUp>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB4AA]">
                  The REACT Fellow
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                  The rarest thing this centre produces.
                </h2>
                <p className="mt-5 text-xl leading-relaxed text-white/78">
                  And the only thing it cannot give — only recognise.
                </p>
              </div>
              <div className="space-y-5 text-[15px] leading-relaxed text-white/74 sm:text-base">
                <p>
                  Every fellow who completes a programme receives a Diploma in Social Innovation and
                  their credential. That is what completion earns and every completing fellow
                  deserves it fully.
                </p>
                <p>The REACT Fellow designation is different in kind.</p>
                <p>
                  Two years of the REACT methodology — living inside a real problem, building under
                  field conditions, producing verified evidence that something changed for real people
                  — does not leave a person unchanged. The centre&apos;s belief is that anyone who
                  genuinely goes through it will not stop when the programme ends. They will still be
                  working on social problems through innovative means. Still striving. Still finding
                  ways to create change that lasts.
                </p>
                <p>The REACT Fellow designation is awarded to the people who prove that belief correct.</p>
                <p>
                  The first proof is registering a venture during the final semester — a startup or
                  NGO directly connected to their REACT project, built for the community they spent
                  two years understanding. That act shows the work was real enough to formalise. What
                  the designation truly recognises is what comes after. Whether the person continues.
                  Whether they thrive in it.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h3 className="text-xl font-semibold text-white">What REACT Fellows receive</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/76">
                  {fellowBenefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB4AA]" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <blockquote className="border-l-4 border-[#E76758] pl-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                &ldquo;The designation is earned in the field. The venture opens the door. What comes after walks through it.&rdquo;
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THREE STAGES ── */}
      <SelectionSection />

      {/* ── COHORT 2 CTA (unchanged) ── */}
      <section className="relative overflow-hidden bg-[#101827] px-6 py-16 text-white sm:py-24">
        <SectionWatermark text="COHORT" light />

        <motion.div
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(231,103,88,0.10) 0%, transparent 70%)' }}
          animate={shouldReduce ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl relative z-10">
          <FadeUp>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Cohort 2 is forming now.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              Applications are open. Each programme has a fixed number of seats and a fixed window.
              If you know which programme is yours, apply. If you are still deciding, each programme
              page has everything you need to choose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#E76758] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#d8584a]"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to Us First
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {cohortLinks.map((item) => (
                <CohortLink key={item.label} item={item} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
};