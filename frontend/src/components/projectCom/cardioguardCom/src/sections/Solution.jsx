import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import { SorterScene } from '../components/SeedScene.jsx';
import { technologyCards } from '../utils/data.js';

export default function Solution() {
  return (
    <section id="technology" className="section-pad relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="SeedVision"
          title="A practical AI sorter for smarter papaya farming."
          copy="SeedVision scans each seed with near-infrared light, classifies its spectral signature with machine learning, then automatically routes it through a servo sorting system."
        />
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal relative h-[520px] rounded-lg border border-sage/20 bg-white/70 shadow-soft backdrop-blur">
            <SorterScene />
            <div className="scan-line line-a" />
            <div className="scan-line line-b" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {technologyCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} className="solution-card reveal" whileHover={{ y: -8, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
                  <div className="icon-tile"><Icon size={23} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-green-deep">0{index + 1}</span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
