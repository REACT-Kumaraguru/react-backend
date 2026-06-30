import { Routes, Route, useLocation } from 'react-router-dom';
import { Nav, Footer, ScrollManager, useInteractions } from './shared.jsx';
import Home from './pages/Home.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Benefits from './pages/Benefits.jsx';
import Applications from './pages/Applications.jsx';

export default function App() {
  const { pathname } = useLocation();
  // Re-wire scroll/reveal/animation observers whenever the route changes.
  useInteractions(pathname);
  return (
    <>
      <ScrollManager />
      <Nav />
      <main key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
