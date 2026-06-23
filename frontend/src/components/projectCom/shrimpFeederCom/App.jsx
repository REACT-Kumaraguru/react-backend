import { useLenis } from './hooks/useLenis';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import MouseGlow from './components/MouseGlow';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';

import Hero from './sections/Hero';
import Problem from './sections/Problem';
import ExistingSolutions from './sections/ExistingSolutions';
import ProposedSolution from './sections/ProposedSolution';
import WorkingPrinciple from './sections/WorkingPrinciple';
import KeyFeatures from './sections/KeyFeatures';
import Impact from './sections/Impact';
import TargetAudience from './sections/TargetAudience';
import MarketAnalysis from './sections/MarketAnalysis';
import Timeline from './sections/Timeline';
import Team from './sections/Team';
import Footer from './sections/Footer';

export default function App() {
  useLenis();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <MouseGlow />
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Problem />
        <ExistingSolutions />
        <ProposedSolution />
        <WorkingPrinciple />
        <KeyFeatures />
        <Impact />
        <TargetAudience />
        <MarketAnalysis />
        <Timeline />
        <Team />
        <Footer />
      </main>
    </>
  );
}
