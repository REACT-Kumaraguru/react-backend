import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { TEAM, TEAM_MISSION } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

export default function Team() {
  return (
    <section id="team" className="section-pad">
      <SectionHeading
        eyebrow="The Team"
        title="Built by a collaborative team"
        subtitle={TEAM_MISSION}
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TEAM.map((m, i) => (
          <motion.div key={i} variants={fadeUp}>
            <GlassCard className="flex h-full flex-col items-center text-center">
              <div className="relative mb-5">
                <span className="absolute inset-0 animate-sf-pulse-glow rounded-full bg-aqua/20 blur-lg" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyanic to-teal text-abyss shadow-glow">
                  <User size={32} />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold">{m.name}</h3>
              <p className="mt-1 text-sm text-aqua">{m.role}</p>
              <p className="mt-3 rounded-full glass px-3 py-1 text-xs text-white/50">
                {m.tag}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
