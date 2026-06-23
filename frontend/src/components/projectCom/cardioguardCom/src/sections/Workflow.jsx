import SectionHeader from '../components/SectionHeader.jsx';
import { processFlow } from '../utils/data.js';

export default function Workflow() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-5">
        <SectionHeader
          eyebrow="Process flow"
          title="A seed moves from uncertainty to decision in seconds."
          copy="NIR sensing captures the seed’s spectral fingerprint, AI interprets the signal, and servo actuation turns the prediction into a physical sorting action."
        />
        <div className="conveyor-story reveal mt-16">
          <div className="conveyor-belt">
            <span /><span /><span /><span /><span />
          </div>
          <div className="timeline mt-12">
            {processFlow.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="timeline-item reveal">
                  <div className="timeline-node"><Icon size={22} /></div>
                  <div className="timeline-card">
                    <span>Stage {index + 1}</span>
                    <h3>{step.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
