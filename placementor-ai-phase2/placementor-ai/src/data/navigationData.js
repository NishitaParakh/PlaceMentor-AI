// Single source of truth for the dashboard sidebar. Add a page later by
// adding one entry here, registering its route in App.jsx, and (if it's
// no longer a placeholder) building the real page in src/pages/.

import {
  LayoutDashboard,
  User,
  Gauge,
  Target,
  Map,
  Bot,
  Mic,
  FileText,
  Github,
  Building2,
  Briefcase,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

export const navGroups = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "My Profile", path: "/profile", icon: User },
      { label: "Placement Readiness", path: "/readiness", icon: Gauge },
      { label: "Skill Gap Analysis", path: "/skills", icon: Target },
      { label: "Learning Roadmap", path: "/roadmap", icon: Map },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "AI Career Mentor", path: "/mentor", icon: Bot },
      { label: "Mock Interview", path: "/mock-interview", icon: Mic },
      { label: "Resume Analyzer", path: "/resume-analyzer", icon: FileText },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "Coding & GitHub", path: "/coding", icon: Github },
      { label: "Company Eligibility", path: "/companies", icon: Building2 },
      { label: "Company Preparation", path: "/company-preparation", icon: Briefcase },
      { label: "Application Tracker", path: "/applications", icon: ClipboardList },
      { label: "Placement Trends", path: "/trends", icon: TrendingUp },
    ],
  },
];

// Short one-line descriptions shown on each section's placeholder page
// until it's built out in a later phase.
export const pageDescriptions = {
  "/profile": "Edit your academic details, skills, links and resume in one place.",
  "/readiness": "A full breakdown of everything that feeds into your readiness score.",
  "/skills": "Compare your current skills against what your target roles require.",
  "/roadmap": "A week-by-week learning plan built around your skill gaps.",
  "/mentor": "Chat with your AI career mentor about placement prep questions.",
  "/mock-interview": "Practice technical, HR and behavioral interviews with instant feedback.",
  "/resume-analyzer": "Check your resume's ATS score and get keyword suggestions.",
  "/coding": "Your GitHub activity, coding profiles and problem-solving progress.",
  "/companies": "See which companies you're currently eligible for.",
  "/company-preparation": "Company-specific prep plans, topics and resources.",
  "/applications": "Track every application from applied to offer.",
  "/trends": "Placement rate, packages and hiring trends across years and branches.",
  "/settings": "Manage your account, notifications and privacy preferences.",
  "/help": "Guides and answers for getting the most out of PlaceMentor AI.",
  "/recruiter": "A separate view for recruiters to manage postings and shortlists.",
};
