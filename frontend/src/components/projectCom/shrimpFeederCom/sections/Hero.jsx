import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Rocket, PlayCircle, ChevronDown } from 'lucide-react';
import GlowButton from '../components/GlowButton';
import { scrollToId } from '../hooks/useLenis';
import { fadeUp, staggerParent } from '../animations/variants';

const FeederScene = lazy(() => import('../models/FeederScene'));

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        {/* Left — concise copy */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-aqua"
          >
            <span className="h-1.5 w-1.5 animate-sf-pulse-glow rounded-full bg-aqua" />
            Smart Shrimp Feed Splitting System
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="heading-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            Revolutionizing
            <br />
            <span className="text-gradient">Sustainable</span> Shrimp
            <br />
            Farming
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white/60"
          >
            Precise multi-direction feed splitting that cuts wastage, prevents
            clogging and powers healthier shrimp growth.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <GlowButton icon={Rocket} onClick={() => scrollToId('solution')}>
              Explore Innovation
            </GlowButton>
            <GlowButton
              variant="ghost"
              icon={PlayCircle}
              onClick={() => scrollToId('principle')}
            >
              Watch Demo
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Right — 3D feeder showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] sm:h-[520px] lg:h-[600px]"
        >
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <FeederScene scale={0.62} />
            </Suspense>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss" />
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId('problem')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 hover:text-aqua"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
