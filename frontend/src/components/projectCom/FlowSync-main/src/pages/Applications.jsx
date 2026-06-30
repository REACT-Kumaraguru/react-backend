import { Link } from 'react-router-dom';
import { ArrowIcon } from '../shared.jsx';

const ArrowGlyph = () => (
  <span className="arrow"><svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
);

const tiles = [
  {
    lg: true, num: '01', tilt: '5', delay: 0, cov: 'linear-gradient(150deg,#0A6CFF,#073a8c)',
    title: 'Multi-Speciality Hospitals', desc: 'Improve patient flow and operational visibility across every department on one connected platform.',
    icon: <><path d="M4 21V8l8-5 8 5v13" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 21v-5h6v5M12 8v4M10 10h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    lg: true, num: '02', tilt: '5', delay: 100, cov: 'linear-gradient(150deg,#0E7C7B,#0a4f6b)',
    title: 'Outpatient Departments (OPD)', desc: 'Reduce waiting times and streamline patient movement through busy outpatient flows.',
    icon: <><path d="M5 21V5a2 2 0 0 1 2-2h7l5 5v13" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /><path d="M9 9h4M9 13h6M9 17h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    num: '03', tilt: '6', delay: 0, cov: 'linear-gradient(150deg,#1463d6,#0b3f8a)',
    title: 'Diagnostic Centers', desc: 'Enhance service coordination and workflow efficiency.',
    icon: <><circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="1.7" /><path d="m20 20-4-4M11 8v6M8 11h6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    num: '04', tilt: '6', delay: 100, cov: 'linear-gradient(150deg,#1d6fe0,#0a3f9c)',
    title: 'Emergency Care Units', desc: 'Support faster response and operational awareness.',
    icon: <><path d="M12 3v6M12 9l4 2M12 9 8 11M5 14a7 7 0 0 0 14 0" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 6h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    num: '05', tilt: '6', delay: 200, cov: 'linear-gradient(150deg,#0f8a86,#0a4f6b)',
    title: 'Inpatient Wards', desc: 'Monitor patient movement and resource utilization.',
    icon: <path d="M4 18v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6M4 18h16M4 15h16M7 9V7" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    lg: true, num: '06', tilt: '5', delay: 0, cov: 'linear-gradient(150deg,#0A6CFF,#1aa7c4)',
    title: 'Healthcare Networks', desc: 'Enable centralized monitoring across multiple facilities — one command center for the whole network.',
    icon: <><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.7" /><circle cx="5" cy="6" r="2" stroke="#fff" strokeWidth="1.7" /><circle cx="19" cy="6" r="2" stroke="#fff" strokeWidth="1.7" /><circle cx="5" cy="18" r="2" stroke="#fff" strokeWidth="1.7" /><circle cx="19" cy="18" r="2" stroke="#fff" strokeWidth="1.7" /><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" stroke="#fff" strokeWidth="1.7" /></>,
  },
  {
    lg: true, num: '07', tilt: '5', delay: 100, cov: 'linear-gradient(150deg,#093f8f,#11a6c2)',
    title: 'Smart Healthcare Infrastructure', desc: 'Power next-generation connected healthcare ecosystems with real-time, data-driven operations.',
    icon: <><rect x="3" y="4" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.7" /><path d="M8 21h8M12 17v4M7 9l2.5 2.5L7 14M13 14h4" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></>,
  },
];

export default function Applications() {
  return (
    <>
      <header className="subhero">
        <div className="subhero-bg" data-parallax="16"><span className="b b1" /><span className="b b2" /></div>
        <div className="wrap">
          <div className="subhero-inner" data-reveal>
            <span className="eyebrow">Applications</span>
            <h1 className="display">Built for Every <span className="grad-text">Healthcare Environment</span></h1>
            <p className="lead">FlowSync is designed to support a wide range of healthcare environments — from a single outpatient department to multi-site healthcare networks.</p>
          </div>
          <div className="feature-img" data-reveal="scale">
            <img src="/assets/applications.jpg" alt="FlowSync applications across hospitals, OPD, emergency, inpatient wards, networks and smart infrastructure" loading="lazy" />
          </div>
        </div>
      </header>

      <section className="section-pad" style={{ paddingTop: 'clamp(40px,6vw,80px)' }}>
        <div className="wrap">
          <div className="app-grid">
            {tiles.map((tile) => (
              <Link
                to="/#demo"
                className={`app-tile ${tile.lg ? 'lg' : ''}`}
                data-tilt={tile.tilt}
                data-reveal
                data-delay={tile.delay}
                style={{ '--cov': tile.cov }}
                key={tile.num}
              >
                <span className="pat" />
                <span className="ic"><svg viewBox="0 0 24 24" fill="none">{tile.icon}</svg></span>
                <span className="num">{tile.num}</span>
                <h3>{tile.title}</h3>
                <p className="desc">{tile.desc}</p>
                <ArrowGlyph />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad cta-band" style={{ background: 'var(--bg-2)' }}>
        <div className="wrap" data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>One platform, every setting</span>
          <h2 className="h-xl" style={{ margin: '16px auto 22px', maxWidth: '20ch' }}>Find the right fit for your facility</h2>
          <Link to="/#demo" className="btn btn-primary btn-lg" data-magnetic>Request a Demo <ArrowIcon /></Link>
        </div>
      </section>
    </>
  );
}
