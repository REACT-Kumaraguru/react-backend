import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import { uniqueness } from '../utils/data.js';

export default function Uniqueness() {
  return (
    <section className="section-pad">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Uniqueness"
          title="Lab intelligence without the lab bottleneck."
          copy="SeedVision is designed to move precision classification out of slow, centralized testing and into fast, scalable agriculture."
        />
        <div className="before-after reveal mt-14">
          <div>
            <span>Before</span>
            <h3>Plant first. Wait months. Lose resources.</h3>
          </div>
          <div>
            <span>After SeedVision</span>
            <h3>Scan seeds. Sort instantly. Plant with confidence.</h3>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {uniqueness.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article key={feature.title} className="feature-card reveal" whileHover={{ y: -8 }}>
                <Icon size={28} />
                <h3>{feature.title}</h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
