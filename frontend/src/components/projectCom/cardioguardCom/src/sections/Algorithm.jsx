import SectionHeader from '../components/SectionHeader.jsx';

const nodes = ['NIR', 'Spectrum', 'Features', 'ML Model', 'Confidence', 'Sort'];

export default function Algorithm() {
  return (
    <section className="section-pad bg-white">
      <div className="container mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          align="left"
          eyebrow="AI engine"
          title="NIR Spectroscopy + Machine Learning + Edge AI"
          copy="SeedVision converts light absorption patterns into classification confidence, then performs the decision locally so sorting remains fast, portable, and practical."
        />
        <div className="ai-panel reveal">
          <div className="dashboard-top"><span /><span /><span /></div>
          <div className="neural-map">
            {nodes.map((node, index) => (
              <div key={node} className={`ai-node node-${index}`}>{node}</div>
            ))}
            <svg viewBox="0 0 720 360" aria-hidden="true">
              <path d="M96 84 C240 40 310 76 430 154 S585 210 630 80" />
              <path d="M90 176 C230 144 330 166 450 230 S575 280 632 184" />
              <path d="M92 275 C245 300 330 238 438 182 S560 128 632 275" />
              <path d="M210 92 C300 145 372 206 520 184" />
              <path d="M206 266 C318 196 404 136 520 92" />
            </svg>
          </div>
          <div className="risk-strip">
            <span>Classification confidence</span>
            <strong>94%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
