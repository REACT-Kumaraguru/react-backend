import { Link } from 'react-router-dom';
import { ArrowIcon } from '../shared.jsx';

const stats = [
  ['40', '%', '↓ operational delays'],
  ['35', '%', '↑ resource utilization'],
  ['25', '%', '↓ patient wait time'],
  ['98', '%', 'operational visibility'],
];

export default function Benefits() {
  return (
    <>
      <header className="subhero">
        <div className="subhero-bg" data-parallax="16"><span className="b b1" /><span className="b b2" /></div>
        <div className="wrap">
          <div className="subhero-inner" data-reveal>
            <span className="eyebrow">Benefits</span>
            <h1 className="display">Why Hospitals Choose <span className="grad-text">FlowSync</span></h1>
            <p className="lead">Connected intelligence turns everyday operational data into measurable improvements across the facility.</p>
          </div>
          <div className="stat-strip" data-stagger="90">
            {stats.map(([count, suffix, label]) => (
              <div className="s" key={label}>
                <div className="k"><span data-count={count} data-suffix={suffix}>0{suffix}</span></div>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          {/* 1 */}
          <div className="brow">
            <div className="btext" data-reveal="left">
              <span className="eyebrow">Benefit 01</span>
              <h2>Reduced Operational Delays</h2>
              <p>Supports smoother patient movement and service delivery — bottlenecks are surfaced and cleared before they cascade across departments.</p>
              <div className="bstat"><span className="big"><span data-count="40" data-prefix="−" data-suffix="%">0%</span></span><span className="desc">average system delay times reduced</span></div>
            </div>
            <div data-reveal="right" data-scroll-y="0.04">
              <div className="bviz">
                <div className="vh"><span className="dot-live" />Delay index · trending down</div>
                <div className="viz-clock">
                  <div className="clk"><i>0:76</i></div>
                  <div className="down-bars">
                    {['90%', '74%', '80%', '58%', '46%', '34%', '26%'].map((h, i) => <b style={{ '--h': h }} key={i} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="brow">
            <div className="btext" data-reveal="right">
              <span className="eyebrow">Benefit 02</span>
              <h2>Better Resource Utilization</h2>
              <p>Improves visibility into resource allocation and operational performance, so beds, assets, and staff are matched to real-time demand.</p>
              <div className="bstat"><span className="big"><span data-count="35" data-prefix="+" data-suffix="%">0%</span></span><span className="desc">asset and bed utilization optimized</span></div>
            </div>
            <div data-reveal="left" data-scroll-y="0.04">
              <div className="bviz">
                <div className="vh">Department utilization</div>
                <div className="viz-bars" data-fill>
                  {[['OPD', '62%'], ['ER', '84%'], ['Rad', '52%'], ['Lab', '78%'], ['Pharm', '70%']].map(([label, h]) => (
                    <div className="bar" style={{ '--h': h }} key={label}><span>{label}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="brow">
            <div className="btext" data-reveal="left">
              <span className="eyebrow">Benefit 03</span>
              <h2>Improved Patient Experience</h2>
              <p>Contributes to more efficient healthcare interactions — shorter waits, smoother journeys, and clearer communication at every step.</p>
              <div className="bstat"><span className="big"><span data-count="25" data-prefix="−" data-suffix="%">0%</span></span><span className="desc">patient wait &amp; visit durations shortened</span></div>
            </div>
            <div data-reveal="right" data-scroll-y="0.04">
              <div className="bviz">
                <div className="vh">Average wait time · weeks</div>
                <div className="viz-line">
                  <svg viewBox="0 0 320 150" preserveAspectRatio="none" fill="none">
                    <defs><linearGradient id="lg-fall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(10,108,255,.22)" /><stop offset="1" stopColor="rgba(10,108,255,0)" /></linearGradient></defs>
                    <path d="M0 30 L64 48 L128 60 L192 84 L256 104 L320 124 L320 150 L0 150Z" fill="url(#lg-fall)" />
                    <path data-draw d="M0 30 L64 48 L128 60 L192 84 L256 104 L320 124" stroke="var(--blue)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="brow">
            <div className="btext" data-reveal="right">
              <span className="eyebrow">Benefit 04</span>
              <h2>Enhanced Operational Awareness</h2>
              <p>Provides a clear understanding of hospital activity patterns, with live visibility into the critical zones that matter most.</p>
              <div className="bstat"><span className="big"><span data-count="98" data-suffix="%">0%</span></span><span className="desc">visibility into critical operational zones</span></div>
            </div>
            <div data-reveal="left" data-scroll-y="0.04">
              <div className="bviz">
                <div className="vh">Critical-zone visibility</div>
                <div className="viz-gauge">
                  <div className="gauge-l" data-fill style={{ '--off': 8 }}>
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <defs><linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0A6CFF" /><stop offset="1" stopColor="#22D3EE" /></linearGradient></defs>
                      <circle className="tk" cx="75" cy="75" r="65" /><circle className="vl" cx="75" cy="75" r="65" />
                    </svg>
                    <div className="gn" data-count="98" data-suffix="%">0%</div>
                  </div>
                  <div className="gl">Anomaly detection<br /><b style={{ color: 'var(--blue)', fontFamily: 'var(--display)' }}>+30%</b> accuracy<br /><br />Bottleneck areas<br />mapped in real time</div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div className="brow">
            <div className="btext" data-reveal="left">
              <span className="eyebrow">Benefit 05</span>
              <h2>Data-Driven Decision Making</h2>
              <p>Supports informed healthcare management strategies — administrators act on evidence, not guesswork, with a decision index that keeps climbing.</p>
              <div className="bstat"><span className="big"><span data-count="50" data-prefix="+" data-suffix="%">0%</span></span><span className="desc">improvement in decision-making index</span></div>
            </div>
            <div data-reveal="right" data-scroll-y="0.04">
              <div className="bviz">
                <div className="vh"><span className="dot-live" />Decision index · trending up</div>
                <div className="viz-line">
                  <svg viewBox="0 0 320 150" preserveAspectRatio="none" fill="none">
                    <defs><linearGradient id="lg-rise" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(34,211,238,.28)" /><stop offset="1" stopColor="rgba(34,211,238,0)" /></linearGradient></defs>
                    <path d="M0 120 L64 104 L128 86 L192 60 L256 44 L320 22 L320 150 L0 150Z" fill="url(#lg-rise)" />
                    <path data-draw d="M0 120 L64 104 L128 86 L192 60 L256 44 L320 22" stroke="var(--cyan)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad cta-band" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap" data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Outcomes that compound</span>
          <h2 className="h-xl" style={{ margin: '16px auto 22px', maxWidth: '20ch' }}>Put these numbers to work in your facility</h2>
          <Link to="/#demo" className="btn btn-primary btn-lg" data-magnetic>Request a Demo <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
