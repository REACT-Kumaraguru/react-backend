import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Counter from '../components/Counter';
import { PROBLEM_STATS, PROBLEM_POINTS } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function Problem() {
  return (
    <section id="problem" className="section-pad">
      <SectionHeading
        eyebrow="The Problem"
        title="Feed waste is draining shrimp farming"
        subtitle="Inefficient feeding wastes resources, pollutes water and costs the global aquaculture industry billions every year."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mb-16 grid gap-6 md:grid-cols-3"
      >
        {PROBLEM_STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <GlassCard className="h-full">
              <div className="font-display text-5xl font-extrabold text-gradient">
                <Counter
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {s.label}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2"
      >
        {PROBLEM_POINTS.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            className="flex gap-4 rounded-2xl glass p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aqua/10 text-aqua">
              <AlertTriangle size={20} />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/55">
                {p.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
