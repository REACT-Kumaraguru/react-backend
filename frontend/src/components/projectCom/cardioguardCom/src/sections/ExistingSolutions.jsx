import SectionHeader from '../components/SectionHeader.jsx';
import { existingSolutions } from '../utils/data.js';

export default function ExistingSolutions() {
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Existing solutions"
          title="Accurate answers exist, but they rarely fit the farm."
          copy="SeedVision brings lab-level thinking closer to the seed line: fast, non-destructive, lower-cost, and built for automation."
        />
        <div className="horizontal-scroll mt-14">
          {existingSolutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <article key={solution.name} className="comparison-card reveal">
                <Icon className="text-green-deep" size={34} />
                <h3>{solution.name}</h3>
                <p>{solution.limitation}</p>
                <div className="metric-list mt-auto">
                  <span>Accuracy <strong>{solution.accuracy}</strong></span>
                  <span>Speed <strong>{solution.speed}</strong></span>
                  <span>Cost <strong>{solution.cost}</strong></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
