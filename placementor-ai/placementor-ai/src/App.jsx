import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import SkillGap from "./pages/SkillGap.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import ApplicationTracker from "./pages/ApplicationTracker.jsx";
import PlacementTrends from "./pages/PlacementTrends.jsx";
import CareerMentor from "./pages/CareerMentor.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";
import CodingPlatforms from "./pages/CodingPlatforms.jsx";
import CompanyEligibility from "./pages/CompanyEligibility.jsx";
import CompanyPreparation from "./pages/CompanyPreparation.jsx";
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { pageDescriptions } from "./data/navigationData.js";

// "/"             -> public landing page (Phase 1)
// "/login"        -> mocked login page (Phase 1)
// "/dashboard"    -> full student dashboard (Phase 2)
// "/skills"       -> Skill Gap Analysis (Phase 3)
// "/roadmap"      -> Personalized Learning Roadmap (Phase 3)
// "/applications" -> Application Tracker (Phase 4)
// "/trends"       -> Placement Trends & Analytics (Phase 4)
// "/mentor"       -> AI Career Mentor (Phase 5)
// "/mock-interview" -> AI Mock Interview (Phase 5)
// "/resume-analyzer" -> ATS Resume Analyzer (Phase 6)
// "/coding-platforms" -> GitHub & Coding Profiles (Phase 6)
// "/company-eligibility" -> Company Eligibility Checker (Phase 7)
// "/company-preparation" -> Company-Specific Preparation (Phase 7)
// "/recruiter-dashboard" -> Recruiter Dashboard (Phase 8)
//
// Everything below is a placeholder route: it exists so every sidebar
// link and future feature area has somewhere to go without hitting a
// dead route, but the real page is built in a later phase. Each one
// reuses PlaceholderPage + a one-line description from navigationData.js,
// so adding a new section later is just: build the real page, then move
// its entry out of PLACEHOLDER_ROUTES and into a real <Route> above.
const PLACEHOLDER_ROUTES = [
  { path: "/profile", title: "My Profile" },
  { path: "/readiness", title: "Placement Readiness" },
  { path: "/settings", title: "Settings" },
  { path: "/help", title: "Help" },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/skills" element={<SkillGap />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/applications" element={<ApplicationTracker />} />
      <Route path="/trends" element={<PlacementTrends />} />
      <Route path="/mentor" element={<CareerMentor />} />
      <Route path="/mock-interview" element={<MockInterview />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/coding-platforms" element={<CodingPlatforms />} />

      {/* The Phase 6 coding page replaced the old "/coding" placeholder.
          Redirect rather than drop it, so any existing link or bookmark
          still lands somewhere useful instead of the 404 page. */}
      <Route path="/coding" element={<Navigate to="/coding-platforms" replace />} />

      <Route path="/company-eligibility" element={<CompanyEligibility />} />
      <Route path="/company-preparation" element={<CompanyPreparation />} />

      {/* The Phase 7 eligibility page replaced the old "/companies"
          placeholder — redirect so any existing link still resolves. */}
      <Route path="/companies" element={<Navigate to="/company-eligibility" replace />} />

      <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

      {/* The Phase 8 recruiter page replaced the old "/recruiter"
          placeholder — redirect so any existing link still resolves. */}
      <Route path="/recruiter" element={<Navigate to="/recruiter-dashboard" replace />} />

      {PLACEHOLDER_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PlaceholderPage title={route.title} description={pageDescriptions[route.path]} />}
        />
      ))}

      {/* Catch-all — any URL that doesn't match a route above (typo, old
          link, etc.) lands here instead of a blank screen. Must stay last. */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
