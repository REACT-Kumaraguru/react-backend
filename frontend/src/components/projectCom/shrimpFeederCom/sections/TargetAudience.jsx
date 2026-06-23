import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { AUDIENCE } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function TargetAudience() {
  return (
    <section id="audience" className="section-pad">
      <SectionHeading
        eyebrow="Target Audience"
        title="Built for everyone in aquaculture"
        subtitle="From small manual farms to commercial multi-tank operations and sustainable startups."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {AUDIENCE.map((a) => {
          const Icon = Icons[a.icon] || Icons.Users;
          return (
            <motion.div key={a.title} variants={fadeUp}>
              <GlassCard className="flex h-full items-start gap-4" tilt={false}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyanic/20 to-teal/20 text-aqua">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {a.text}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
