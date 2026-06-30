import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, FeatureIcon, LinkedInIcon, useCanvasOrb, useSpotNet } from '../shared.jsx';

const features = [
  ['Real-Time Monitoring', 'Continuous visibility into healthcare operations and patient flow activities - every department, every movement, as it happens.', 'wide'],
  ['Operational Intelligence', 'Transforms healthcare data into actionable insights.', ''],
  ['Predictive Analytics', 'Supports early identification of workflow inefficiencies.', ''],
  ['Smart Dashboard', 'Provides centralized monitoring and visualization.', ''],
  ['Workflow Optimization', 'Supports efficient healthcare operations and resource utilization.', ''],
  ['Scalable Infrastructure', 'Designed to support healthcare facilities of different sizes - from a single OPD to multi-site healthcare networks.', 'wide'],
];

const team = [
  {
    src: '/assets/team-1.jpg',
    name: 'Naseeha Nafrin N M',
    role: 'Healthcare Technology Strategist',
    bio: 'Drives the design and development of smart healthcare solutions by integrating healthcare workflows, digital technologies, IoT systems, and operational intelligence frameworks. Focuses on creating scalable and innovative solutions for predictive hospital management and patient flow optimization.',
    linkedin: 'https://www.linkedin.com/in/naseeha-nafrin-nm-274745327',
  },
  {
    src: '/assets/team-2.jpg',
    name: 'Navin R',
    role: 'Healthcare Analytics Strategist',
    bio: 'Develops intelligent analytics and decision-support solutions through predictive modeling, workflow optimization, real-time monitoring, and data-driven healthcare intelligence systems.',
    linkedin: 'https://www.linkedin.com/in/navin-r-071898327',
  },
  {
    src: '/assets/team-3.jpg',
    name: 'Brathikan VM',
    role: 'Innovation Expert',
    bio: 'Identifies technological opportunities, evaluates novelty, strengthens intellectual property potential, and guides innovation strategy to ensure scalability, practical impact, and long-term technology adoption.',
    linkedin: 'https://www.linkedin.com/in/brathikan',
  },
  {
    src: '/assets/team-4.jpg',
    name: 'Krisnan K',
    role: 'Mechanical Engineer · Engineering Lead',
    bio: 'Designs and optimizes wearable tracking devices, hardware modules, power management systems, and deployment-ready physical infrastructure for continuous healthcare monitoring applications.',
    linkedin: 'https://www.linkedin.com/in/krisnan',
  },
];

function Hero() {
  const orbRef = useRef(null);
  useCanvasOrb(orbRef);

  return (
    <header className="hero" id="home">
      <div className="hero-mesh"><span className="mesh-blob m1" /><span className="mesh-blob m2" /><span className="mesh-blob m3" /></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">AI-Powered Hospital Workflow Intelligence</span>
          <h1 className="display"><span className="grad-text">FlowSync</span></h1>
          <p className="hero-sub">Smarter Healthcare Operations, in Real Time</p>
          <p className="lead">FlowSync is an intelligent healthcare operations platform that helps hospitals monitor patient movement, improve operational visibility, and optimize healthcare workflows through connected technologies and predictive analytics.</p>
          <p className="sec-line">Gain real-time insight into hospital activity, identify operational inefficiencies, and make better decisions for improved patient experiences.</p>
          <div className="hero-actions">
            <a href="#demo" className="btn btn-primary btn-lg" data-magnetic>Request a Demo <ArrowIcon /></a>
            <Link to="/how-it-works" className="btn btn-ghost btn-lg">See How It Works</Link>
          </div>
          <div className="trust">
            {['Secure by design', 'Real-time telemetry', 'Predictive analytics'].map((item) => <div className="t" key={item}><span className="dot-live" />{item}</div>)}
          </div>
        </div>
        <div className="stage">
          <div className="orb-wrap">
            <span className="orb-ring" /><span className="orb-ring r2" />
            <canvas id="orb" ref={orbRef} />
          </div>
          <div className="glass chip-live float"><span className="dot-live" />LIVE - 2,481 patients tracked</div>
          <div className="glass dash-card float">
            <div className="dh"><b>Patient Flow</b><span className="pill"><span className="dot-live" />Live</span></div>
            <svg className="spark" viewBox="0 0 240 54" preserveAspectRatio="none" fill="none">
              <path d="M0 40 L30 36 L60 42 L90 26 L120 30 L150 16 L180 22 L210 10 L240 14 L240 54 L0 54Z" fill="rgba(10,108,255,.12)" />
              <path d="M0 40 L30 36 L60 42 L90 26 L120 30 L150 16 L180 22 L210 10 L240 14" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="row">
              <div className="stat"><div className="n" data-count="68" data-suffix="%">0%</div><div className="l">OCCUPANCY</div></div>
              <div className="stat"><div className="n" data-count="24" data-suffix="m">0m</div><div className="l">AVG WAIT</div></div>
            </div>
          </div>
          <div className="wear-card float">
            <img src="/assets/wearable-xray.jpg" alt="FlowSync smart wearable internal architecture" />
            <span className="cap">FlowSync Smart Wearable</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function ComparisonTiles({ good = false }) {
  const data = good
    ? [['68%', 'Occupancy - monitored'], ['24m', 'Avg wait - down 25%'], ['0', 'Bottlenecks - cleared'], ['98%', 'Visibility - live']]
    : [['??%', 'Occupancy - unknown'], ['2:14h', 'Avg wait - rising'], ['7', 'Bottlenecks - unseen'], ['-', 'Visibility - limited']];
  return (
    <div className="panel-grid">
      {data.map(([big, label]) => (
        <div className="tile" key={label}>
          <div>
            <div className={`big ${good ? 'ok' : 'bad'}`}>{big}</div>
            <div className="lab">{label}</div>
          </div>
          <div className="bars"><i /><i /><i /><i /><i /></div>
        </div>
      ))}
    </div>
  );
}

function CompareSection() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="grid-2">
          <div data-reveal="left">
            <span className="eyebrow">What is FlowSync?</span>
            <h2 className="h-xl mt-4 mb-6">A Connected Healthcare Ecosystem</h2>
            <div className="stack">
              <p className="lead">Healthcare facilities often experience challenges such as overcrowding, long waiting times, inefficient resource utilization, and limited operational visibility.</p>
              <p className="muted">FlowSync addresses these challenges by creating a connected healthcare ecosystem where operational information can be monitored, analyzed, and transformed into actionable insights.</p>
              <p className="muted">The platform supports hospitals in achieving more efficient workflows, better resource management, and improved service delivery.</p>
            </div>
          </div>
          <div data-reveal="right">
            <div className="cmp" data-compare>
              <div className="cmp-panel cmp-bottom">
                <div className="ttl"><span className="dot-live" />With FlowSync - clarity</div>
                <ComparisonTiles good />
              </div>
              <div className="cmp-panel cmp-top">
                <div className="ttl">Without FlowSync - chaos</div>
                <ComparisonTiles />
              </div>
              <div className="cmp-handle"><span className="gr">||</span></div>
              <div className="cmp-hint">&lt;- Drag to compare -&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section-pad bg-[#EDF3FB]">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Key Features</span>
          <h2 className="h-xl">Everything you need for total operational clarity</h2>
        </div>
        <div className="bento">
          {features.map(([title, copy, size], index) => (
            <div className={`glass tilt bcard ${size}`} data-tilt="8" data-reveal data-delay={(index % 3) * 80} key={title}>
              <div className="glowedge" />
              <div className="tilt-inner">
                <span className="ic"><FeatureIcon /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {index === 0 && <div className="mini-live"><i /><i /><i /><i /><i /><i /><i /></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="showcase section-pad">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Live Dashboard</span>
          <h2 className="h-xl">One Dashboard. Total Operational Clarity.</h2>
          <p className="lead">Every signal from across the hospital, unified into a single real-time view. Drag the cards - rearrange your command center.</p>
        </div>
        <div className="board" data-reveal>
          <span className="board-hint">drag any card to rearrange</span>
          <div className="dcard d-flow" data-drag>
            <div className="dt">Patient Flow <span className="dot-live" /></div>
            <svg viewBox="0 0 280 70" preserveAspectRatio="none" fill="none">
              <path d="M0 52 L35 46 L70 54 L105 32 L140 40 L175 20 L210 28 L245 12 L280 18 L280 70 L0 70Z" fill="rgba(34,211,238,.16)" />
              <path d="M0 52 L35 46 L70 54 L105 32 L140 40 L175 20 L210 28 L245 12 L280 18" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dcard d-util" data-drag>
            <div className="dt">Department Utilization</div>
            <div className="bargrid" data-fill>
              {['OPD', 'ER', 'Radiology', 'Pharmacy'].map((label, index) => (
                <div className="b" key={label}>{label}<span className="track"><i style={{ '--w': `${[82, 64, 48, 71][index]}%` }} /></span></div>
              ))}
            </div>
          </div>
          <div className="dcard d-count" data-drag>
            <div className="dt">Live Movement</div>
            <div className="big" data-count="2481">0</div>
            <div className="trend">+128 last hour</div>
          </div>
          <div className="dcard d-alert" data-drag>
            <div className="dt">Bottleneck Alert</div>
            <div className="flex items-center gap-3">
              <span className="ico">!</span>
              <div><div className="font-display font-semibold text-white">Cardiology</div><div className="font-mono text-[.64rem] text-[#caa86a]">High congestion - review</div></div>
            </div>
          </div>
          <div className="dcard d-wait" data-drag>
            <div className="dt">Avg Wait Time</div>
            <div className="big" data-count="24" data-suffix="m">0m</div>
            <div className="trend">down 25% vs last week</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [flipped, setFlipped] = useState(null);
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <span className="eyebrow justify-center">The Team</span>
          <h2 className="h-xl">The people behind FlowSync</h2>
          <p className="lead mx-auto max-w-[54ch]">A team focused on renewable thinking, smart monitoring, and practical product design for connected healthcare.</p>
        </div>
        <div className="team-grid" data-stagger="100">
          {team.map(({ src, name, role, bio, linkedin }, index) => {
            const isFlipped = flipped === index;
            return (
              <div className="tmember" key={name}>
                <button
                  type="button"
                  className={`photo-flip ${isFlipped ? 'is-flipped' : ''}`}
                  aria-pressed={isFlipped}
                  aria-label={`${name} — tap to ${isFlipped ? 'hide' : 'read'} bio`}
                  onClick={() => setFlipped(isFlipped ? null : index)}
                >
                  <div className="flip-inner">
                    <div className="flip-front photo">
                      <img src={src} alt={name} />
                      <span className="flip-cue">i</span>
                    </div>
                    <div className="flip-back">
                      <p className="tbio">{bio}</p>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="tlink"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <LinkedInIcon /> Connect
                      </a>
                    </div>
                  </div>
                </button>
                <h4 className="ph-name">{name}</h4>
                <div className="role">{role}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  const spotRef = useRef(null);
  useSpotNet(spotRef);
  return (
    <section id="demo" className="spotlight section-pad">
      <span className="spot-glow" />
      <canvas id="spotnet" ref={spotRef} />
      <div className="wrap">
        <div data-reveal>
          <span className="eyebrow justify-center">Closing Statement</span>
          <h2 className="h-xl">A Step Toward Smarter Healthcare Operations</h2>
          <p>FlowSync represents a step toward smarter healthcare operations by combining connected technologies, operational intelligence, and data-driven insights into a unified platform.</p>
          <p>Through continuous innovation and intelligent healthcare solutions, FlowSync aims to support more efficient workflows, enhanced operational visibility, and improved healthcare experiences.</p>
          <div className="spot-actions">
            <a href="mailto:react@kct.ac.in" className="btn btn-primary btn-lg">Request a Demo <ArrowIcon /></a>
            <a href="mailto:react@kct.ac.in" className="btn btn-ghost btn-lg">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CompareSection />
      <Features />
      <Dashboard />
      <Team />
      <Spotlight />
    </>
  );
}
