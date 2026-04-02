import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// ================= Layout Components =================
import { Navbar } from "./components/Navbar";
import Footer from './components/Footer';
import Announcement from './components/Announcement';
import ScrollToTop from "./components/ScrollToTop";

// ================= Page Components =================
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { People } from './pages/People';
import { Programmes } from './pages/Programmes';
import { Projects } from './pages/Projects';
import WhyIndia from './pages/WhyIndia';
import ExploreUS from './pages/ExploreUs';
import ContactUs from './pages/ContactUs';
import { Work } from './pages/Work';
import { FellowShip } from './components/FellowShip/FellowShip';
import FellowForm from './components/FellowShip/FellowForm';
import Error404 from './pages/Error';
import HackathonLanding from './hackathon-pages/Landing';
import Solve4PurposeProblems from './hackathon-pages/Solve4PurposeProblems';
import Solve4PurposeForm from './hackathon-pages/Solve4PurposeForm';

// ================= Work Role Components =================
import { WorkForm } from './components/WorkCom/WorkForm';
import { SocialInfo } from './components/WorkCom/SocialInfo';
import { MarketInfo } from './components/WorkCom/MarketInfo';
import { MarketForm } from './components/WorkCom/MarketForm';
import { MechInfo } from './components/WorkCom/MechInfo';
import { ElecInfo } from './components/WorkCom/ElecInfo';
import { MechForm } from './components/WorkCom/MechForm';
import { ElecForm } from './components/WorkCom/ElecForm';
import { AdvisorInfo } from './components/WorkCom/AdvisorInfo';
import { AdviForm } from './components/WorkCom/AdvisorForm';
import { LeadInfo } from './components/WorkCom/LeadInfo';
import { LeadForm } from './components/WorkCom/LeadForm';
import { EventManagerInfo } from './components/WorkCom/EventManagerInfo';
import { EventManagerForm } from './components/WorkCom/EventManagerForm';
import { WebDeveloperInfo } from './components/WorkCom/WebDeveloperInfo';
import { WebDeveloperForm } from './components/WorkCom/WebDeveloperForm';
import { ResearchInternInfo } from './components/WorkCom/ResearchInternInfo';
import { ResearchInternForm } from './components/WorkCom/ResearchInternForm';
import { InterestInfo } from './components/WorkCom/InterestInfo';
import { InterestForm } from './components/WorkCom/InterestForm';

// ================= Project Specific =================
import { KhyoraMain } from './components/projectCom/khyoraCom/KhyoraMain';

// =====================================================
// AppContent handles conditional layout rendering
// =====================================================
function AppContent() {
  const location = useLocation();
  const isKhyoraPage = location.pathname === '/khyora';

  return (
    <>
      <ScrollToTop />

      {/* Hide Navbar on Khyora page */}
      {!isKhyoraPage && <Navbar />}

      <Routes>

        {/* ================= Main Routes ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/people" element={<People />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/why-india?" element={<WhyIndia />} />
        <Route path="/explore-us" element={<ExploreUS />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/work" element={<Work />} />

        {/* ================= Fellowship Routes ================= */}
        <Route path="/fellowship" element={<FellowShip />} />
        <Route path="/apply" element={<FellowForm />} />

        {/* ================= Work Roles ================= */}
        <Route path="/work-social-info" element={<SocialInfo />} />
        <Route path="/work-social-form" element={<WorkForm />} />

        <Route path="/work-market-info" element={<MarketInfo />} />
        <Route path="/work-market-form" element={<MarketForm />} />

        <Route path="/work-mech-info" element={<MechInfo />} />
        <Route path="/work-mech-form" element={<MechForm />} />

        <Route path="/work-elec-info" element={<ElecInfo />} />
        <Route path="/work-elec-form" element={<ElecForm />} />

        <Route path="/work-event-info" element={<EventManagerInfo />} />
        <Route path="/work-event-form" element={<EventManagerForm />} />

        <Route path="/work-web-developer-info" element={<WebDeveloperInfo />} />
        <Route path="/work-web-developer-form" element={<WebDeveloperForm />} />

        {/* ✅ NEW Research Intern Routes */}
        <Route path="/work-research-intern-info" element={<ResearchInternInfo />} />
        <Route path="/work-research-intern-form" element={<ResearchInternForm />} />

        <Route path="/work-advisor-info" element={<AdvisorInfo />} />
        <Route path="/work-advisor-form" element={<AdviForm />} />

        {/* ================= Expression of Interest ================= */}
        <Route path="/work-interest-info" element={<InterestInfo />} />
        <Route path="/work-interest-form" element={<InterestForm />} />

        <Route path="/work-lead-info" element={<LeadInfo />} />
        <Route path="/work-lead-form" element={<LeadForm />} />
        <Route path="/solve4purpose" element={<HackathonLanding />} />
        <Route path="/solve4purpose/register" element={<Solve4PurposeForm />} />
        <Route path="/solve4purpose/problems" element={<Solve4PurposeProblems />} />

        {/* ================= Standalone Project Route ================= */}
        <Route path="/khyora" element={<KhyoraMain />} />

        {/* ================= Fallback ================= */}
        <Route path="*" element={<Error404 />} />

      </Routes>

      {/* Hide Footer on Khyora page */}
      {!isKhyoraPage && <Footer />}
    </>
  );
}


// =====================================================
// Root App
// =====================================================
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
