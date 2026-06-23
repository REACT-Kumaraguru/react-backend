import SectionHeader from '../components/SectionHeader.jsx';
import { strategy } from '../utils/data.js';

export default function Strategy() {
  return (
    <section className="section-pad bg-white">
      <div className="container mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Market analysis"
          title="A scalable path across papaya, seed supply, and precision agriculture."
          copy="SeedVision can begin with papaya seed classification, then expand into broader crop quality testing, sorting automation, and agri-intelligence services."
        />
        <div className="market-panel reveal mt-14">
          <div className="market-chart">
            <span style={{ '--size': '86%' }}>TAM</span>
            <span style={{ '--size': '62%' }}>SAM</span>
            <span style={{ '--size': '38%' }}>SOM</span>
          </div>
          <div className="strategy-lane">
            {strategy.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="strategy-step">
                  <span>{index + 1}</span>
                  <Icon size={26} />
                  <h3>{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
