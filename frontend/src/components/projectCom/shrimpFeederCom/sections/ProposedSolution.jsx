import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { SOLUTION_BENEFITS } from '../utils/constants';
import { fadeUp, slideLeft, staggerParent, viewportOnce } from '../animations/variants';

const FeederScene = lazy(() => import('../models/FeederScene'));

export default function ProposedSolution() {
  return (
    <section id="solution" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-aqua opacity-70" />
      <div className="section-pad relative">
        <SectionHeading
          eyebrow="Our Innovation"
          title={
            <>
              The Precise{' '}
              <span className="text-gradient">Feed Splitting</span> Mechanism
            </>
          }
          subtitle="Instead of dumping feed in one spot, Thynk divides it into multiple equal streams — spread uniformly across the entire tank."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Interactive 3D model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[460px] rounded-3xl glass-strong"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <Suspense fallback={null}>
                <FeederScene interactive scale={0.66} />
              </Suspense>
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 text-xs text-white/55">
              Drag to rotate · live feed simulation
            </span>
          </motion.div>

          {/* Benefit reveals */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-5"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal"
            >
              <Sparkles size={14} /> Premium feed engineering
            </motion.span>

            {SOLUTION_BENEFITS.map((b) => (
              <motion.div
                key={b.title}
                variants={slideLeft}
                className="group flex gap-4 rounded-2xl glass p-5 transition-colors hover:border-aqua/30"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyanic to-teal text-abyss shadow-glow">
                  <Check size={18} strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">
                    {b.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
