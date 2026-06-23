import { motion } from 'framer-motion';
import { Hand, ClipboardCheck, Timer } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import { EXISTING_SOLUTIONS } from '../utils/constants';
import { fadeUp, staggerParent, viewportOnce } from '../animations/variants';

const ICONS = [Hand, ClipboardCheck, Timer];

function Bar({ label, value, danger }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/45">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className={`h-full rounded-full ${
            danger
              ? 'bg-gradient-to-r from-rose-500/80 to-amber-400/80'
              : 'bg-gradient-to-r from-cyanic to-teal'
          }`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function ExistingSolutions() {
  return (
    <section id="solutions" className="section-pad">
      <SectionHeading
        eyebrow="Existing Solutions"
        title="Today's methods still waste feed"
        subtitle="Conventional feeding approaches improve on each other — but none solve uneven distribution or moisture clogging."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-6 lg:grid-cols-3"
      >
        {EXISTING_SOLUTIONS.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div key={s.name} variants={fadeUp}>
              <GlassCard className="flex h-full flex-col">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyanic/20 to-teal/20 text-aqua">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-xl font-bold">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {s.how}
                </p>
                <div className="my-5 rounded-xl border border-rose-400/15 bg-rose-500/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                    Limitation
                  </p>
                  <p className="mt-1 text-sm text-white/55">{s.limitation}</p>
                </div>
                <div className="mt-auto space-y-4">
                  <Bar label="Efficiency" value={s.efficiency} />
                  <Bar label="Feed Wastage" value={s.waste} danger />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
