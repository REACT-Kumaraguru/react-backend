import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileSearch,
  Lightbulb,
  CheckCircle2,
  Presentation,
  ClipboardPen,
  ListChecks,
  Rocket,
  Trophy,
  GraduationCap,
} from 'lucide-react';

const CARD_COLORS = [
  { bg: 'bg-teal-600', border: 'border-teal-500', shadow: 'shadow-teal-900/20', icon: 'bg-teal-100', iconText: 'text-teal-700' },
  { bg: 'bg-amber-500', border: 'border-amber-400', shadow: 'shadow-amber-900/20', icon: 'bg-amber-100', iconText: 'text-amber-700' },
  { bg: 'bg-sky-600', border: 'border-sky-500', shadow: 'shadow-sky-900/20', icon: 'bg-sky-100', iconText: 'text-sky-700' },
  { bg: 'bg-violet-600', border: 'border-violet-500', shadow: 'shadow-violet-900/20', icon: 'bg-violet-100', iconText: 'text-violet-700' },
];

const STEPS = [
  {
    num: '01',
    title: 'Problem Definition',
    desc: 'Every meaningful solution begins with clarity. Identify a real-world problem and understand its core challenges.',
    Icon: FileSearch,
  },
  {
    num: '02',
    title: 'Strategic Ideation',
    desc: 'Transform insights into innovative ideas through collaboration and creative thinking.',
    Icon: Lightbulb,
  },
  {
    num: '03',
    title: 'Feasibility Validation',
    desc: 'Refine your concept, validate its feasibility, and shape it into a purposeful solution.',
    Icon: CheckCircle2,
  },
  {
    num: '04',
    title: 'Impact Presentation',
    desc: 'Present your vision with confidence and demonstrate the impact it can create.',
    Icon: Presentation,
  },
];

const EVENT_MILESTONES = [
  {
    title: 'Registration Starts',
    date: '2nd April – 13th April',
    Icon: ClipboardPen,
    accent: 'from-teal-400/90 to-teal-600',
    glow: 'shadow-teal-500/40',
    ring: 'ring-teal-400/30',
  },
  {
    title: 'Shortlisting Announcement',
    date: '14th April',
    Icon: ListChecks,
    accent: 'from-amber-400/90 to-amber-600',
    glow: 'shadow-amber-500/40',
    ring: 'ring-amber-400/30',
  },
  {
    title: 'Ideathon Begins',
    date: '16th April',
    Icon: Rocket,
    accent: 'from-sky-400/90 to-sky-600',
    glow: 'shadow-sky-500/40',
    ring: 'ring-sky-400/30',
  },
  {
    title: 'Grand Finale',
    date: '5th – 8th June',
    Icon: Trophy,
    accent: 'from-violet-400/90 to-violet-600',
    glow: 'shadow-violet-500/40',
    ring: 'ring-violet-400/30',
  },
];

const timelineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const timelineItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Roadmap() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="roadmap" className="relative z-10 py-16 md:py-24 px-6 bg-slate-900 border-t-4 border-red-500 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-violet-600/10 blur-[90px]"
        aria-hidden
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h2 className="text-[2.625rem] md:text-5xl font-bold uppercase tracking-tight text-white">
            Roadmap to Impact
          </h2>
          <p className="text-slate-400 text-lg mt-1 font-medium">The Innovation Framework</p>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-0.5 w-16 bg-red-500 mb-12 origin-left"
        />

        {/* 4 Step Cards */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-4 mb-14 items-stretch">
          {STEPS.map((step, i) => {
            const Icon = step.Icon;
            const colors = CARD_COLORS[i];
            const isHovered = hoveredIndex === i;
            const anyHovered = hoveredIndex !== null;
            const isOtherHovered = anyHovered && !isHovered;

            return (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative min-w-0 rounded-[20px] overflow-hidden border
                  flex flex-col items-center text-center transition-all duration-300 ease-out
                  w-full lg:w-auto
                  ${isHovered
                    ? `lg:flex-[1.5] ${colors.bg} ${colors.border} shadow-xl ${colors.shadow}`
                    : isOtherHovered
                      ? 'lg:flex-[0.85] bg-slate-100 border-slate-200/80 opacity-80'
                      : 'lg:flex-1 bg-slate-100 border-slate-200 shadow-sm'
                  }`}
              >
                {isHovered && (
                  <div
                    className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 80% 60% at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    }}
                    aria-hidden
                  />
                )}

                <div className="relative p-6 flex flex-col items-center text-center flex-1 flex-grow min-h-[280px]">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 mb-4 transition-colors duration-300
                    ${isHovered ? 'bg-white/20' : `${colors.icon} border border-slate-200`}`}
                  >
                    <Icon className={`w-7 h-7 ${isHovered ? 'text-white' : colors.iconText}`} aria-hidden />
                  </div>
                  <h3
                    className={`text-lg md:text-xl font-bold leading-tight mb-3 transition-colors duration-300
                    ${isHovered ? 'text-white' : 'text-slate-800'}`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base leading-relaxed transition-all duration-300
                    ${isHovered ? 'text-white/95' : 'text-slate-600'}`}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-500 text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-14 text-center underline decoration-red-500 decoration-2 underline-offset-4"
        >
          define it &nbsp;&nbsp;.&nbsp;&nbsp; solve it &nbsp;&nbsp;.&nbsp;&nbsp; present it
        </motion.p>

        {/* Event timeline — custom UI (replaces static image) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Event timeline</h3>
              <p className="text-slate-400 mt-1 text-sm md:text-base">Key dates for Solve 4 Purpose — Ideathon 2026</p>
            </div>
          </div>

          {/* Mobile / tablet: vertical timeline */}
          <motion.ol
            variants={timelineContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="lg:hidden relative ml-1 pl-8 border-l-2 border-white/[0.12]"
            aria-label="Event timeline"
          >
            {EVENT_MILESTONES.map((m) => {
              const Icon = m.Icon;
              return (
                <motion.li key={m.title} variants={timelineItem} className="relative pb-10 last:pb-0">
                  <span
                    className={`absolute left-[-2.0625rem] top-2.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br ${m.accent} ring-4 ring-slate-900 ${m.ring} shadow-lg ${m.glow}`}
                    aria-hidden
                  />
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-5 shadow-lg shadow-black/20
                      hover:border-white/20 hover:bg-white/[0.09] transition-colors duration-300"
                  >
                    <div
                      className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${m.accent} mb-3 shadow-lg ${m.glow}`}
                    >
                      <Icon className="w-5 h-5 text-white" aria-hidden />
                    </div>
                    <p className="text-white font-semibold text-base md:text-lg leading-snug">{m.title}</p>
                    <p className="text-slate-300 mt-1.5 text-sm md:text-base font-medium">{m.date}</p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Desktop: horizontal timeline */}
          <motion.div
            variants={timelineContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="hidden lg:block"
          >
            <ol className="relative grid grid-cols-4 gap-4 xl:gap-6" aria-label="Event timeline">
              <div
                className="absolute left-[12%] right-[12%] top-[26px] h-[3px] rounded-full pointer-events-none bg-[linear-gradient(90deg,rgb(20_184_166_/_0.55),rgb(245_158_11_/_0.55),rgb(14_165_233_/_0.55),rgb(139_92_246_/_0.55))]"
                aria-hidden
              />
              {EVENT_MILESTONES.map((m) => {
                const Icon = m.Icon;
                return (
                  <motion.li key={m.title} variants={timelineItem} className="relative flex flex-col items-center text-center pt-0">
                    <motion.div
                      className={`relative z-10 mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br ${m.accent}
                        ring-4 ring-slate-900 ${m.ring} shadow-xl ${m.glow}`}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      <Icon className="w-6 h-6 text-white" aria-hidden />
                    </motion.div>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md px-4 py-5 min-h-[140px] flex flex-col justify-center
                        shadow-lg shadow-black/25 hover:border-white/20 hover:bg-white/[0.09] hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
                    >
                      <p className="text-white font-semibold text-[0.95rem] xl:text-base leading-snug">{m.title}</p>
                      <p className="text-slate-300 mt-2 text-sm font-medium leading-relaxed">{m.date}</p>
                    </motion.article>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </motion.div>

        {/* Eligibility callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden border border-red-500/35 bg-gradient-to-br from-red-500/15 via-white/[0.06] to-slate-800/80 backdrop-blur-md px-6 py-5 md:px-8 md:py-6
            shadow-[0_0_40px_-8px_rgba(239,68,68,0.35)] hover:border-red-400/45 hover:shadow-[0_0_48px_-6px_rgba(239,68,68,0.45)] transition-all duration-300"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/20 blur-2xl"
            aria-hidden
          />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex shrink-0 items-center justify-center sm:justify-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-400/30">
                <GraduationCap className="h-7 w-7 text-red-400" aria-hidden />
              </div>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400/90 mb-1">Eligibility</p>
              <p className="text-white text-lg md:text-xl font-semibold leading-snug">
                First-year students only <span className="text-slate-300 font-medium">(KCT)</span>
              </p>
            </div>
            <div className="flex shrink-0 justify-center sm:justify-end">
              <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-300">
                FY only
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
