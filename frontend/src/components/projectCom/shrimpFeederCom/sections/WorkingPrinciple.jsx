import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { PRINCIPLE_STEPS } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function WorkingPrinciple() {
  return (
    <section id="principle" className="section-pad">
      <SectionHeading
        eyebrow="Working Principle"
        title="From hopper to uniform coverage"
        subtitle="A controlled five-stage flow keeps feed dry, splits it evenly and distributes it across the whole tank."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative"
      >
        {/* connector line */}
        <div className="absolute left-0 right-0 top-[64px] hidden h-px bg-gradient-to-r from-transparent via-aqua/40 to-transparent lg:block" />

        <div className="grid gap-6 lg:grid-cols-5">
          {PRINCIPLE_STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
                <span className="absolute inset-0 animate-sf-pulse-glow rounded-full bg-aqua/10 blur-xl" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-aqua/30 bg-deep font-display text-2xl font-extrabold text-gradient shadow-glow">
                  {s.n}
                </div>
              </div>
              <h3 className="font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {s.text}
              </p>
              {i < PRINCIPLE_STEPS.length - 1 && (
                <ArrowRight
                  className="mx-auto mt-4 animate-pulse text-aqua/60 lg:hidden"
                  size={22}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
