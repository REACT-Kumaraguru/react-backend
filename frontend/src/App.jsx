import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";

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
import FellowshipTrackPage from './pages/FellowshipTrackPage';
import FellowshipTrackFormPage from './pages/FellowshipTrackFormPage';
import Error404 from './pages/Error';
import { EntrepreneurIndex } from './pages/EntrepreneurIndex';
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
import { InternshipInfo } from './components/WorkCom/InternshipInfo';
import { InternshipForm } from './components/WorkCom/InternshipForm';
import { InterestInfo } from './components/WorkCom/InterestInfo';
import { InterestForm } from './components/WorkCom/InterestForm';

// ================= Project Specific =================
import { KhyoraMain } from './components/projectCom/khyoraCom/KhyoraMain';
import WorkplaceLogin from './pages/WorkplaceLogin';
import WorkplaceRegister from './pages/WorkplaceRegister';
import WorkplaceUserDashboard from './pages/WorkplaceUserDashboard';
import AdminWorkplaceLayout from './layouts/AdminWorkplaceLayout';
import UserWorkplaceLayout from './layouts/UserWorkplaceLayout';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminUsersLayout from './layouts/AdminUsersLayout';
import AdminActiveUsersPage from './pages/admin/AdminActiveUsersPage';
import AdminODPage from './pages/admin/AdminODPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminProfileRequestsPage from './pages/admin/AdminProfileRequestsPage';
import AdminProgrammeGuard from './components/programmes/AdminProgrammeGuard';
import ProgrammeAdmin from './components/programmes/ProgrammeAdmin';
import { ToastProvider } from './components/programmes/Toast';
import AdminWorkplaceRolesPage from './pages/admin/AdminWorkplaceRolesPage';
import AdminAdminsPage from './pages/admin/AdminAdminsPage';
import OdHubPage from './pages/workplace/OdHubPage';
import OdApplyPage from './pages/workplace/OdApplyPage';
import RiskMLayout from './riskm/RiskMLayout';
import RiskMMySubmissions from './riskm/pages/RiskMMySubmissions';
import RiskMAdmin from './riskm/pages/RiskMAdmin';
import RiskMViewPage from './riskm/pages/RiskMViewPage';
import RiskMNewSubmission from './riskm/pages/RiskMNewSubmission';

// =====================================================
// AppContent handles conditional layout rendering
// =====================================================
function ProgrammeSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/fellowship/${encodeURIComponent(String(slug || '').trim())}`} replace />;
}

function ProgrammesSlugRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/fellowship/${encodeURIComponent(String(slug || '').trim())}`} replace />;
}

function FellowshipFormLegacyRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/fellowship/${encodeURIComponent(String(slug || '').trim())}/forms`} replace />;
}

function AppContent() {
  const location = useLocation();
  const isKhyoraPage = location.pathname === '/khyora';
  const isWorkplace = location.pathname.startsWith('/workplace');

  return (
    <>
      <ScrollToTop />

      {/* Hide Navbar on Khyora and workplace (includes admin sidebar) */}
      {!isKhyoraPage && !isWorkplace && <Navbar />}

      <Routes>

        {/* ================= Main Routes ================= */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/people" element={<People />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programmes/:slug" element={<ProgrammesSlugRedirect />} />
        <Route path="/programme/:slug" element={<ProgrammeSlugRedirect />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/why-india?" element={<WhyIndia />} />
        <Route path="/explore-us" element={<ExploreUS />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/announcements" element={<Announcement />} />
        <Route path="/work" element={<Work />} />
        <Route path="/entrepreneur-index" element={<EntrepreneurIndex />} />
        <Route path="/enterpernur-index" element={<Navigate to="/entrepreneur-index" replace />} />

        <Route path="/admin/programmes" element={<Navigate to="/workplace/admin/programmes" replace />} />

        {/* ================= Fellowship Routes ================= */}
        <Route
          path="/fellowship/venture-fellowship/forms"
          element={<Navigate to="/programmes" replace />}
        />
        <Route path="/fellowship/venture-fellowship" element={<Navigate to="/programmes" replace />} />
        <Route path="/fellowship/:slug/forms" element={<FellowshipTrackFormPage />} />
        <Route path="/fellowship/:slug/form" element={<FellowshipFormLegacyRedirect />} />
        <Route path="/fellowship/:slug" element={<FellowshipTrackPage />} />
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

        {/* ✅ NEW Internship Routes */}
        <Route path="/work-intern-info" element={<InternshipInfo />} />
        <Route path="/work-intern-form" element={<InternshipForm />} />

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

        {/* ================= React Workplace (auth + admin) ================= */}
        <Route path="/workplace/login" element={<WorkplaceLogin />} />
        <Route path="/workplace/register" element={<WorkplaceRegister />} />
        <Route path="/workplace/admin" element={<AdminWorkplaceLayout />}>
          <Route index element={<Navigate to="users/pending" replace />} />
          <Route path="users" element={<AdminUsersLayout />}>
            <Route index element={<Navigate to="pending" replace />} />
            <Route path=":filter" element={<AdminUsersPage />} />
          </Route>
          <Route path="active-users" element={<AdminActiveUsersPage />} />
          <Route path="profile-requests" element={<AdminProfileRequestsPage />} />
          <Route path="od" element={<AdminODPage />} />
          <Route path="manage-admins" element={<AdminAdminsPage />} />
          <Route path="registration-roles" element={<AdminWorkplaceRolesPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route
            path="programmes"
            element={
              <AdminProgrammeGuard>
                <ProgrammeAdmin />
              </AdminProgrammeGuard>
            }
          />
          <Route path="riskm" element={<RiskMLayout />}>
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="admin" element={<RiskMAdmin />} />
            <Route path="view/:id" element={<RiskMViewPage />} />
          </Route>
        </Route>
        <Route path="/workplace" element={<UserWorkplaceLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<WorkplaceUserDashboard />} />
          <Route path="od" element={<OdHubPage />} />
          <Route path="od/apply" element={<OdApplyPage />} />
          <Route path="riskm" element={<RiskMLayout />}>
            <Route index element={<Navigate to="submissions" replace />} />
            <Route path="submissions" element={<RiskMMySubmissions />} />
            <Route path="new" element={<RiskMNewSubmission />} />
            <Route path="view/:id" element={<RiskMViewPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Navigate to="/workplace/login" replace />} />
        <Route path="/register" element={<Navigate to="/workplace/register" replace />} />
        <Route path="/admin" element={<Navigate to="/workplace/admin/users/pending" replace />} />
        <Route path="/riskm/*" element={<Navigate to="/workplace/riskm/submissions" replace />} />

        {/* ================= Standalone Project Route ================= */}
        <Route path="/khyora" element={<KhyoraMain />} />

        {/* ================= Fallback ================= */}
        <Route path="*" element={<Error404 />} />

      </Routes>

      {/* Hide Footer on Khyora and workplace */}
      {!isKhyoraPage && !isWorkplace && <Footer />}
    </>
  );
}


// =====================================================
// Root App
// =====================================================
function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}

export default App;
