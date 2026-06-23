import Counter from '../components/Counter.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { impactStats } from '../utils/data.js';

export default function Impact() {
  return (
    <section id="impact" className="section-pad bg-white">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Impact"
          title="Better seeds create better seasons."
          copy="By reducing uncertainty before planting, SeedVision supports higher yields, less water wastage, stronger farmer income, and smarter precision agriculture."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="chart-card reveal">
            <div className="bar-chart">
              <span style={{ '--h': '62%' }} />
              <span style={{ '--h': '74%' }} />
              <span style={{ '--h': '82%' }} />
              <span style={{ '--h': '91%' }} />
              <span style={{ '--h': '97%' }} />
            </div>
            <div>
              <h3>Precision farming starts with seed certainty</h3>
              <p>Classified seeds mean fewer wasted rows, fewer wasted inputs, and a clearer path from nursery planning to harvest.</p>
            </div>
          </div>
          <div className="grid gap-5">
            {impactStats.map((item) => (
              <div key={item.label} className="impact-stat reveal">
                <strong><Counter value={item.value} suffix={item.suffix} /></strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
