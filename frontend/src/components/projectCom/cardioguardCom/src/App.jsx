import MouseGlow from './components/MouseGlow.jsx';
import { useGsapReveal } from './hooks/useGsapReveal.js';
import { useLenis } from './hooks/useLenis.js';
import Algorithm from './sections/Algorithm.jsx';
import ExistingSolutions from './sections/ExistingSolutions.jsx';
import FinalCta from './sections/FinalCta.jsx';
import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Impact from './sections/Impact.jsx';
import Problem from './sections/Problem.jsx';
import Solution from './sections/Solution.jsx';
import Strategy from './sections/Strategy.jsx';
import Technology from './sections/Technology.jsx';
import Uniqueness from './sections/Uniqueness.jsx';
import Users from './sections/Users.jsx';
import Workflow from './sections/Workflow.jsx';

export default function App() {
  useLenis();
  useGsapReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <MouseGlow />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <nav className="container mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3 font-semibold text-ink">
            <span className="brand-mark" />
            SeedVision
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
            <a href="#problem">Problem</a>
            <a href="#technology">Technology</a>
            <a href="#impact">Impact</a>
          </div>
          <a className="btn-nav" href="#technology">Explore</a>
        </nav>
      </header>
      <main className="relative z-10">
        <Hero />
        <Problem />
        <ExistingSolutions />
        <Solution />
        <Technology />
        <Workflow />
        <Algorithm />
        <Uniqueness />
        <Impact />
        <Users />
        <Strategy />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
