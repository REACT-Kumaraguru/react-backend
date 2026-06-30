import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../shared.jsx';

const steps = [
  ['Smart Identification', 'Patients are provided with smart wearable devices that enable secure identification and operational monitoring throughout the healthcare environment.'],
  ['Real-Time Data Collection', 'As patients move across hospital departments, operational events and movement information are continuously collected through connected infrastructure.'],
  ['Intelligent Processing', 'The collected information is securely processed and organized within a centralized analytics platform.'],
  ['Operational Analysis', 'Advanced analytics evaluate operational patterns, department utilization, patient flow behavior, and workflow efficiency.'],
  ['Predictive Insights', 'The platform identifies emerging operational challenges and provides early awareness of potential bottlenecks.'],
  ['Decision Support', 'Administrators receive meaningful insights through a centralized dashboard, enabling informed operational decision-making.'],
];

const chainNodes = [
  {
    title: 'Smart Identification', tag: '01 · Wearable', desc: 'Secure identification and operational monitoring throughout the healthcare environment.',
    icon: <><rect x="6" y="3" width="12" height="18" rx="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7" /><path d="M12 7v1M12 16v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    title: 'Real-Time Data Collection', tag: '02 · Connected infra', desc: 'Movement and operational events are continuously collected through connected infrastructure.',
    icon: <><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="20" r="1.4" fill="currentColor" /></>,
  },
  {
    title: 'Intelligent Processing', tag: '03 · Central platform', desc: 'Information is securely processed and organized within a centralized analytics platform.',
    icon: <><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    title: 'Operational Analysis', tag: '04 · Analytics', desc: 'Advanced analytics evaluate utilization, patient flow behavior, and workflow efficiency.',
    icon: <path d="M4 19V5M4 19h16M8 16V9M13 16V6M18 16v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />,
  },
  {
    title: 'Predictive Insights', tag: '05 · Foresight', desc: 'Early awareness of emerging operational challenges and potential bottlenecks.',
    icon: <><path d="M4 17l5-5 4 3 7-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 4h4v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
  {
    title: 'Decision Support', tag: '06 · Dashboard', desc: 'Administrators receive meaningful insights for informed operational decision-making.',
    icon: <><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 9h18M8 18v3M16 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
];

const techCards = [
  ['01', 'Smart Wearables', 'Enable patient identification and monitoring.', <><rect x="6" y="3" width="12" height="18" rx="4" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" /></>],
  ['02', 'Connected Infrastructure', 'Supports continuous operational data collection.', <><path d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="20" r="1.4" fill="currentColor" /></>],
  ['03', 'Edge Computing', 'Facilitates efficient local data processing.', <><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>],
  ['04', 'Secure Communication', 'Ensures reliable information transmission.', <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>],
  ['05', 'Analytics Engine', 'Processes operational information and generates insights.', <><path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><path d="M12 12 17 7M12 8v4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>],
  ['06', 'Visualization Platform', 'Provides meaningful dashboards and reports.', <><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M3 9h18M8 18v3M16 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>],
];

function usePinnedTimeline(refs) {
  useEffect(() => {
    const { section, title, desc, num, fill, chainFill } = refs;
    const pin = section.current;
    if (!pin) return undefined;
    const dots = pin.querySelectorAll('.prog-dots span');
    const nodes = pin.querySelectorAll('.chain .fnode');
    let desktop = matchMedia('(min-width:861px)').matches;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setHeight = () => {
      pin.style.height = desktop && !reduce ? `${steps.length * 72}vh` : 'auto';
    };

    let cur = -1;
    const render = (p) => {
      const clamped = Math.max(0, Math.min(0.9999, p));
      const idx = Math.floor(clamped * steps.length);
      if (fill.current) fill.current.style.width = `${clamped * 100}%`;
      if (chainFill.current) chainFill.current.style.height = `${clamped * 100}%`;
      if (idx !== cur) {
        cur = idx;
        if (title.current) title.current.textContent = steps[idx][0];
        if (desc.current) desc.current.textContent = steps[idx][1];
        if (num.current) num.current.textContent = `0${idx + 1}`;
        dots.forEach((d, k) => d.classList.toggle('on', k <= idx));
        nodes.forEach((n, k) => n.classList.toggle('on', k <= idx));
      }
    };

    const onScroll = () => {
      if (!desktop || reduce) return;
      const rect = pin.getBoundingClientRect();
      const total = pin.offsetHeight - innerHeight;
      render(total > 0 ? (-rect.top) / total : 0);
    };
    const onResize = () => {
      desktop = matchMedia('(min-width:861px)').matches;
      setHeight();
      onScroll();
    };

    setHeight();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    onScroll();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
    };
  }, [refs]);
}

export default function HowItWorks() {
  const section = useRef(null);
  const title = useRef(null);
  const desc = useRef(null);
  const num = useRef(null);
  const fill = useRef(null);
  const chainFill = useRef(null);
  usePinnedTimeline({ section, title, desc, num, fill, chainFill });

  return (
    <>
      <header className="subhero">
        <div className="subhero-bg" data-parallax="16"><span className="b b1" /><span className="b b2" /></div>
        <div className="wrap subhero-inner" data-reveal>
          <span className="eyebrow">How FlowSync Works</span>
          <h1 className="display">From wristband to <span className="grad-text">decision</span>, in real time</h1>
          <p className="lead">Six connected stages turn everyday patient movement into operational intelligence. Scroll to walk through the pipeline.</p>
        </div>
      </header>

      <section className="pin" id="how" ref={section}>
        <div className="pin-sticky">
          <div className="wrap pin-grid">
            <div className="pin-left">
              <span className="eyebrow">The Pipeline</span>
              <div className="step-tag">STEP <b ref={num}>01</b> <span style={{ opacity: 0.5 }}>/ 06</span></div>
              <h2 className="pin-title pin-title-dynamic" ref={title}>Smart Identification</h2>
              <p className="pin-desc pin-desc-dynamic" ref={desc}>Patients are provided with smart wearable devices that enable secure identification and operational monitoring throughout the healthcare environment.</p>
              <div className="prog-rail"><i ref={fill} /></div>
              <div className="prog-dots">
                {steps.map((s, i) => <span className={i === 0 ? 'on' : ''} key={s[0]} />)}
              </div>
            </div>
            <div className="pin-right">
              <div className="chain">
                <div className="track"><i ref={chainFill} /></div>
                {chainNodes.map((node, i) => (
                  <div className={`fnode ${i === 0 ? 'on' : ''}`} data-i={i} key={node.title}>
                    <span className="ring"><svg viewBox="0 0 24 24" fill="none">{node.icon}</svg></span>
                    <span className="lab">
                      <b>{node.title}</b>
                      <span>{node.tag}</span>
                      <span className="fdesc">{node.desc}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="section-pad">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Technology</span>
            <h2 className="h-xl">The Technology Behind FlowSync</h2>
            <p className="lead">FlowSync combines modern technologies to create a connected healthcare intelligence platform.</p>
          </div>
          <div className="tech-grid">
            {techCards.map(([no, h, p, icon], i) => (
              <div className="glass tech-card" data-reveal data-delay={(i % 3) * 80} key={no}>
                <span className="no">{no}</span>
                <span className="ic"><svg viewBox="0 0 24 24" fill="none">{icon}</svg></span>
                <h3>{h}</h3><p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="arch section-pad">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Reference Architecture</span>
            <h2 className="h-xl">Intelligent patient tracking &amp; data flow</h2>
            <p className="lead">From RFID + BLE wristbands through edge nodes and a secure central server to the AI analytics engine and admin dashboard.</p>
          </div>
          <div className="arch-feature" data-reveal="scale">
            <img src="/assets/checkpoint-arch.jpg" alt="FlowSync smart checkpoint architecture — intelligent patient tracking and data flow" loading="lazy" />
            <div className="arch-cap"><b>Smart Checkpoint Architecture</b><span>RFID · BLE · ESP32 edge · secure server · AI engine · dashboard</span></div>
          </div>
          <div className="arch-feature" data-reveal="scale" style={{ marginTop: 22 }}>
            <img src="/assets/system-flow.jpg" alt="FlowSync end-to-end system flow across hospital departments" loading="lazy" />
            <div className="arch-cap"><b>End-to-End System Flow</b><span>Patient journey → sensing → processing → insight → admin action</span></div>
          </div>
          <div className="arch-two">
            <div className="ac" data-reveal data-delay="0">
              <img src="/assets/wearable-exploded.jpg" alt="FlowSync wearable exploded view with labeled components" loading="lazy" />
              <div className="acc"><b>Smart Wearable — Exploded View</b><span>BLE SoC · RFID coil · thin-film battery · adaptive antenna</span></div>
            </div>
            <div className="ac" data-reveal data-delay="120">
              <img src="/assets/checkpoint-cutaway.jpg" alt="Ceiling-mounted RFID-BLE smart checkpoint cutaway" loading="lazy" />
              <div className="acc"><b>Ceiling-Mounted Checkpoint</b><span>Directional RFID · BLE array · ESP32 · hospital Wi-Fi</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad cta-band">
        <div className="wrap" data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>See it live</span>
          <h2 className="h-xl" style={{ margin: '16px auto 22px', maxWidth: '18ch' }}>Ready to see FlowSync inside your facility?</h2>
          <Link to="/#demo" className="btn btn-primary btn-lg" data-magnetic>Request a Demo <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
