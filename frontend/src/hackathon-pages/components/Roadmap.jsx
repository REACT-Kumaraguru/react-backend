import { useState } from 'react';
import { motion } from 'framer-motion';
import roadmapImage from '../assests/roadmap.jpg';
import { FileSearch, Lightbulb, CheckCircle2, Presentation } from 'lucide-react';

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

export default function Roadmap() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="roadmap" className="relative z-10 py-16 md:py-24 px-6 bg-slate-900 border-t-4 border-red-500">
      <div className="max-w-6xl mx-auto">
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

        {/* 4 Step Cards - horizontal, flex-grow on hover, premium animation */}
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
                {/* Gradient wave effect - bottom right (visible when hovered) */}
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
                  {/* Circular icon - each card has its own color */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 mb-4 transition-colors duration-300
                    ${isHovered ? 'bg-white/20' : `${colors.icon} border border-slate-200`}`}
                  >
                    <Icon className={`w-7 h-7 ${isHovered ? 'text-white' : colors.iconText}`} aria-hidden />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold leading-tight mb-3 transition-colors duration-300
                    ${isHovered ? 'text-white' : 'text-slate-800'}`}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed transition-all duration-300
                    ${isHovered ? 'text-white/95' : 'text-slate-600'}`}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-500 text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-12 text-center underline decoration-red-500 decoration-2 underline-offset-4"
        >
          define it &nbsp;&nbsp;.&nbsp;&nbsp; solve it &nbsp;&nbsp;.&nbsp;&nbsp; present it
        </motion.p>

        {/* Roadmap image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full rounded-lg overflow-hidden"
        >
          <img
            src={roadmapImage}
            alt="Solve 4 Purpose Ideathon 2026 roadmap - Registration, Shortlisting, Ideathon Begins, Finale"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
