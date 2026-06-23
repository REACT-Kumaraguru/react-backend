import { motion } from "framer-motion";

const team = [
  { name: "KCT Research Team", role: "Materials & Bio-engineering", initials: "KR" },
  { name: "Natural Fibre Lab", role: "Fibre Architecture", initials: "NL" },
  { name: "Sustainability Office", role: "Environmental Impact", initials: "SO" },
];

export function Team() {
  return (
    <section className="relative section-pad overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.99 0.005 220), oklch(0.95 0.02 210))" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-5">06 — Team</div>
          <h2 className="text-display text-4xl md:text-6xl">
            Built at <span className="text-gradient italic">Kumaraguru</span>.
          </h2>
          <p className="mt-6 text-foreground/60 max-w-xl">
            A collaboration of material scientists, bio-engineers and sustainability researchers
            from Kumaraguru College of Technology, Coimbatore — building for Prototypes for Humanity.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass rounded-3xl p-8 group"
            >
              <div className="h-20 w-20 rounded-full flex items-center justify-center text-display text-2xl"
                style={{ background: "var(--gradient-aqua)", color: "var(--deep)", boxShadow: "var(--shadow-soft)" }}>
                {m.initials}
              </div>
              <h3 className="mt-6 text-display text-2xl">{m.name}</h3>
              <p className="mt-2 text-sm text-foreground/60">{m.role}</p>
              <div className="mt-6 h-px w-full" style={{ background: "linear-gradient(90deg, var(--teal-soft), transparent)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
