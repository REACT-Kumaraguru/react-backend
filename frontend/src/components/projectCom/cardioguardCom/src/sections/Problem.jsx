import Counter from '../components/Counter.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { problemStats } from '../utils/data.js';

export default function Problem() {
  return (
    <section id="problem" className="section-pad relative">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="The problem"
          title="Farmers often learn too late."
          copy="Papaya plant sex becomes visible only after months of growth. By then, land, labor, water, and fertilizer have already been spent on plants that may never produce fruit."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-4">
          {problemStats.map((stat) => (
            <div key={stat.label} className={`reveal data-card ${stat.tone === 'earth' ? 'earth-card' : ''}`}>
              <div className="text-5xl font-semibold text-ink md:text-6xl">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="mt-5 text-base leading-7 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
