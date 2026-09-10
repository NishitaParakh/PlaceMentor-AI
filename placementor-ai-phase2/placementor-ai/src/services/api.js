// ---------------------------------------------------------------------------
// Mock API service layer.
//
// Every function here returns dummy data wrapped in a Promise, so it already
// behaves like a real network call. When Pallavi's backend is ready, replace
// the inside of each function with an actual fetch()/axios call — nothing in
// the components that call these functions needs to change.
//
// Example of what a real version will look like later:
//
//   const BASE_URL = "https://api.placementor.ai";
//
//   export async function getStudentDashboard() {
//     const res = await fetch(`${BASE_URL}/student/dashboard`);
//     if (!res.ok) throw new Error("Failed to load dashboard");
//     return res.json();
//   }
//
// The frontend never talks to the database, ML models or NLP models
// directly — everything goes through this file.
// ---------------------------------------------------------------------------

import studentData from "../data/studentData.js";
import { readinessCategories, readinessInsight, careerInsight } from "../data/readinessData.js";
import { probabilityTrend, probabilityMeta } from "../data/probabilityData.js";
import { recentActivity } from "../data/activityData.js";
import { upcomingTasks } from "../data/taskData.js";

const MOCK_DELAY = 350; // ms — just enough to simulate network latency

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_DELAY);
  });
}

// GET /student/dashboard — core profile + summary numbers
export function getStudentDashboard() {
  return mockResponse(studentData);
}

// GET /student/readiness — score, category breakdown, AI insight text
export function getReadinessScore() {
  return mockResponse({
    score: studentData.readinessScore,
    breakdown: studentData.readinessBreakdown,
    categories: readinessCategories,
    insight: readinessInsight,
  });
}

// GET /student/placement-probability — current probability + trend
export function getPlacementProbability() {
  return mockResponse({
    ...probabilityMeta,
    trend: probabilityTrend,
  });
}

// GET /student/activity — recent activity feed
export function getRecentActivity() {
  return mockResponse(recentActivity);
}

// GET /student/tasks — "Your Next Steps" list
export function getUpcomingTasks() {
  return mockResponse(upcomingTasks);
}

// GET /student/career-insight — AI Career Insight card content
export function getCareerInsight() {
  return mockResponse(careerInsight);
}

// Placeholders for later phases — kept here so pages can start calling
// them now and swap in real data without changing their code.
export function getSkillGap() {
  return mockResponse([]);
}

export function getCompanies() {
  return mockResponse([]);
}

export function getApplications() {
  return mockResponse([]);
}
