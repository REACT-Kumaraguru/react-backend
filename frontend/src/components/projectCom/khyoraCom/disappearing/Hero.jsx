import { motion } from "framer-motion";
import heroPad from "./assets/hero-pad.jpg";
import { WaterBackground, FloatingParticles } from "./WaterBackground";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <WaterBackground />
      <FloatingParticles count={40} />

      {/* Soft animated orbs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, var(--aqua), transparent 60%)", animation: "drift 18s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, var(--lavender), transparent 60%)", animation: "drift 24s ease-in-out infinite reverse" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-foreground/70"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--teal-soft)", boxShadow: "0 0 10px var(--teal-soft)" }} />
          Flushable. Biodegradable. Engineered.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-5xl md:text-7xl lg:text-[88px] max-w-5xl"
        >
          Designed for comfort.<br />
          <span className="text-gradient italic font-extralight">Engineered to disappear.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 max-w-2xl text-base md:text-lg text-foreground/65 leading-relaxed"
        >
          KHYORA is a flushable-safe sanitary napkin made from biodegradable natural
          fibres and a bio-superabsorbant-based absorbent — built to vanish into nature, not
          burden it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#solution" className="btn-primary">
            Explore Innovation
            <span className="ml-1">→</span>
          </a>
          <a href="#how" className="btn-glass">See How It Works</a>
        </motion.div>

        {/* 3D Floating Pad visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 w-full max-w-3xl"
        >
          <div className="relative aspect-[16/10] w-full">
            {/* Ripple rings */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              {[0, 1.3, 2.6].map((d, i) => (
                <span
                  key={i}
                  className="absolute h-40 w-40 rounded-full border"
                  style={{
                    borderColor: "oklch(0.7 0.1 200 / 0.4)",
                    animation: `ripple 4s ease-out ${d}s infinite`,
                  }}
                />
              ))}
            </div>
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{ boxShadow: "var(--shadow-float)" }}
            >
              <img
                src={heroPad}
                alt="Floating biodegradable sanitary pad dissolving above rippling water"
                width={1536}
                height={864}
                className="h-full w-full object-cover"
                style={{ animation: "float 10s ease-in-out infinite" }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0.99 0.005 220 / 0.6))" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-foreground/40"
        >
          Scroll · Discover
        </motion.div>
      </div>
    </section>
  );
}
