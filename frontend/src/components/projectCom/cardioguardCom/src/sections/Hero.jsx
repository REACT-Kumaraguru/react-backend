import { motion } from 'framer-motion';
import { ArrowDown, Microscope, PlayCircle } from 'lucide-react';
import { SeedScene } from '../components/SeedScene.jsx';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="agri-grid absolute inset-0 opacity-80" />
      <div className="ambient-wash absolute inset-0" />
      <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 px-5 pb-12 md:grid-cols-[1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/25 bg-white/80 px-4 py-2 text-sm font-semibold text-green-deep shadow-soft backdrop-blur">
            <Microscope size={16} />
            AI seed intelligence for precision agriculture
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-ink md:text-7xl lg:text-8xl">
            Know the Future of Papaya Farming — Before Planting.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            An AI-powered non-destructive seed classification system using NIR Spectroscopy and Edge AI to identify papaya seed sex in seconds.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="btn-primary" href="#technology">
              <PlayCircle size={19} />
              Explore Technology
            </a>
            <a className="btn-secondary" href="#impact">
              <ArrowDown size={19} />
              View Impact
            </a>
          </div>
          <div className="spectral-card mt-12 max-w-xl">
            <span />
            <span />
            <span />
            <span />
          </div>
        </motion.div>
        <motion.div className="relative h-[520px] md:h-[650px]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          <div className="seed-halo absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <SeedScene />
          <div className="float-card left-2 top-16">
            <span className="status-dot" /> Female seed confidence 94%
          </div>
          <div className="float-card right-0 top-40">
            NIR scan complete in 2.4s
          </div>
          <div className="float-card bottom-24 left-8">
            Edge AI sorting ready
          </div>
        </motion.div>
      </div>
    </section>
  );
}
