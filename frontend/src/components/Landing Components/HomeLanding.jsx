import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { ArrowRight, Globe, Mail, ExternalLink, Copy, Check, BadgeCheck, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Assets ──────────────────────────────────────────────────────────────────
import Video from '../../assets/videos/video-hero.mp4';

// People (Testimonials)
import Aparna from '../../assets/people/Aparna.jpg';
import Jana from '../../assets/people/Jana.jpg';
import Nandeesh from '../../assets/people/Nandeesh.jpg';
import Sangeetha from '../../assets/people/Sangeetha.jpg';
import Sivakeerthana from '../../assets/people/Sivakeerthana.jpg';

// ── CONFIG ───────────────────────────────────────────────────────────────────
const CENTRE_NAME = 'Centre for REACT';

// ── SVG DOMAIN ICONS ─────────────────────────────────────────────────────────
function AgricultureIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 35V18" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18C20 10 12 6 6 8" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18C20 10 28 6 34 8" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 24C17 23 14 21 12 17" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24C23 23 26 21 28 17" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HealthIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 32C20 32 6 24 6 14C6 10 9 7 13 7C16 7 18.5 8.5 20 11C21.5 8.5 24 7 27 7C31 7 34 10 34 14C34 24 20 32 20 32Z" stroke="#9F1239" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 20H18L20 15L22 25L24 20H26" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnvironmentIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 34V20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20C20 12 10 6 6 6C6 6 8 16 20 20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20C20 12 30 6 34 6C34 6 32 16 20 20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 32C13 29 16 28 20 30C24 32 27 31 30 28" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CultureIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="13" stroke="#5B21B6" strokeWidth="2.5" />
      <path d="M10 20H30" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 7C20 7 14 13 14 20C14 27 20 33 20 33" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 7C20 7 26 13 26 20C26 27 20 33 20 33" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CommunityIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M8 20L20 8L32 20V34H24V26H16V34H8V20Z" stroke="#0C4A6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="17" r="2.5" stroke="#0C4A6E" strokeWidth="2" />
    </svg>
  );
}

function EducationIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M6 15L20 8L34 15L20 22L6 15Z" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 15V25" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 19V28C12 28 15 32 20 32C25 32 28 28 28 28V19" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────

const domains = [
  {
    title: 'Agriculture and Food Systems',
    desc: 'Smallholder farming, supply chains, food security, postharvest loss, agricultural markets.',
    Icon: AgricultureIcon,
    iconBg: 'bg-amber-100',
    shadowColor: 'rgba(251,191,36,0.45)',
    conicColors: '#F59E0B 0%, #EA580C 25%, #FCD34D 55%, #F97316 80%, #F59E0B 100%',
    maskBg: 'linear-gradient(135deg, #fffbeb, #fff7ed)',
  },
  {
    title: 'Health and Wellbeing',
    desc: 'Primary care access, diagnostics, maternal health, mental health, community health systems.',
    Icon: HealthIcon,
    iconBg: 'bg-rose-100',
    shadowColor: 'rgba(251,113,133,0.45)',
    conicColors: '#FB7185 0%, #EC4899 25%, #FCA5A5 55%, #F43F5E 80%, #FB7185 100%',
    maskBg: 'linear-gradient(135deg, #fff1f2, #fdf2f8)',
  },
  {
    title: 'Environment and Climate',
    desc: 'Water, waste, energy, climate adaptation, ecological restoration, urban sustainability.',
    Icon: EnvironmentIcon,
    iconBg: 'bg-emerald-100',
    shadowColor: 'rgba(52,211,153,0.45)',
    conicColors: '#34D399 0%, #0D9488 25%, #6EE7B7 55%, #10B981 80%, #34D399 100%',
    maskBg: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
  },
  {
    title: 'Culture and Creative Economy',
    desc: 'Indigenous knowledge, craft, performing arts, creative livelihoods, cultural heritage.',
    Icon: CultureIcon,
    iconBg: 'bg-violet-100',
    shadowColor: 'rgba(167,139,250,0.45)',
    conicColors: '#A78BFA 0%, #7C3AED 25%, #C4B5FD 55%, #8B5CF6 80%, #A78BFA 100%',
    maskBg: 'linear-gradient(135deg, #f5f3ff, #faf5ff)',
  },
  {
    title: 'Sustainable Communities',
    desc: 'Housing, infrastructure, governance, mobility, civic systems, community resilience.',
    Icon: CommunityIcon,
    iconBg: 'bg-sky-100',
    shadowColor: 'rgba(56,189,248,0.45)',
    conicColors: '#38BDF8 0%, #3B82F6 25%, #7DD3FC 55%, #0EA5E9 80%, #38BDF8 100%',
    maskBg: 'linear-gradient(135deg, #f0f9ff, #eff6ff)',
  },
  {
    title: 'Education and Livelihood',
    desc: 'Learning access, vocational pathways, skills systems, income security, economic mobility.',
    Icon: EducationIcon,
    iconBg: 'bg-yellow-100',
    shadowColor: 'rgba(250,204,21,0.45)',
    conicColors: '#FDE047 0%, #84CC16 25%, #FEF08A 55%, #FACC15 80%, #FDE047 100%',
    maskBg: 'linear-gradient(135deg, #fefce8, #f7fee7)',
  },
];

const outputs = [
  'A published or submitted research paper',
  'A filed patent or documented IP record',
  'A working proof of concept, tested and documented in the field',
  'A minimum viable product or prototype tested with real users in real conditions',
  'A submitted grant proposal',
  'An investor pitch deck presented at a public Demo Day before investors, industry, and community members',
  'A registered or actively developing social venture with a verified community impact report',
];

const testimonials = [
  {
    name: 'Janarthanan V',
    title: 'Chevening Scholar, Imperial College London',
    quote: "Working in policy and grassroots innovation, I've always believed in the power of field-based education. REACT is the first program I've seen that truly embodies that vision.",
    img: Jana,
    linkedin: 'https://www.linkedin.com/in/connectwithjana/',
  },
  {
    name: 'Sivakeerthana',
    title: 'R and D Engineer (Zoho Corp)',
    quote: "As someone immersed in applied research, I've been waiting to see a program that connects students to the real world meaningfully. REACT does that with clarity and conviction.",
    img: Sivakeerthana,
    linkedin: 'https://www.linkedin.com/in/sivakeerthana/',
  },
  {
    name: 'Sangeetha',
    title: 'Professor',
    quote: "For years, I've watched students struggle to connect theory with the reality outside. REACT filled that gap in the most profound way. It brings back meaning to education.",
    img: Sangeetha,
    linkedin: 'https://www.linkedin.com/in/dr-sangeetha-n-ab397258/',
  },
  {
    name: 'Aparna',
    title: 'Student',
    quote: "I had never walked through a village and asked, 'How can I help?' REACT made me do that — and it changed how I see engineering forever.",
    img: Aparna,
    linkedin: 'https://www.linkedin.com/in/aparnarm2904/',
  },
  {
    name: 'Nandeeswaran',
    title: 'Student',
    quote: "We built a working prototype with farmers. Not for them, but with them. That experience taught me more than any textbook ever could.",
    img: Nandeesh,
    linkedin: 'https://www.linkedin.com/in/nandeeswaran-k/',
  },
];

const featuredProjects = [
  {
    name: 'Flushable Napkin',
    domain: 'Health and Wellbeing',
    stripGradient: 'linear-gradient(180deg, #fb7185, #be123c)',
    domainColor: 'bg-rose-100 text-rose-800',
    desc: 'A biodegradable, flushable sanitary napkin co-developed with rural women to address menstrual hygiene and waste disposal challenges.',
    link: '/projects',
    accentColor: '#9F1239',
    stack: ['Biodegradable Materials', 'Field Co-design', 'Waste Systems'],
    pastel: '#ffe4e6',
    pastelDeep: '#fecdd3',
  },
  {
    name: 'Modular Solar Drying sheet',
    domain: 'Environment and Climate',
    domainColor: 'bg-emerald-100 text-emerald-800',
    desc: 'A community-led water management initiative addressing seasonal scarcity in peri-urban zones.',
    link: '/projects/therbal',
    accentColor: '#065F46',
    stack: ['IoT Sensors', 'Water Analytics', 'Community Ops'],
    pastel: '#d1fae5',
    pastelDeep: '#a7f3d0',
    stripGradient: 'linear-gradient(180deg, #34d399, #065F46)',
  },
  {
    name: 'Mushroom Farming',
    domain: 'Agriculture and Food Systems',
    domainColor: 'bg-amber-100 text-amber-800',
    desc: 'A low-cost mushroom cultivation system designed with smallholder farmers to diversify income and improve nutrition.',
    link: '/projects',
    accentColor: '#92400E',
    stack: ['Low-cost Cultivation', 'Farmer Training', 'Bio Inputs'],
    pastel: '#fef3c7',
    pastelDeep: '#fde68a',
    stripGradient: 'linear-gradient(180deg, #fbbf24, #92400E)',
  },
  {
    name: 'Shrimp Farming',
    domain: 'Agriculture and Food Systems',
    domainColor: 'bg-orange-100 text-orange-800',
    desc: 'An automated shrimp feeding system built with coastal farming communities to reduce waste and increase yield.',
    link: '/projects/shrimp-feeder',
    accentColor: '#9A3412',
    stack: ['Embedded Systems', 'Automation', 'Sensor Hardware'],
    pastel: '#ffedd5',
    pastelDeep: '#fed7aa',
    stripGradient: 'linear-gradient(180deg, #fb923c, #9A3412)',
  },
  {
    name: 'VR Simulator',
    domain: 'Education and Livelihood',
    domainColor: 'bg-violet-100 text-violet-800',
    desc: 'A virtual reality simulator for vocational skill training, co-designed with industry partners and students.',
    stack: ['Unity', 'VR Hardware', '3D Modeling'],
    link: '/projects/vision-x',
    accentColor: '#5B21B6',
    pastel: '#ede9fe',
    pastelDeep: '#ddd6fe',
    stripGradient: 'linear-gradient(180deg, #a78bfa, #5B21B6)',
  },
];

const programmes = [
  {
    title: 'Social Innovation Fellowship',
    duration: 'Two years',
    credential: "Diploma in Social Innovation + Partner Master's degree from Kumaraguru Institutions.",
    eligibility: 'For postgraduate students.',
    tag: 'Flagship',
    link: '/fellowship/social-innovation-fellowship',
    accentColor: '#F59E0B',
    cardBg: '#160e00',
    conicColors: '#f59e0b 0%, #f97316 22%, #fbbf24 50%, #ef4444 75%, #f59e0b 100%',
  },
  {
    title: 'Social Innovation Programme',
    duration: 'One year',
    credential: 'Full REACT methodology. The same Diploma.',
    eligibility: 'Open to any graduate anywhere in the world.',
    tag: null,
    link: '/fellowship/social-impact-fellowship',
    accentColor: '#38BDF8',
    cardBg: '#001826',
    conicColors: '#38bdf8 0%, #0ea5e9 22%, #7dd3fc 50%, #6366f1 75%, #38bdf8 100%',
  },
  {
    title: 'Social Innovation Certification',
    duration: 'One semester',
    credential: 'Foundational skill — understanding a problem deeply enough that it is worth solving.',
    eligibility: 'Open to any current student at any institution.',
    tag: null,
    link: '/fellowship/social-innovation-certification',
    accentColor: '#A78BFA',
    cardBg: '#0c0020',
    conicColors: '#a78bfa 0%, #7c3aed 22%, #c4b5fd 50%, #ec4899 75%, #a78bfa 100%',
  },
  {
    title: 'Field Internship',
    duration: 'Variable duration',
    credential: 'Immersive engagement with live programme work alongside active fellows and field partners.',
    eligibility: 'For students and early-career professionals. Rolling intake.',
    tag: 'Rolling',
    link: '/fellowship/field-internship',
    accentColor: '#34D399',
    cardBg: '#001a0e',
    conicColors: '#34d399 0%, #10b981 22%, #6ee7b7 50%, #06b6d4 75%, #34d399 100%',
  },
];

const cohortLinks = [
  {
    label: 'reactfellowship.kumaraguru.in',
    href: 'https://reactfellowship.kumaraguru.in',
    Icon: Globe,
    action: 'link',
  },
  {
    label: 'info.react@kumaraguru.in',
    href: 'mailto:info.react@kumaraguru.in',
    Icon: Mail,
    action: 'copy',
    copyText: 'info.react@kumaraguru.in',
  },
];

// ── SHARED HELPERS ────────────────────────────────────────────────────────────

function CohortLinkBtn({ item }) {
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
        <item.Icon className="h-4 w-4 opacity-75" />
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3 opacity-45" />
      </a>
    );
  }

  return (
    <button onClick={handleCopy} className={base}>
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <item.Icon className="h-4 w-4 opacity-75" />}
      <span>{copied ? 'Copied to clipboard!' : item.label}</span>
      {!copied && <Copy className="h-3 w-3 opacity-45" />}
    </button>
  );
}

// 3D tilt card hook
function use3DTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glare: { x: 50, y: 50 } });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: rx, y: ry, glare: { x: glareX, y: glareY } });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0, glare: { x: 50, y: 50 } }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

// ── SECTION COMPONENTS ────────────────────────────────────────────────────────

/* ── Hero animation variants ── */
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};
const heroHeading = {
  hidden: { opacity: 0, y: 50, filter: 'blur(14px)', scale: 0.97 },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── S01: Hero ── */
function HeroSection() {
  const [shimmerReady, setShimmerReady] = useState(false);
  const breathControls  = useAnimation();

  // cubic-bezier(0.22, 1, 0.36, 1) — smooth overshoot-free ease-out
  const E = [0.22, 1, 0.36, 1];

  // After the last line fully settles: start breathing + fire shimmer
  const onLine3Done = useCallback(() => {
    setShimmerReady(true);
    breathControls.start({
      scale: [1, 1.022, 1],
      transition: { duration: 4.2, ease: 'easeInOut', repeat: Infinity },
    });
  }, [breathControls]);

  return (
    <section
      id="home-hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* ── Background — completely untouched ── */}
      <motion.video
        src={Video} autoPlay loop muted playsInline
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.38 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-gray-950"
        initial={{ opacity: 0 }} animate={{ opacity: 0.68 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      {/* ── Text content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.75, delay: 0.1, ease: E }}
          className="text-xs sm:text-sm tracking-[0.28em] uppercase font-bold mb-6"
          style={{ color: '#D97706' }}
        >
          {CENTRE_NAME} · Kumaraguru Institutions, Coimbatore
        </motion.p>

        {/* ── Heading ──────────────────────────────────────────────────────────
             Each span uses display:block so CSS transforms actually apply.
             (Browsers silently ignore translateY / scale on inline elements.)
             breathControls wraps all three lines in one breathing container.
             ──────────────────────────────────────────────────────────────── */}
        <div className="relative mb-8">
          <motion.div animate={breathControls} style={{ originX: '50%', originY: '50%' }}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08]"
              style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              {/* LINE 1 */}
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.45, filter: 'blur(30px)' }}
                animate={{ opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)'  }}
                transition={{ duration: 0.95, delay: 0.3, ease: E }}
                style={{ display: 'block', textShadow: '0 4px 48px rgba(0,0,0,0.7)' }}
              >
                Where real problems meet
              </motion.span>

              {/* LINE 2 — orange + strong glow burst then fade */}
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.45, filter: 'blur(30px)' }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  textShadow: [
                    '0 0 0px   rgba(217,119,6,0)',
                    '0 0 60px  rgba(217,119,6,0.95)',
                    '0 0 0px   rgba(217,119,6,0)',
                  ],
                }}
                transition={{
                  opacity:    { duration: 0.95, delay: 0.48, ease: E },
                  y:          { duration: 0.95, delay: 0.48, ease: E },
                  scale:      { duration: 0.95, delay: 0.48, ease: E },
                  filter:     { duration: 0.95, delay: 0.48, ease: E },
                  textShadow: { duration: 2.6,  delay: 0.48, ease: 'easeOut', times: [0, 0.28, 1] },
                }}
                style={{ display: 'block', color: '#D97706' }}
              >
                people willing
              </motion.span>

              {/* LINE 3 — fires breathing + shimmer when complete */}
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.45, filter: 'blur(30px)' }}
                animate={{ opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)'  }}
                transition={{ duration: 0.95, delay: 0.66, ease: E }}
                style={{ display: 'block', textShadow: '0 4px 48px rgba(0,0,0,0.7)' }}
                onAnimationComplete={onLine3Done}
              >
                to solve them.
              </motion.span>
            </h1>
          </motion.div>

          {/* One-shot cinematic glow sweep — fires once after reveal */}
          {shimmerReady && (
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-120%' }}
              animate={{ x: '210%' }}
              transition={{ duration: 0.82, ease: E }}
              style={{
                background:
                  'linear-gradient(108deg, transparent 18%, rgba(255,255,255,0.14) 50%, transparent 82%)',
              }}
            />
          )}
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.3, ease: E }}
          className="max-w-3xl text-base sm:text-lg text-white/70 leading-relaxed mb-12"
        >
          REACT — Real World Engineering And Application through Collaborative Transformation — is a methodology
          for learning by doing, building by living, and creating change by working with the people who carry the problem.
          This is the centre where that happens.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.5, ease: E }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link to="/apply">
            <button
              className="px-9 py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1"
              style={{ background: '#D97706', color: '#000', boxShadow: '0 8px 28px rgba(217,119,6,0.35)' }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,255,255,0.2)'; }}
              onMouseOut={(e)  => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(217,119,6,0.35)'; }}
            >
              Apply Now
            </button>
          </Link>
          <Link to="/about">
            <button className="px-9 py-4 border-2 border-white/50 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-amber-500 hover:text-amber-500 transition-all duration-300 hover:-translate-y-1">
              What is REACT?
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

/* ── REACT acronym items ── */
const reactPrinciples = [
  {
    letter: 'R',
    word: 'eal world',
    desc: '— because the field is the classroom.',
  },
  {
    letter: 'E',
    word: 'ngineering',
    desc: '— the disciplined application of knowledge to build something that functions.',
  },
  {
    letter: 'A',
    word: 'pplication',
    desc: '— because knowledge that can be used on a real problem is complete.',
  },
  {
    letter: 'C',
    word: 'ollaborative',
    desc: '— because every meaningful social problem has been solved by people working together.',
  },
  {
    letter: 'T',
    word: 'ransformation',
    desc: '— because the measure of the work is whether something genuinely changed for the people it was built for.',
  },
];

/* ── Variants for REACT principle rows — three named states so variant
     propagation carries "hovered" down to the letter span automatically ── */
const rowVariants = {
  hidden:   { opacity: 0, x: -32, backgroundColor: 'rgba(255,255,255,0)' },
  rest:     { opacity: 1, x: 0,   backgroundColor: 'rgba(255,255,255,0)' },
  hovered:  { opacity: 1, x: 8,   backgroundColor: 'rgba(251,191,36,0.07)',
               transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

const letterVariants = {
  hidden:   { scale: 1 },
  rest:     { scale: 1,    textShadow: '0 0 0px rgba(217,119,6,0)' },
  // scale 1.15 — visible emphasis without overflowing into adjacent text or rows.
  // textShadow compensates for the smaller scale with a brighter orange glow.
  hovered:  { scale: 1.15, textShadow: '0 0 22px rgba(217,119,6,0.9)',
               transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

const descVariants = {
  hidden:  { color: '#4B5563' },
  rest:    { color: '#4B5563' },
  hovered: { color: '#1F2937', transition: { duration: 0.22 } },
};

/* ── S02: What REACT Is ── */
function WhatReactIsSection() {
  return (
    <section
      id="what-react-is"
      className="bg-white py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          The Methodology
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-4 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          A discipline of building. A way of working. A field of action. A way of working.
        </motion.h2>
        <p className="text-lg text-amber-700 font-bold mb-10 italic">
          Real World Engineering and Application through Collaborative Transformation. Every word is a principle.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left card — REACT acronym */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              boxShadow: '0 0 0 2px #D97706, 0 16px 48px rgba(217,119,6,0.18)',
              transition: { duration: 0.3 },
            }}
            className="flex flex-col justify-between rounded-2xl p-8"
            style={{ border: '2px solid #D97706' }}
          >
            <div className="space-y-3 text-base leading-relaxed">
              {reactPrinciples.map(({ letter, word, desc }, i) => (
                <motion.div
                  key={letter}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="rest"
                  whileHover="hovered"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-0 cursor-default rounded-lg px-2 py-1"
                >
                  <motion.span
                    variants={letterVariants}
                    className="font-black inline-block"
                    style={{
                      fontSize: '1.55rem',
                      color: '#D97706',
                      lineHeight: 1,
                      minWidth: '1.05ch',
                      display: 'inline-block',
                      // center-bottom anchor: all scale growth goes UPWARD into the
                      // existing py-1 padding — never sideways into the adjacent word.
                      transformOrigin: '50% 100%',
                    }}
                  >
                    {letter}
                  </motion.span>
                  <span className="font-bold text-gray-900">{word}</span>
                  <motion.span variants={descVariants} className="ml-1 text-gray-600">{desc}</motion.span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors group self-start"
              >
                About the REACT methodology
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right card — fellows description */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -6,
              boxShadow: '0 0 0 2px #F59E0B, 0 20px 56px rgba(245,158,11,0.16)',
              transition: { duration: 0.3 },
            }}
            className="rounded-2xl p-8 text-gray-700 text-base leading-relaxed"
            style={{ border: '2px solid #F59E0B' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mb-5"
            >
              Fellows get close to social problems — close enough to live inside them. They work alongside communities.
              They build <em>with</em> people, not <em>for</em> them. And they stay until something real exists —
              a tested solution, a filed patent, a registered venture, a community that is measurably better off.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.45 }}
            >
              The centre exists to make that possible. It provides the structure, the methodology, the field access,
              the mentors, and the institutional backing. The fellow does the work.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── S03: Six Impact Domains ── */
function DomainCard({ d, i }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt();
  const isActive = tilt.x !== 0 || tilt.y !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1, y: -10, zIndex: 10 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: isActive
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'box-shadow 0.35s ease',
        boxShadow: isActive
          ? `0 24px 48px ${d.shadowColor}, 0 8px 20px rgba(0,0,0,0.12)`
          : '0 2px 8px rgba(0,0,0,0.06)',
        position: 'relative',
        background: d.maskBg,
      }}
      className="relative rounded-2xl cursor-pointer overflow-hidden"
    >
      {/* Rotating conic gradient — covers entire card at 35% opacity so it sweeps the full face */}
      <div
        className="domain-border-anim"
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(from 0deg at 50% 50%, ${d.conicColors})`,
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      {/* Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.28) 0%, transparent 60%)`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s',
          zIndex: 12,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px' }}>
        <div
          className={`w-14 h-14 ${d.iconBg} rounded-2xl flex items-center justify-center mb-5`}
          style={{ boxShadow: `0 4px 14px ${d.shadowColor}` }}
        >
          <d.Icon className="w-8 h-8" />
        </div>

        <h3 className="font-black text-gray-900 text-base mb-2" style={{ letterSpacing: '-0.01em' }}>
          {d.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
      </div>
    </motion.div>
  );
}

function DomainsSection() {
  return (
    <section
      id="domains"
      className="bg-gray-50 py-20 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Where Fellows Work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-gray-950 mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          Six domains. Real communities. Real-world challenges.
        </motion.h2>
        <p className="text-gray-600 text-base max-w-2xl mb-12 leading-relaxed">
          Every fellow chooses one domain at entry and works within it for the full duration of their programme.
          The domain shapes everything — the problem they work on, the field partner they are placed with, the mentor network
          they access, and the venture they build.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <DomainCard key={d.title} d={d} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S04: What Fellows Produce ── */
function OutputsSection() {
  return (
    <section
      id="outputs"
      className="bg-white py-20 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Real Outputs
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-gray-950 mb-3 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          A degree is the minimum.<br />Here is what else fellows leave with.
        </motion.h2>
        <p className="text-gray-600 text-base mb-10 leading-relaxed max-w-2xl">
          Every fellow who completes the programme produces all of the following. These are not optional enrichment activities.
          They are the gates through which the programme advances.
        </p>

        <ul className="space-y-3">
          {outputs.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-90px 0px 0px 0px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-amber-300 hover:bg-amber-50/40 transition-colors duration-200 group cursor-default"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: '-90px 0px 0px 0px' }}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.15, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200"
              >
                {i + 1}
              </motion.span>
              <span className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-5 bg-gray-900 rounded-2xl text-white"
        >
          <p className="text-sm leading-relaxed text-gray-300">
            Each cohort targets <span className="text-white font-bold">thirty fellows</span> and{' '}
            <span className="text-white font-bold">twelve registered ventures</span>. Those ventures exist after graduation.
            They continue serving the communities they were built for.
          </p>
        </motion.div>

        <Link
          to="/programme"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          See how the programme works
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S05: The REACT Fellow ── */
function ReactFellowSection() {
  return (
    <section
      id="react-fellow"
      className="bg-gray-950 py-24 px-6 relative overflow-hidden min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center w-full">
        <p className="text-xs tracking-[0.22em] uppercase text-amber-400 font-bold mb-6">
          The Highest Recognition
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-10 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Not everyone who completes the programme<br className="hidden md:block" /> becomes a REACT Fellow.
        </motion.h2>

        <div className="text-left space-y-5 text-gray-300 text-base leading-relaxed mb-14 max-w-3xl mx-auto">
          <p>
            Every fellow who completes the programme receives a{' '}
            <span className="text-white font-bold">Diploma in Social Innovation</span> and a{' '}
            <span className="text-white font-bold">Partner Master's degree from Kumaraguru Institutions</span>.
            That is what completion earns.
          </p>
          <p>
            The REACT Fellow designation is something else. It is awarded only to those who register a startup or NGO
            during the programme — an organisation directly connected to their project, built for the community they spent
            two years understanding. It cannot be applied for. It cannot be negotiated. It is triggered by one act:
            registering an entity that proves the work was real.
          </p>
          <p>
            REACT Fellows enter a permanent network — mentor access, incubation pipeline, grant introductions,
            and investor connections — that continues two years beyond graduation.
          </p>
        </div>

        {/* Pull quote — no decorative character */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-l-4 border-amber-500 pl-8 text-left max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-black text-white italic leading-relaxed"
            style={{ letterSpacing: '-0.01em' }}>
            "The institution does not determine the designation. The venture does."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ── S06: For Partners ── */
function PartnersSection() {
  return (
    <section
      id="for-partners"
      className="bg-white py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
              For Organisations and Communities
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-gray-950 mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              The centre works with partners who have real problems worth solving.
            </motion.h2>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group">
                Partner with us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Field partners are not a backdrop for student projects. They are co-authors of the work. Every problem
              a fellow works on is validated with and by the organisation or community that carries it. Every solution
              is tested in their conditions. Every impact report is verified by them.
            </p>
            <p>
              If your organisation works on the ground in any of the six domains — if you have a problem that has resisted
              easy answers, a community that deserves a better solution, or knowledge that the next generation of social
              innovators needs — there is a place for you here.
            </p>
            <p>
              The centre partners with NGOs, civil society organisations, community groups, development practitioners,
              and institutional funders. Beyond the fellowship programmes, the centre convenes events and collaborations
              that connect social innovation practice across sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S07: Featured Projects — premium 3D rotating carousel ── */

const PROJECT_DOMAIN_ICON = {
  'Health and Wellbeing': HealthIcon,
  'Environment and Climate': EnvironmentIcon,
  'Agriculture and Food Systems': AgricultureIcon,
  'Culture and Creative Economy': CultureIcon,
  'Sustainable Communities': CommunityIcon,
  'Education and Livelihood': EducationIcon,
};

// True cylinder: 5 cards evenly spaced (360 / count) around a ring, all the same
// size. No card is stacked behind another — they're spread around the full circle.
function useCarouselGeometry() {
  const [geometry, setGeometry] = useState({ radius: 340, width: 260, height: 370, perspective: 1800, stagePad: 40 });

  useEffect(() => {
    function recompute() {
      const w = window.innerWidth;
      if (w < 640) {
        setGeometry({ radius: 165, width: 175, height: 280, perspective: 1050, stagePad: 20 });
      } else if (w < 1024) {
        setGeometry({ radius: 230, width: 190, height: 310, perspective: 1300, stagePad: 40 });
      } else {
        setGeometry({ radius: 340, width: 260, height: 370, perspective: 1800, stagePad: 40 });
      }
    }
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, []);

  return geometry;
}

// Ring placement is a literal CSS transform string — rotateY(angle) translateZ(radius) —
// applied in that exact order, NOT through Framer's x/y/z/rotateY shorthand (which
// composes translate before rotate and collapses every card to the same point).
// `rotation` is a motion value derived from scroll progress, applied once on the
// shared parent stage, so the cards spin together as the page scrolls.
function ProjectCarousel3DCard({ p, angle, radius, width, height, rotation }) {
  const Icon = PROJECT_DOMAIN_ICON[p.domain] || AgricultureIcon;

  const facing = useTransform(rotation, (r) => Math.cos(((r + angle) * Math.PI) / 180));
  // Cards are invisible until they near the front (facing > 0.3), then fade in sharply.
  // At ±72° (facing ≈ 0.31) cards are nearly invisible; only the front card shows clearly.
  const opacity = useTransform(facing, [-1, 0.25, 0.65, 1], [0, 0, 1, 1], { clamp: true });
  const scale  = useTransform(facing, [-1, 0.25, 0.65, 1], [0.55, 0.55, 0.9, 1], { clamp: true });
  const zIndex = useTransform(facing, (f) => Math.round(f * 100));
  const pointerEvents = useTransform(facing, (f) => (f > 0.6 ? 'auto' : 'none'));
  // Full project details only reveal once this card has rotated close to front-facing.
  const detailsOpacity = useTransform(facing, [0.65, 0.80], [0, 1], { clamp: true });

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ scale, opacity, zIndex, borderRadius: 20, pointerEvents }}
      >
        <div
          className="relative w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden]"
          style={{ WebkitBackfaceVisibility: 'hidden' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '20px',
              background: `linear-gradient(150deg, ${p.pastel}, ${p.pastelDeep})`,
              overflow: 'hidden',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Background icon watermark */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.12 }}>
              <Icon className="w-20 h-20 sm:w-24 sm:h-24" />
            </div>

            {/* Title always visible */}
            <div className="px-5 pt-5 pb-2" style={{ position: 'relative', zIndex: 2 }}>
              <h3
                className="text-gray-900 font-black"
                style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)', letterSpacing: '-0.01em', lineHeight: 1.2 }}
              >
                {p.name}
              </h3>
            </div>

            {/* Details — fade in as card reaches front; flex:1 fills remaining height */}
            <motion.div
              style={{ opacity: detailsOpacity, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}
              className="px-5 pb-5"
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold mb-2 mt-1 ${p.domainColor}`}
              >
                {p.domain}
              </span>
              <p className="text-gray-800 text-xs leading-relaxed" style={{ flex: 1 }}>{p.desc}</p>
              {/* Button pinned to bottom */}
              <div className="mt-4">
                <Link
                  to={p.link}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-900 bg-black/5 hover:bg-black/10 border border-black/15 rounded-full px-3 py-1.5 transition-colors"
                >
                  View Project
                  <ArrowRight size={10} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const { radius, width, height, perspective, stagePad } = useCarouselGeometry();
  const n = featuredProjects.length;
  const angleStep = 360 / n;

  // Step-function: each card occupies 1/n of scrollYProgress.
  // Hold for 88% of the segment, snap in the final 12% so each scroll = one card.
  const seg = 1 / n;
  const transitionFrac = 0.12; // 12% of each segment = transition; rest = hold
  const inputStops  = [0];
  const outputStops = [0];
  for (let i = 0; i < n; i++) {
    const holdEnd   = (i + 1) * seg - transitionFrac * seg;
    const snapEnd   = (i + 1) * seg;
    inputStops.push(holdEnd,        snapEnd);
    outputStops.push(i * angleStep, (i + 1) * angleStep);
  }
  const rawRotation = useTransform(scrollYProgress, inputStops, outputStops);
  // Stiff spring: snaps crisply to each card with no bounce
  const rotation = useSpring(rawRotation, { stiffness: 160, damping: 50, mass: 0.3 });

  // ── Swipe / drag navigation ───────────────────────────────────────────────
  const pointerStartX = useRef(null);

  const navigateCarousel = useCallback((direction) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const totalScrollable = section.scrollHeight - window.innerHeight;
    const stepSize = totalScrollable / n;
    const currentInSection = Math.max(0, window.scrollY - sectionTop);
    const currentStep = Math.round(currentInSection / stepSize);
    const targetStep = Math.min(Math.max(currentStep + direction, 0), n - 1);
    // Instant scroll — spring on rawRotation handles the smooth card revolution
    window.scrollTo(0, sectionTop + targetStep * stepSize);
  }, [n]);

  const handleMouseDown = useCallback((e) => { pointerStartX.current = e.clientX; }, []);
  const handleMouseUp = useCallback((e) => {
    if (pointerStartX.current === null) return;
    const delta = pointerStartX.current - e.clientX;
    pointerStartX.current = null;
    if (Math.abs(delta) < 40) return;
    navigateCarousel(delta > 0 ? 1 : -1);
  }, [navigateCarousel]);

  const handleTouchStart = useCallback((e) => { pointerStartX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd = useCallback((e) => {
    if (pointerStartX.current === null) return;
    const delta = pointerStartX.current - e.changedTouches[0].clientX;
    pointerStartX.current = null;
    if (Math.abs(delta) < 40) return;
    navigateCarousel(delta > 0 ? 1 : -1);
  }, [navigateCarousel]);

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative bg-white"
      style={{ scrollSnapAlign: 'start', minHeight: '700vh' }}
    >
      {/* Mobile only: text in normal scroll flow so the card is fully visible when pinning */}
      <div className="sm:hidden px-6 pt-20 pb-8 bg-white relative z-10">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-2">
          Built Inside the Centre
        </p>
        <h2 className="text-2xl font-black text-gray-950 mb-2" style={{ letterSpacing: '-0.02em' }}>
          These are projects that became something more.
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Every project here was built by fellows working on a real problem, in a real community, through the REACT
          methodology. Each went through field validation, a proof of concept, and user testing before it became what you see.
        </p>
      </div>

      <div
        className="sticky top-0 min-h-screen flex flex-col justify-center px-6 py-8"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-6xl mx-auto w-full">

          {/* Desktop only: text inside the sticky container */}
          <div className="hidden sm:block">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
              Built Inside the Centre
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-gray-950 mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              These are projects that became something more.
            </motion.h2>
            <p className="text-gray-600 text-base mb-6 max-w-2xl leading-relaxed">
              Every project here was built by fellows working on a real problem, in a real community, through the REACT
              methodology. Each went through field validation, a proof of concept, and user testing before it became what you see.
            </p>
          </div>

          {/* Carousel — both mobile and desktop */}
          <div className="relative mx-auto" style={{ perspective, height: height + stagePad, width: '100%' }}>
            <motion.div className="absolute inset-0" style={{ rotateY: rotation, transformStyle: 'preserve-3d' }}>
              {featuredProjects.map((p, i) => (
                <ProjectCarousel3DCard
                  key={p.name}
                  p={p}
                  angle={i * angleStep}
                  radius={radius}
                  width={width}
                  height={height}
                  rotation={rotation}
                />
              ))}
            </motion.div>

            {/* Left arrow — sits just left of the front card */}
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => navigateCarousel(-1)}
              aria-label="Previous project"
              style={{
                position: 'absolute',
                left: `calc(50% - ${width / 2 + 84}px)`,
                bottom: 12,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '2px solid #D1D5DB',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.background = 'white'; }}
            >
              <ArrowRight size={18} color="#374151" style={{ transform: 'rotate(180deg)' }} />
            </button>

            {/* Right arrow — sits just right of the front card */}
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => navigateCarousel(1)}
              aria-label="Next project"
              style={{
                position: 'absolute',
                left: `calc(50% + ${width / 2 + 40}px)`,
                bottom: 12,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '2px solid #D1D5DB',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111827'; e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.background = 'white'; }}
            >
              <ArrowRight size={18} color="#374151" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── S08: Testimonials ── */

// Dark glass card used inside the scroll-driven zig-zag layout
function TestimonialDarkCard({ item }) {
  return (
    <div
      className="relative flex flex-col h-full rounded-2xl"
      style={{
        background: '#0a0a0b',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(20px, 2.4vw, 28px)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
      }}
    >
      <p
        className="text-white/90 italic"
        style={{ flex: 1, fontSize: 'clamp(14px, 1.25vw, 18px)', lineHeight: 1.55 }}
      >
        "{item.quote}"
      </p>

      <div
        className="flex items-center justify-between gap-3 mt-4 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={item.img}
            alt={item.name}
            className="flex-shrink-0 object-cover"
            style={{ width: 48, height: 48, borderRadius: 9 }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-bold text-white text-[15px] leading-tight">{item.name}</p>
              <BadgeCheck size={14} className="flex-shrink-0 text-amber-500" />
            </div>
            <p className="text-[13px] text-white/50 leading-snug mt-0.5">{item.title}</p>
          </div>
        </div>

        <a
          href={item.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-white/40 hover:text-[#0A66C2] transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin size={18} />
        </a>
      </div>
    </div>
  );
}

// Static, non-animated fallback for prefers-reduced-motion
function StaticTestimonialsList({ testimonials }) {
  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto px-6">
      {testimonials.map((item, i) => (
        <TestimonialDarkCard key={i} item={item} />
      ))}
    </div>
  );
}

// Slot placement: alternating left / right / center / right / left, with
// variable heights + offsets to create overlap and rhythm between cards.
const TESTIMONIAL_SLOTS = [
  { justify: 'flex-start', minHeight: 'clamp(160px, 20vh, 240px)', marginTop: '0vh' },
  { justify: 'flex-end',   minHeight: 'clamp(160px, 20vh, 240px)', marginTop: '3vh' },
  { justify: 'flex-start', minHeight: 'clamp(160px, 20vh, 240px)', marginTop: '3vh' },
  { justify: 'flex-end',   minHeight: 'clamp(160px, 20vh, 240px)', marginTop: '3vh' },
  { justify: 'flex-start', minHeight: 'clamp(160px, 20vh, 240px)', marginTop: '3vh' },
];

const WATERMARK_PHRASE = 'Testimonials — Voices of REACT — ';

function ScrollDrivenTestimonials({ testimonials }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const watermarkRef = useRef(null);
  const slotRefs = useRef([]);
  const cardRefs = useRef([]);
  const frostRefs = useRef([]);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.to(watermarkRef.current, {
        xPercent: -50,
        duration: 36,
        ease: 'none',
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: bgRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
      });

      TESTIMONIAL_SLOTS.forEach((slot, i) => {
        const slotEl = slotRefs.current[i];
        const cardEl = cardRefs.current[i];
        const frostEl = frostRefs.current[i];
        if (!slotEl || !cardEl) return;

        const sign = slot.justify === 'flex-start' ? -1 : slot.justify === 'flex-end' ? 1 : 0;
        const enterRotateY = sign * (isMobile ? 0 : 6);
        const exitRotateY = -sign * (isMobile ? 0 : 4);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slotEl,
            start: 'top 90%',
            end: 'bottom 18%',
            scrub: 0.8,
          },
        });

        tl.fromTo(
          cardEl,
          {
            y: 110,
            opacity: 1,
            scale: 0.94,
            rotateX: isMobile ? 8 : 14,
            rotateY: enterRotateY,
            transformPerspective: 1200,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            ease: 'power2.out',
          }
        ).to(cardEl, {
          y: -90,
          opacity: 0,
          scale: 0.96,
          rotateX: isMobile ? -6 : -10,
          rotateY: exitRotateY,
          ease: 'power2.in',
        });

        if (frostEl) {
          tl.to(frostEl, { opacity: 0, ease: 'power2.out' }, 0);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  return (
    <div ref={sectionRef} style={{ position: 'relative', isolation: 'isolate', background: '#fff' }}>
      {/* Pinned background layer with scrolling watermark */}
      <div ref={bgRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <div
          ref={watermarkRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            display: 'flex',
            whiteSpace: 'nowrap',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 18vw, 13rem)',
            color: '#000',
            opacity: 0.05,
            letterSpacing: '-0.02em',
          }}
        >
          <span>{WATERMARK_PHRASE.repeat(4)}</span>
          <span>{WATERMARK_PHRASE.repeat(4)}</span>
        </div>
      </div>

      {/* Card overlay — scrolls over the pinned background */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '-100vh', pointerEvents: 'none' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '10rem' }}>
        {testimonials.map((item, i) => {
          const slot = TESTIMONIAL_SLOTS[i % TESTIMONIAL_SLOTS.length];
          return (
            <div
              key={i}
              ref={(el) => (slotRefs.current[i] = el)}
              className="px-6"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: slot.justify,
                minHeight: slot.minHeight,
                marginTop: slot.marginTop,
              }}
            >
              <div
                ref={(el) => (cardRefs.current[i] = el)}
                style={{
                  position: 'relative',
                  width: 'min(460px, 90vw)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  pointerEvents: 'auto',
                }}
              >
                <TestimonialDarkCard item={item} />
                <div
                  ref={(el) => (frostRefs.current[i] = el)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 16,
                    backdropFilter: 'blur(9px)',
                    WebkitBackdropFilter: 'blur(9px)',
                    pointerEvents: 'none',
                    maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)',
                    WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)',
                  }}
                />
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

function RecognitionSection() {
  return (
    <section className="bg-white py-8 px-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{ maxWidth: 900, width: '100%' }}
      >
        {/* Rotating conic gradient border */}
        <div
          className="prog-border-anim"
          style={{
            position: 'absolute', width: '200%', height: '200%',
            top: '-50%', left: '-50%',
            background: 'conic-gradient(from 0deg at 50% 50%, #38bdf8 0%, #0ea5e9 15%, #22d3ee 32%, #10b981 52%, #6366f1 72%, #38bdf8 100%)',
            filter: 'blur(2px) brightness(1.35)',
            zIndex: 0,
          }}
        />
        {/* Inner mask */}
        <div style={{ position: 'absolute', inset: '5px', borderRadius: '11px', background: '#00111f', zIndex: 1 }} />
        {/* Content — stacked on mobile, single row on sm+ */}
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 sm:px-8 py-5" style={{ zIndex: 2 }}>
          {/* Icon + label — shown as a row on mobile, icon-only on desktop */}
          <div className="flex items-center gap-3 sm:block">
            <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>🌐</div>
            <span className="sm:hidden text-xs tracking-[0.18em] uppercase font-bold" style={{ color: '#38bdf8' }}>
              Global Recognition
            </span>
          </div>
          {/* Main text — full width on mobile */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium leading-relaxed text-sm sm:leading-snug" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.98rem)' }}>
              <span className="hidden sm:inline text-xs tracking-[0.18em] uppercase font-bold mr-3" style={{ color: '#38bdf8' }}>Global Recognition</span>
              The centre's work is{' '}
              <span className="font-black" style={{ color: '#7dd3fc' }}>featured in</span>{' '}
              the YOUNGO Youth Project Compilation on Food, Agriculture and Climate Action (Vol. 1, 2025),
              published by the official Youth Constituency of the United Nations Framework Convention on Climate Change.
            </p>
          </div>
          {/* Badges */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            {['YOUNGO', 'UNFCCC', '2025'].map((label, i) => (
              <span
                key={label}
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: i === 0 ? 'rgba(56,189,248,0.14)' : i === 1 ? 'rgba(16,185,129,0.14)' : 'rgba(255,255,255,0.07)',
                  color: i === 0 ? '#7dd3fc' : i === 1 ? '#6ee7b7' : '#94a3b8',
                  border: `1px solid ${i === 0 ? 'rgba(56,189,248,0.3)' : i === 1 ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.14)'}`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TestimonialsSection() {
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  return (
    <section id="testimonials" className="bg-white" style={{ scrollSnapAlign: 'start' }}>
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          From the People Inside It
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-950" style={{ letterSpacing: '-0.02em' }}>
          From the people who have been inside it.
        </h2>
        <p className="text-gray-600 text-base mt-3 max-w-xl leading-relaxed">
          Fellows, mentors, and community members on what the work looks like from where they stand.
        </p>
      </div>

      {reducedMotion ? (
        <div className="pb-14">
          <StaticTestimonialsList testimonials={testimonials} />
        </div>
      ) : (
        <ScrollDrivenTestimonials testimonials={testimonials} />
      )}
    </section>
  );
}

/* ── S09: Programmes in Brief ── */
function ProgrammeCard({ prog, i }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt();
  const isHovered = Boolean(tilt.x || tilt.y);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07, y: -8, zIndex: 10 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'box-shadow 0.35s ease',
        boxShadow: isHovered
          ? `0 24px 48px rgba(0,0,0,0.5), 0 0 32px ${prog.accentColor}40`
          : `0 4px 24px ${prog.accentColor}18`,
        minHeight: 280,
      }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Rotating conic gradient — clipped by overflow:hidden to create the glowing border */}
      <div
        className="prog-border-anim"
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(from 0deg at 50% 50%, ${prog.conicColors})`,
          filter: 'blur(3px) brightness(1.4)',
          zIndex: 0,
        }}
      />

      {/* Inner mask — hides the rotating gradient except at the border edge */}
      <div
        style={{
          position: 'absolute',
          inset: '5px',
          borderRadius: '11px',
          background: prog.cardBg,
          zIndex: 1,
        }}
      />

      {/* Glare on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.1) 0%, transparent 55%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
          zIndex: 12,
        }}
      />

      {/* Flip wrapper — rotates on the Y-axis on hover to reveal the back face */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
          zIndex: 2,
          minHeight: 280,
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: isHovered ? 'none' : 'auto',
          }}
        >
          {prog.tag && (
            <span
              className="absolute top-4 right-4 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full font-bold"
              style={{ background: `${prog.accentColor}25`, color: prog.accentColor }}
            >
              {prog.tag}
            </span>
          )}

          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">{prog.duration}</p>
            <h3 className="text-white font-black text-lg leading-snug mb-3" style={{ letterSpacing: '-0.01em' }}>
              {prog.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">{prog.credential}</p>
            <p className="text-gray-500 text-xs leading-relaxed">{prog.eligibility}</p>
          </div>
        </div>

        {/* Back face — CTA only */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <Link to={prog.link} className="w-full">
            <button
              className="w-full text-center text-xs font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/60 rounded-lg py-2.5 transition-all duration-200 hover:bg-white/5"
              style={{ borderColor: `${prog.accentColor}40` }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = prog.accentColor)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = `${prog.accentColor}40`)}
            >
              Know more →
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ProgrammesSection() {
  return (
    <section
      id="programmes"
      className="bg-gray-950 py-20 px-6 relative overflow-hidden min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #a78bfa 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">
          Entry Points
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-white mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Four ways to work through REACT.
        </motion.h2>
        <p className="text-gray-400 text-base mb-12 max-w-2xl leading-relaxed">
          Every programme at this centre is built on the REACT methodology — the same field immersion, the same proprietary
          frameworks, the same standard of real-world output. What changes is duration, credential, and where you are in your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programmes.map((prog, i) => (
            <ProgrammeCard key={prog.title} prog={prog} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S11: Closing CTA ── */
function ClosingCTASection() {
  return (
    <section
      id="closing-cta"
      className="bg-gray-950 border-t border-white/5 py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Cohort 2 admissions are open<br className="hidden sm:block" /> for the 2026 batch.
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            Each programme has a fixed number of seats. If you are a prospective fellow, now is the time.
            If you are an organisation looking to partner, we want to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/apply">
              <button className="px-9 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-xl hover:shadow-amber-400/30 hover:-translate-y-1">
                Apply Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-9 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                Talk to Us
              </button>
            </Link>
          </div>

          {/* CohortLink-style contact buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {cohortLinks.map((item) => (
              <CohortLinkBtn key={item.label} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── ROOT EXPORT ───────────────────────────────────────────────────────────────

export default function HomeLanding() {
  // Apply scroll snap to the html element while on this page
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y proximity';
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollSnapType = '';
      html.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main>
      <HeroSection />
      <WhatReactIsSection />
      <DomainsSection />
      <OutputsSection />
      <ReactFellowSection />
      <PartnersSection />
      <ProjectsSection />
      <TestimonialsSection />
      <RecognitionSection />
      <ProgrammesSection />
      <ClosingCTASection />
    </main>
  );
}
