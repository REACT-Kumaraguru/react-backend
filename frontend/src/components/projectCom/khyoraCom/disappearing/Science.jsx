import { motion } from "framer-motion";
import microscopic from "./assets/microscopic.jpg";
import fibres from "./assets/fibres-water.jpg";

const points = [
  { k: "Natural Fibres", v: "Renewable plant-based fibre network forming the soft, breathable structure." },
  { k: "Bio-superabsorbant", v: "Bio-superabsorbent replacing petroleum-based SAPs — locks fluid, releases on agitation." },
  { k: "Hydro-trigger", v: "Crosslinked binders weaken under sustained water exposure for controlled disintegration." },
  { k: "Bio-degradation", v: "Fibres convert into water, biomass and CO₂ via microbial action — no microplastics." },
];

export function Science() {
  return (
    <section id="science" className="relative section-pad overflow-hidden" style={{ background: "var(--gradient-deep)", color: "var(--pearl)" }}>
      <div aria-hidden className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(ellipse at 20% 30%, oklch(0.5 0.15 200 / 0.5), transparent 60%), radial-gradient(ellipse at 80% 70%, oklch(0.5 0.1 300 / 0.4), transparent 60%)",
      }} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-pearl/50 mb-5">04 — Science & technology</div>
          <h2 className="text-display text-4xl md:text-6xl text-pearl">
            Materials that<br />
            <span className="text-gradient-light italic font-extralight">listen to water.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative rounded-3xl overflow-hidden aspect-square">
            <img src={microscopic} alt="Microscopic natural fibre molecular network" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, oklch(0.18 0.04 240 / 0.9))" }} />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/50">Microscopic view</div>
              <div className="text-display text-2xl text-pearl mt-1">Natural Network</div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {points.map((p, i) => (
              <motion.div
                key={p.k}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-9 w-9 rounded-full flex items-center justify-center text-[10px] tracking-widest"
                    style={{ background: "var(--gradient-aqua)", color: "var(--deep)" }}>
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-display text-xl text-pearl">{p.k}</h3>
                    <p className="mt-2 text-sm text-pearl/65 leading-relaxed">{p.v}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-16 relative rounded-3xl overflow-hidden aspect-[21/9]"
        >
          <img src={fibres} alt="Natural fibres dispersing in water like ink" loading="lazy" width={1536} height={1024} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-end p-8 md:p-12" style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0.18 0.04 240 / 0.9))" }}>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-pearl/50">Water-triggered dispersion</div>
              <h3 className="text-display text-3xl md:text-5xl text-pearl mt-3 max-w-2xl">
                The structure remembers when to let go.
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
