import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { FEATURES } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function KeyFeatures() {
  return (
    <section id="features" className="section-pad">
      <SectionHeading
        eyebrow="Key Features"
        title="Engineered for precision feeding"
        subtitle="Every part of the system is built to reduce waste, protect water quality and keep feeding continuous."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((f) => {
          const Icon = Icons[f.icon] || Icons.Sparkles;
          return (
            <motion.div key={f.title} variants={fadeUp}>
              <GlassCard className="h-full">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyanic/20 to-teal/20 text-aqua transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </span>
                <h3 className="font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {f.text}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
