import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ProgressRing from '../components/ProgressRing';
import { IMPACT_METRICS } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-aqua opacity-60" />
      <div className="section-pad relative">
        <SectionHeading
          eyebrow="Impact"
          title="Measurable outcomes that matter"
          subtitle="Smart feeding lowers cost and pollution while improving shrimp growth and the nutritional value that supports human neurological health."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-start justify-center gap-x-10 gap-y-14"
        >
          {IMPACT_METRICS.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <ProgressRing
                value={m.value}
                suffix={m.suffix}
                label={m.label}
                tone={m.tone}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-16 max-w-3xl rounded-2xl glass p-6 text-center text-sm leading-relaxed text-white/60"
        >
          Shrimp is naturally rich in Vitamin B12 — essential for brain function,
          nerve health, DNA synthesis and red blood cell production. ~100 g of
          shrimp can provide more than the recommended daily B12 intake, helping
          combat deficiencies linked to neurological disorders.
        </motion.p>
      </div>
    </section>
  );
}
