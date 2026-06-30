import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useInView, useMotionValue } from 'framer-motion';
import {
  ArrowUpRight, Leaf, FlaskConical, Sun, Flame, Waves,
  Monitor, Brain, Activity, Microscope,
} from 'lucide-react';

// ─── Project data (UNCHANGED) ────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, number: '01',
    title: 'Flushable Sanitary Pads',
    domain: 'Health and Wellbeing',
    tags: ['Biodegradable', 'Biotech', "Women's Health"],
    description: 'A Flushable sanitary pad developed using natural fibers and a biodegradable bio-superabsorbent system to replace plastic-based materials. It provides effective absorbency, comfort, and leakage protection while safely degrading after disposal, reducing menstrual waste pollution and supporting eco-friendly menstrual hygiene.',
    website: 'https://khyora.vercel.app/',
    accent: '#0d9488', lightBg: '#f0fdfa', Icon: Leaf,
  },
  {
    id: 2, number: '02',
    title: 'Modular Solar Drying Sheet',
    domain: 'Environment and Climate',
    tags: ['Solar', 'Thermal', 'Post-harvest'],
    description: 'A flexible solar thermal system designed to efficiently convert sunlight into heat through advanced photothermal materials, enabling effective drying of agricultural and marine products. It reduces post-harvest losses by providing a portable, low-cost alternative to fossil fuel dryers.',
    website: 'https://react.kct.ac.in/projects/therbel',
    accent: '#ea580c', lightBg: '#fff7ed', Icon: Sun,
  },
  
  {
    id: 3, number: '03',
    title: 'Precision Feeding and Health Monitoring for Shrimp Farming',
    domain: 'Agriculture and Food Systems',
    tags: ['Precision Feeding', 'IoT', 'Aquaculture'],
    description: 'An intelligent feeding solution for shrimp farms that delivers precise and timely feed distribution by tracking real-time shrimp behaviour and health indicators, reducing feed waste and improving overall pond health and harvest productivity.',
    website: 'https://shrimpfeeder.vercel.app/',
    accent: '#0284c7', lightBg: '#f0f9ff', Icon: Waves,
  },
  {
    id: 4, number: '04',
    title: 'Immersive Medical Training Simulator for Retinoscope',
    domain: 'Education and Livelihood',
    tags: ['Virtual Reality', 'EdTech', 'Simulation'],
    description: 'A virtual reality training platform that simulates retinoscopy procedures, allowing medical students and ophthalmology trainees to practise refraction and eye examination skills in a realistic, risk-free environment without the need for real patients.',
    website: 'http://react.kct.ac.in/projects/vrsimulator',
    accent: '#7c3aed', lightBg: '#faf5ff', Icon: Monitor,
  },
  {
    id: 5, number: '05',
    title: 'Converting Food Waste into Biogas',
    domain: 'Agriculture and Food Systems',
    tags: ['Biogas', 'Circular Economy', 'Waste-to-Energy'],
    description: 'An advanced two-stage bioreactor that converts food waste into high-purity methane through optimised anaerobic digestion, providing a scalable clean energy solution for households and small institutions while reducing organic waste disposal.',
    website: 'https://react.kct.ac.in/projects/biopod',
    accent: '#16a34a', lightBg: '#f0fdf4', Icon: Flame,
  },
  {
    id: 6, number: '06',
    title: 'AI-Enabled Smart Patient Flow Monitoring System',
    domain: 'Health and Wellbeing',
    tags: ['AI', 'IoT', 'Hospital Management'],
    description: 'An intelligent hospital management system that uses wearable patient wristbands, real-time tracking, and AI analytics to monitor patient movement and predict bottlenecks, improving care delivery and reducing emergency wait times.',
    website: 'https://flow-sync-lilac.vercel.app/',
    accent: '#0891b2', lightBg: '#ecfeff', Icon: Brain,
  },
  {
    id: 7, number: '07',
    title: 'Plug-and-Play Smart Microclimate Control for Mushroom Cultivation',
    domain: 'Agriculture and Food Systems',
    tags: ['IoT', 'Automation', 'Sustainable Farming'],
    description: 'A portable automated climate-control system designed for mushroom growing chambers, maintaining optimal humidity, temperature, CO₂, and light levels through continuous monitoring and real-time adjustments to maximise yield and minimise crop failure.',
    website:'#',
    accent: '#d97706', lightBg: '#fffbeb', Icon: FlaskConical,
  },
  {
    id: 8, number: '08',
    title: 'Intelligent Early Warning System for Cardiac and Stroke Risks',
    domain: 'Health and Wellbeing',
    tags: ['Cardiac Monitoring', 'AI', 'Wearable'],
    description: 'A real-time health monitoring system that continuously tracks vital cardiovascular parameters such as heart rate, ECG, SpO₂, and HRV, using AI to detect early warning signs of cardiac events and stroke, enabling timely medical intervention.',
    website: '#',
    accent: '#dc2626', lightBg: '#fef2f2', Icon: Activity,
  },
  {
    id: 9, number: '09',
    title: 'Non-Destructive Sex Determination in Papaya Seeds',
    domain: 'Agriculture and Food Systems',
    tags: ['Spectroscopy', 'ML', 'Horticulture'],
    description: 'A spectroscopy-based system that identifies the sex of papaya seeds without damaging them, enabling farmers to selectively cultivate only female or hermaphrodite plants, significantly improving yield efficiency and reducing crop waste.',
    website: '#',
    accent: '#65a30d', lightBg: '#f7fee7', Icon: Microscope,
  },
];

// ─── Bento layout: column spans per card ─────────────────────────────────────
//   Row 1 → [01 ×1] [02 ×2]         = 3 cols
//   Row 2 → [03 ×2] [04 ×1]         = 3 cols
//   Row 3 → [05 ×1] [06 ×1] [07 ×1] = 3 cols
//   Row 4 → [08 ×2] [09 ×1]         = 3 cols
const CARD_SPANS = [1, 2, 2, 1, 1, 1, 1, 2, 1];

// ─── Reduced-motion accessibility hook ────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

// ─── Ambient floating blobs ───────────────────────────────────────────────────
const BLOB_CFG = [
  { color: '#0d9488', left: '6%',  top: '14%', size: 480, dur: 22, d: 0   },
  { color: '#ea580c', left: '80%', top: '10%', size: 420, dur: 26, d: 4   },
  { color: '#7c3aed', left: '72%', top: '76%', size: 500, dur: 24, d: 8   },
  { color: '#0284c7', left: '8%',  top: '78%', size: 400, dur: 20, d: 2   },
  { color: '#16a34a', left: '44%', top: '50%', size: 350, dur: 30, d: 12  },
];

function FloatingBlobs({ reduced }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BLOB_CFG.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.left, top: b.top,
            width: b.size, height: b.size,
            background: `${b.color}0d`,
            filter: 'blur(90px)',
            translateX: '-50%', translateY: '-50%',
            willChange: 'transform',
          }}
          animate={reduced ? {} : { x: [0, 28, -20, 14, 0], y: [0, -22, 26, -15, 0] }}
          transition={{ duration: b.dur, delay: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── Premium bento card ───────────────────────────────────────────────────────
function BentoCard({ project, span, index }) {
  const { Icon, accent, lightBg, number, domain, title, description, tags, website } = project;

  const containerRef = useRef(null);
  const inView       = useInView(containerRef, { once: true, amount: 0.07 });
  const [hovered, setHovered]     = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const reduced = usePrefersReducedMotion();

  // Spring values for magnetic tilt
  const magX = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sp   = { damping: 24, stiffness: 280, mass: 0.45 };
  const sMX  = useSpring(magX, sp);
  const sRX  = useSpring(rotX, sp);
  const sRY  = useSpring(rotY, sp);

  const onMove = useCallback((e) => {
    if (!containerRef.current || reduced) return;
    const r  = containerRef.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    magX.set(dx * 0.055);
    rotY.set( (dx / (r.width  / 2)) * 9);
    rotX.set(-(dy / (r.height / 2)) * 9);
    setSpotlight({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  }, [magX, rotX, rotY, reduced]);

  const onLeave = useCallback(() => {
    magX.set(0); rotX.set(0); rotY.set(0);
    setHovered(false);
  }, [magX, rotX, rotY]);

  const isFeatured = span === 2;

  return (
    /* ── Entrance animation wrapper (also the grid item) ── */
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 70, scale: 0.92, filter: 'blur(12px)' }}
      animate={inView
        ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        : {}}
      transition={{
        duration: 0.75,
        delay: Math.min(index * 0.1, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        gridColumn: isFeatured ? 'span 2' : 'span 1',
        minHeight: isFeatured ? '360px' : '420px',
        perspective: '1000px',
      }}
    >
      {/* Magnetic + 3-D tilt layer */}
      <motion.div
        style={{ x: sMX, rotateX: sRX, rotateY: sRY, height: '100%', willChange: 'transform' }}
      >
        {/* Lift layer */}
        <motion.div
          animate={reduced ? {} : {
            y: hovered ? -14 : 0,
            scale: hovered ? 1.025 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 240 }}
          className="relative h-full overflow-hidden rounded-3xl"
          style={{
            /* Rich gradient card background — already looks premium without hover */
            background: `linear-gradient(140deg,
              ${accent}18 0%,
              ${lightBg} 45%,
              rgba(255,255,255,0.98) 100%)`,
            border: hovered
              ? `1.5px solid ${accent}60`
              : `1.5px solid ${accent}28`,
            boxShadow: hovered
              ? `0 36px 90px -16px ${accent}38,
                 0 14px 40px -10px rgba(0,0,0,0.13),
                 0 0 0 1px ${accent}30,
                 inset 0 1px 0 rgba(255,255,255,0.7)`
              : `0 6px 28px -6px rgba(0,0,0,0.1),
                 0 2px 10px -2px rgba(0,0,0,0.06),
                 0 0 0 1px ${accent}18,
                 inset 0 1px 0 rgba(255,255,255,0.6)`,
            transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          }}
        >

          {/* ── Spotlight glow tracking cursor ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(
                circle at ${spotlight.x}% ${spotlight.y}%,
                ${accent}26 0%,
                transparent 55%)`,
            }}
          />

          {/* ── Hover: intensify background gradient ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              background: `linear-gradient(140deg,
                ${accent}22 0%,
                ${lightBg}dd 45%,
                transparent 100%)`,
            }}
          />

          {/* ── Decorative abstract rings ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute rounded-full transition-all duration-700"
              style={{
                top: isFeatured ? '-50px' : '-40px',
                right: isFeatured ? '-50px' : '-40px',
                width: isFeatured ? '300px' : '240px',
                height: isFeatured ? '300px' : '240px',
                border: `2.5px solid ${accent}20`,
                transform: hovered ? 'scale(1.12)' : 'scale(1)',
              }}
            />
            <div
              className="absolute rounded-full transition-all duration-700"
              style={{
                top: isFeatured ? '14px' : '10px',
                right: isFeatured ? '14px' : '10px',
                width: isFeatured ? '180px' : '145px',
                height: isFeatured ? '180px' : '145px',
                border: `1.5px solid ${accent}13`,
                transform: hovered ? 'scale(1.18)' : 'scale(1)',
              }}
            />
            {/* Small accent dot */}
            <div
              className="absolute rounded-full transition-all duration-500"
              style={{
                top: isFeatured ? '64px' : '54px',
                right: isFeatured ? '64px' : '54px',
                width: '8px',
                height: '8px',
                background: `${accent}30`,
                transform: hovered ? 'scale(1.6)' : 'scale(1)',
              }}
            />
          </div>

          {/* ── Giant background number ── */}
          <div
            className="pointer-events-none absolute select-none font-black leading-none"
            style={{
              bottom: isFeatured ? '-18px' : '-12px',
              right: '10px',
              fontSize: isFeatured ? '200px' : '160px',
              letterSpacing: '-0.06em',
              fontFamily: '"system-ui", -apple-system, sans-serif',
              color: accent,
              opacity: hovered ? 0.12 : 0.07,
              lineHeight: 1,
              transition: 'transform 0.45s ease, opacity 0.45s ease',
              transform: hovered
                ? 'translateY(-12px) rotate(5deg)'
                : 'translateY(0) rotate(0deg)',
            }}
          >
            {number}
          </div>

          {/* ── Card content ── */}
          <div className="relative z-10 flex h-full flex-col p-7">

            {/* Top row: domain pill + corner number */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}34`,
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Icon size={11} strokeWidth={2.5} />
                {domain}
              </span>
              <span
                className="shrink-0 font-black tracking-widest transition-all duration-350"
                style={{
                  fontSize: hovered ? '15px' : '13px',
                  color: hovered ? accent : 'rgb(203,213,225)',
                }}
              >
                {number}
              </span>
            </div>

            {/* Title */}
            <h3
              className="mb-3 font-bold leading-snug tracking-tight text-gray-900"
              style={{ fontSize: isFeatured ? '22px' : '17px' }}
            >
              {title}
            </h3>

            {/* Animated accent bar — expands on hover */}
            <div
              className="mb-5 h-[3px] rounded-full transition-all duration-500"
              style={{
                background: `linear-gradient(to right, ${accent}, ${accent}00)`,
                width: hovered ? '80px' : '36px',
              }}
            />

            {/* Description */}
            <p
              className="mb-5 flex-1 leading-relaxed text-gray-500"
              style={{ fontSize: isFeatured ? '14px' : '13px' }}
            >
              {description}
            </p>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    background: `${accent}0f`,
                    color: accent,
                    border: `1px solid ${accent}28`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA button */}
            {website !== '#' ? (
              <a
                href={website}
                className="group inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:opacity-95"
                style={{ background: accent }}
                onClick={(e) => e.stopPropagation()}
              >
                View Project
                <span
                  className="inline-flex transition-transform duration-200 group-hover:translate-x-1"
                >
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
              </a>
            ) : (
              <div
                className="inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-medium text-gray-400"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                Coming Soon
              </div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Desktop bento grid ───────────────────────────────────────────────────────
function BentoGrid() {
  const headerRef     = useRef(null);
  const headerInView  = useInView(headerRef, { once: true, amount: 0.6 });
  const reduced       = usePrefersReducedMotion();

  return (
    <section className="relative bg-[#F2F4F8] px-6 py-24">
      {/* Ambient blobs */}
      <FloatingBlobs reduced={reduced} />

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b838 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
        }}
      />

      {/* Page-level radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242,244,248,0) 0%, rgba(242,244,248,0.7) 100%)',
        }}
      />

      <div className="relative mx-auto" style={{ maxWidth: '1120px' }}>

        {/* ── Cinematic section header ── */}
        <div ref={headerRef} className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#E76758]"
          >
            Centre for REACT · Field Innovation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-base text-gray-500"
          >
            Nine social innovations built on real field research
          </motion.p>

          {/* Decorative underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#E76758] via-[#ea580c] to-transparent"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* ── Bento grid ── */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 'auto' }}
        >
          {PROJECTS.map((project, i) => (
            <BentoCard
              key={project.id}
              project={project}
              span={CARD_SPANS[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────
function MobileCard({ project, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const { Icon, accent, lightBg, number, domain, title, description, tags, website } = project;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, scale: 0.94, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.68,
        delay: Math.min(index * 0.08, 0.48),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: `linear-gradient(140deg,
          ${accent}18 0%,
          ${lightBg} 48%,
          rgba(255,255,255,0.98) 100%)`,
        border: `1.5px solid ${accent}28`,
        boxShadow: `0 6px 28px -6px rgba(0,0,0,0.1),
                    0 2px 10px -2px rgba(0,0,0,0.06),
                    0 0 0 1px ${accent}18,
                    inset 0 1px 0 rgba(255,255,255,0.6)`,
      }}
    >
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-32px', right: '-32px',
          width: '200px', height: '200px', borderRadius: '50%',
          border: `2px solid ${accent}20`,
        }} />
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '125px', height: '125px', borderRadius: '50%',
          border: `1.5px solid ${accent}12`,
        }} />
      </div>

      {/* Background number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-black leading-none"
        style={{
          bottom: '-10px', right: '8px',
          fontSize: '140px',
          letterSpacing: '-0.06em',
          fontFamily: '"system-ui", -apple-system, sans-serif',
          color: accent,
          opacity: 0.08,
          lineHeight: 1,
        }}
      >
        {number}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              background: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}32`,
            }}
          >
            <Icon size={10} strokeWidth={2.5} />
            {domain}
          </span>
          <span className="shrink-0 text-[12px] font-black tracking-widest" style={{ color: 'rgb(203,213,225)' }}>
            {number}
          </span>
        </div>

        <h3 className="mb-2 text-[18px] font-bold leading-snug text-gray-900">{title}</h3>
        <div className="mb-4 h-[2.5px] w-10 rounded-full" style={{ background: `linear-gradient(to right, ${accent}, ${accent}00)` }} />
        <p className="mb-5 text-[13.5px] leading-relaxed text-gray-500">{description}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg px-2.5 py-1 text-[10px] font-semibold"
              style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}26` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {website !== '#' ? (
          <a
            href={website}
            className="inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: accent }}
          >
            View Project <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
        ) : (
          <div
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-medium text-gray-400"
            style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
          >
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mobile grid ──────────────────────────────────────────────────────────────
function MobileGrid() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section className="relative bg-[#F2F4F8] px-4 py-16">
      {/* Static blobs for mobile (no animation overhead) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div style={{ position: 'absolute', width: 340, height: 340, left: '78%', top: '3%',  background: '#0d948810', filter: 'blur(70px)', transform: 'translate(-50%,-50%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, left: '16%', top: '54%', background: '#7c3aed0d', filter: 'blur(70px)', transform: 'translate(-50%,-50%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, left: '55%', top: '85%', background: '#dc262610', filter: 'blur(70px)', transform: 'translate(-50%,-50%)', borderRadius: '50%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle, #94a3b838 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.5,
      }} />

      <div className="relative mx-auto max-w-xl">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#E76758]"
          >
            Centre for REACT · Field Innovation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900"
          >
            Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-2 text-sm text-gray-500"
          >
            Nine social innovations built on real field research
          </motion.p>
        </div>

        <div className="flex flex-col gap-5">
          {PROJECTS.map((p, i) => (
            <MobileCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA section (content UNCHANGED) ─────────────────────────────────────────
function CtaSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="border-t border-gray-100 bg-white py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#E76758]">
          Want to learn more?
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
          Every project starts with a real problem.
        </h2>
        <p className="mb-8 text-base leading-relaxed text-gray-500">
          Explore how REACT fellows research, build, and deploy social innovations
          in collaboration with real communities.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/programmes"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800"
          >
            Explore Programmes <ArrowUpRight size={14} />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page root (UNCHANGED threshold logic) ────────────────────────────────────
export const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100 || window.innerHeight < 820);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F4F8]">
      {isMobile ? <MobileGrid /> : <BentoGrid />}
      <CtaSection />
    </main>
  );
};
