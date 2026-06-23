import { motion } from "framer-motion";
import earth from "./assets/earth-impact.jpg";

const metrics = [
  { v: "100%", l: "Fibre biodegradation" },
  { v: "0", l: "Microplastic residue" },
  { v: "−92%", l: "Plastic persistence vs. conventional" },
  { v: "↓↓↓", l: "Sewer blockage risk" },
];

export function Impact() {
  return (
    <section id="impact" className="relative section-pad overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-6xl relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-5">05 — Impact</div>
          <h2 className="text-display text-4xl md:text-6xl">
            A small change<br />
            <span className="text-gradient italic">at planetary scale.</span>
          </h2>
        </motion.div>

        <div className="mt-16 relative rounded-[2rem] overflow-hidden aspect-[16/9]">
          <img src={earth} alt="Earth surrounded by flowing water and particles" loading="lazy" width={1536} height={864} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.99 0.005 220 / 0.7), transparent 60%)" }} />
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 content-end gap-3 p-6 md:p-10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass rounded-2xl p-5"
              >
                <div className="text-display text-3xl md:text-4xl text-gradient">{m.v}</div>
                <div className="mt-1 text-xs text-foreground/65">{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          {[
            "Reduces menstrual waste accumulation",
            "Lowers plastic persistence in landfills",
            "Improves disposal dignity & comfort",
            "Supports low-resource sanitation",
          ].map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 text-foreground/70"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
