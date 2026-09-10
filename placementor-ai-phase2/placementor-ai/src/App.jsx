import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import { pageDescriptions } from "./data/navigationData.js";

// "/"          -> public landing page (Phase 1)
// "/login"     -> mocked login page (Phase 1)
// "/dashboard" -> full student dashboard (Phase 2)
//
// Everything below is a placeholder route: it exists so every sidebar
// link and future feature area has somewhere to go without hitting a
// dead route, but the real page is built in a later phase. Each one
// reuses PlaceholderPage + a one-line description from navigationData.js,
// so adding a new section later is just: build the real page, then swap
// its <Route element> here.
const PLACEHOLDER_ROUTES = [
  { path: "/profile", title: "My Profile" },
  { path: "/readiness", title: "Placement Readiness" },
  { path: "/skills", title: "Skill Gap Analysis" },
  { path: "/roadmap", title: "Learning Roadmap" },
  { path: "/mentor", title: "AI Career Mentor" },
  { path: "/mock-interview", title: "Mock Interview" },
  { path: "/resume-analyzer", title: "Resume Analyzer" },
  { path: "/coding", title: "Coding & GitHub" },
  { path: "/companies", title: "Company Eligibility" },
  { path: "/company-preparation", title: "Company Preparation" },
  { path: "/applications", title: "Application Tracker" },
  { path: "/trends", title: "Placement Trends" },
  { path: "/settings", title: "Settings" },
  { path: "/help", title: "Help" },
  { path: "/recruiter", title: "Recruiter Dashboard" },
];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<StudentDashboard />} />

      {PLACEHOLDER_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PlaceholderPage title={route.title} description={pageDescriptions[route.path]} />}
        />
      ))}
    </Routes>
  );
}
