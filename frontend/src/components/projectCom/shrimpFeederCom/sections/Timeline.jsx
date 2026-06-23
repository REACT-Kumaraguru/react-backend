import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { TIMELINE } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function Timeline() {
  return (
    <section id="timeline" className="section-pad">
      <SectionHeading
        eyebrow="Roadmap"
        title="From prototype to deployment"
        subtitle="A focused 2026 path from building the splitting mechanism to commercial roll-out."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative ml-3 border-l border-aqua/20 pl-10"
      >
        {TIMELINE.map((t) => (
          <motion.div key={t.title} variants={fadeUp} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[3.1rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-aqua/40 bg-deep shadow-glow">
              <span className="h-2.5 w-2.5 animate-sf-pulse-glow rounded-full bg-aqua" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-aqua">
              {t.date}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold">{t.title}</h3>
            <ul className="mt-4 space-y-2">
              {t.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm text-white/55">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-teal"
                  />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
