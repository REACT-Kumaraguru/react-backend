import { motion } from "framer-motion";

const stats = [
  { value: "50B", label: "Sanitary pads discarded globally every year" },
  { value: "90%", label: "Plastic content in conventional pads" },
  { value: "800y", label: "Years for a single pad to degrade" },
  { value: "70%", label: "Of women face disposal discomfort" },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg, oklch(0.99 0.005 220), oklch(0.22 0.04 235) 80%, oklch(0.18 0.04 240))" }}
    >
      <div aria-hidden className="absolute inset-0 opacity-30" style={{
        background: "radial-gradient(ellipse at 70% 60%, oklch(0.4 0.08 30 / 0.4), transparent 60%)",
      }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-5">01 — The problem</div>
          <h2 className="text-display text-4xl md:text-6xl text-foreground">
            A quiet crisis<br />
            <span className="text-foreground/50 italic font-extralight">flowing into our planet.</span>
          </h2>
          <p className="mt-6 text-foreground/60 max-w-xl">
            Conventional menstrual products generate persistent plastic waste, clog sewage
            systems, accumulate in landfills, and emit toxins when burned.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass-dark rounded-3xl p-7"
            >
              <div className="text-display text-5xl md:text-6xl text-gradient-light">{s.value}</div>
              <div className="mt-3 text-sm text-pearl/70 leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-3">
          {["Plastic waste", "Sewer blockage", "Landfill accumulation", "Toxic emissions"].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 px-5 py-4 text-sm text-pearl/80"
            >
              <span className="text-pearl/40 mr-3">0{i + 1}</span>
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
