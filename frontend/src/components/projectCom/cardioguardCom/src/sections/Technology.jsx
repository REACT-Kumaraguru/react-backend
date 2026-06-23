import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import { keyFeatures } from '../utils/data.js';

export default function Technology() {
  return (
    <section className="section-pad bg-white">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Key features"
          title="Scientific sensing made simple enough for the field."
          copy="SeedVision combines optical intelligence, embedded AI, and mechanical sorting into one farmer-friendly workflow."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {keyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article key={feature.title} className="sensor-card reveal" whileHover={{ y: -9 }}>
                <div className="sensor-pulse"><Icon size={25} /></div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <div className="mini-graph">
                  <span /><span /><span /><span /><span />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
