import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Used Pad", desc: "Disposed safely after use, no exposure or awkward handling." },
  { n: "02", title: "Flushing", desc: "Water Exposure inititates layers seperation and starts weakening the fiber network" },
  { n: "03", title: "Fibre Dispersion", desc: "Fibres separate and flow safely through the sewage system." },
  { n: "04", title: "Biodegradation", desc: "Microorganisms convert fibres into water, biomass and CO₂." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg, oklch(0.96 0.02 200), oklch(0.92 0.04 200))" }}
    >
      <div aria-hidden className="absolute inset-0 opacity-50" style={{
        background: "repeating-linear-gradient(90deg, transparent, transparent 80px, oklch(0.7 0.05 200 / 0.05) 80px, oklch(0.7 0.05 200 / 0.05) 81px)",
      }} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-5">03 — How it works</div>
          <h2 className="text-display text-4xl md:text-6xl">From use to <span className="text-gradient italic">water</span>.</h2>
          <p className="mt-6 text-foreground/60 max-w-xl">
            A four-stage journey of safe disintegration — visually and structurally.
          </p>
        </motion.div>

        <div className="mt-20 relative">
          {/* Flowing connector */}
          <div className="absolute left-0 right-0 top-1/2 hidden md:block">
            <svg className="w-full h-12" viewBox="0 0 1000 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flow" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.86 0.07 210)" />
                  <stop offset="100%" stopColor="oklch(0.85 0.06 300)" />
                </linearGradient>
              </defs>
              <path d="M0 25 Q 100 5, 200 25 T 400 25 T 600 25 T 800 25 T 1000 25" stroke="url(#flow)" strokeWidth="2" fill="none" strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="glass rounded-3xl p-6 relative"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">{s.n}</div>
                <h3 className="text-display text-xl mt-3">{s.title}</h3>
                <p className="mt-3 text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
                {/* mini visual */}
                <div className="mt-5 h-16 rounded-xl overflow-hidden relative" style={{ background: "var(--gradient-aqua)", opacity: 0.6 }}>
                  <div className="absolute inset-0" style={{
                    background: `radial-gradient(circle at ${25 + i * 20}% 50%, oklch(1 0 0 / 0.6), transparent 50%)`,
                    animation: `drift ${6 + i}s ease-in-out infinite`,
                  }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
