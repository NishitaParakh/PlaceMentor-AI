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
import skillData, { skillCategories, skillSummary, recommendedFocus } from "../data/skillData.js";
import roadmapData, { roadmapSummary, roadmapInsight, recommendedLearning, careerGoals, targetCompanies } from "../data/roadmapData.js";
import applicationData from "../data/applicationData.js";
import * as placementTrendsData from "../data/placementTrendsData.js";
import { getMentorReply } from "../data/mentorData.js";
import { getInterviewQuestions, evaluateAnswer } from "../data/interviewData.js";
import sampleAnalysis from "../data/resumeData.js";
import {
  platforms,
  codingProgress,
  topicProgress,
  weeklyActivity,
  codingRoadmap,
} from "../data/codingPlatformsData.js";
import { companies, checkEligibility, getEligibilitySuggestions } from "../data/companyData.js";
import { companyPreparationPlans, defaultChecklist } from "../data/companyPreparationData.js";
import {
  recruiterProfile,
  recruiterStats,
  jobOpenings,
  candidates as recruiterCandidates,
  initialInterviews,
  recruitmentActivity,
  applicationsByRole,
  statusDistribution,
  applicationsOverTime,
  hiringFunnel,
  selectedByRole,
} from "../data/recruiterData.js";

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

// GET /student/skills — Skill Gap Analysis (Phase 3).
// SkillGap.jsx currently imports src/data/skillData.js directly (filtering/
// sorting all happen client-side against that array), so this function
// isn't wired into the page yet — it exists so a future fetch-on-mount can
// swap in without changing SkillGap.jsx's filter/sort logic.
// TODO: Replace mock data with Pallavi's backend API.
export function getSkills() {
  return mockResponse({
    skills: skillData,
    categories: skillCategories,
    summary: skillSummary,
    recommendedFocus,
  });
}

// GET /student/roadmap — Personalized Learning Roadmap (Phase 3).
// Same note as getSkills(): Roadmap.jsx reads src/data/roadmapData.js
// directly today (so week/task-completion state stays instant and local
// to the session); this is the documented hook for later.
// TODO: Replace mock data with Pallavi's backend API.
export function getRoadmap() {
  return mockResponse({
    weeks: roadmapData,
    summary: roadmapSummary,
    insight: roadmapInsight,
    recommendedLearning,
    careerGoals,
    targetCompanies,
  });
}

// Older, narrower aliases kept for backward compatibility in case
// anything already calls them — prefer getSkills() / getApplications()
// going forward.
export function getSkillGap() {
  return mockResponse(skillData);
}

export function getCompanies() {
  return mockResponse(targetCompanies);
}

// GET /student/applications — Application Tracker (Phase 4).
// ApplicationTracker.jsx currently seeds its own local state directly
// from src/data/applicationData.js (so add/edit/delete stay instant and
// local to the session); this function exists so a future backend-backed
// fetch on mount can drop in without changing that component's shape.
// TODO: Replace mock data with Pallavi's backend API.
export function getApplications() {
  return mockResponse(applicationData);
}

// GET /student/placement-trends — Placement Trends & Analytics (Phase 4).
// Bundles every dataset PlacementTrends.jsx reads today. Kept as one
// object (rather than one call per chart) to match how a real analytics
// endpoint would likely respond.
// TODO: Replace mock data with Pallavi's backend API + Soumya's charts data.
export function getPlacementTrends() {
  return mockResponse({
    packageTrend: placementTrendsData.packageTrendData,
    placementRate: placementTrendsData.placementRateData,
    hiringCompanies: placementTrendsData.hiringCompanyData,
    roleDistribution: placementTrendsData.roleDistributionData,
    packageByRole: placementTrendsData.packageByRoleData,
    keyMetrics: placementTrendsData.keyMetrics,
    insights: placementTrendsData.placementInsights,
  });
}

// ---------------------------------------------------------------------------
// Phase 5 — AI Career Mentor & AI Mock Interview
//
// These three wrap the local dummy logic in the same Promise-based shape as
// everything above. Nothing here calls a real AI, ML or NLP service: mentor
// replies come from keyword matching in mentorData.js, and interview scores
// come from the length/keyword heuristic in interviewData.js.
//
// The pages currently call those data-file functions directly (so typing
// indicators and per-question feedback stay instant and local to the
// session). These wrappers are the documented seam for later: swap each
// body for a real fetch() and the components keep the same data shape.
// ---------------------------------------------------------------------------

// POST /mentor/message — send one message, get the mentor's reply.
// TODO: Replace with Pallavi's backend API + Vrinda's NLP service.
export function sendMentorMessage(message) {
  const reply = getMentorReply(message);
  return mockResponse({ type: "demo", question: message, ...reply });
}

// POST /interview/start — get the question set for a chosen setup.
// TODO: Replace with Pallavi's backend API.
export function startMockInterview(settings, limit = 5) {
  return mockResponse({
    type: "demo",
    settings,
    questions: getInterviewQuestions(settings, limit),
  });
}

// POST /interview/answer — score one answer and return sample feedback.
// TODO: Replace with Tanishqa's ML evaluation via Pallavi's backend API.
export function submitInterviewAnswer(question, answer) {
  const evaluation = evaluateAnswer(question, answer);
  return mockResponse({ type: "demo", questionId: question.id, ...evaluation });
}

// ---------------------------------------------------------------------------
// Phase 6 — ATS Resume Analyzer & Coding Platforms
//
// As above, these wrap local dummy data in the same Promise shape. Nothing
// here parses a resume or contacts GitHub/LeetCode/any coding platform.
// The pages read the data files directly today (so the upload flow and the
// progress dashboard stay instant and local); these wrappers are the
// documented seam for later.
// ---------------------------------------------------------------------------

// POST /resume/analyze — upload a resume, get an ATS report back.
//
// The `file` argument is accepted so the signature already matches what a
// real implementation needs, but it is deliberately NOT read here: the
// prototype returns the same fixed sample report for any input. A real
// version would send it as multipart/form-data and let the backend parse it.
// TODO: Replace with Pallavi's backend API + Vrinda's NLP resume parsing.
export function analyzeResume(file) {
  return mockResponse({
    type: "demo",
    fileName: file?.name ?? null,
    ...sampleAnalysis,
  });
}

// GET /coding/platforms — platform reference list and sample activity.
// TODO: Replace with Pallavi's backend API (which would own any GitHub /
// LeetCode profile syncing — the frontend never calls those directly).
export function getCodingPlatformData() {
  return mockResponse({ type: "demo", platforms, roadmap: codingRoadmap });
}

// GET /coding/progress — the student's problem-solving statistics.
// TODO: Replace with Pallavi's backend API.
export function getCodingProgress() {
  return mockResponse({
    type: "demo",
    summary: codingProgress,
    topics: topicProgress,
    weeklyActivity,
  });
}

// ---------------------------------------------------------------------------
// Phase 7 — Company Eligibility Checker & Company-Specific Preparation
//
// As with the earlier phases, these wrap local dummy logic in the same
// Promise shape as the rest of this file. The eligibility comparison and
// preparation plans are simplified, hand-written samples — not real hiring
// criteria — which is why the UI labels every result as a prototype.
// ---------------------------------------------------------------------------

// POST /eligibility/check — compare a student profile against one
// company's sample requirements.
// TODO: Replace with Pallavi's backend API (a real rule engine, or ML
// model, would likely live behind this endpoint rather than in the
// frontend).
export function checkCompanyEligibility(profile, companyId) {
  const company = companies.find((c) => c.id === companyId);
  if (!company) return mockResponse({ type: "demo", error: "Unknown company" });

  const result = checkEligibility(profile, company);
  const suggestions = getEligibilitySuggestions(result, company);
  return mockResponse({ type: "demo", company, ...result, suggestions });
}

// GET /companies — sample company list and their requirements.
// TODO: Replace with Pallavi's backend API.
export function getCompanyRequirements() {
  return mockResponse({ type: "demo", companies });
}

// GET /companies/:id/preparation-plan — sample preparation plan.
// TODO: Replace with Pallavi's backend API.
export function getCompanyPreparationPlan(companyId) {
  return mockResponse({
    type: "demo",
    plan: companyPreparationPlans[companyId] ?? null,
    checklist: defaultChecklist,
  });
}

// ---------------------------------------------------------------------------
// Phase 8 — Recruiter Dashboard
//
// Same wrapping pattern as every phase above: local dummy data returned in
// the same Promise shape a real fetch would use. The Recruiter Dashboard
// page currently reads recruiterData.js directly and keeps job/candidate/
// interview edits in local React state (so the demo stays interactive
// without a backend); these wrappers are the documented seam for when
// Pallavi's backend can persist those changes for real.
// ---------------------------------------------------------------------------

// GET /recruiter/dashboard — profile, summary stats and activity feed in
// one call, mirroring how a real dashboard endpoint would likely respond.
// TODO: Replace with Pallavi's backend API.
export function getRecruiterDashboard() {
  return mockResponse({
    type: "demo",
    profile: recruiterProfile,
    stats: recruiterStats,
    activity: recruitmentActivity,
  });
}

// GET /recruiter/jobs — job openings list.
// TODO: Replace with Pallavi's backend API.
export function getJobOpenings() {
  return mockResponse({ type: "demo", jobs: jobOpenings });
}

// GET /recruiter/candidates — candidate list.
// TODO: Replace with Pallavi's backend API.
export function getCandidates() {
  return mockResponse({ type: "demo", candidates: recruiterCandidates });
}

// PATCH /recruiter/candidates/:id/status — shortlist, reject or select a
// candidate. Accepted here as (candidateId, status) so the shape matches
// what RecruiterDashboard.jsx already does in local state.
// TODO: Replace with Pallavi's backend API.
export function updateCandidateStatus(candidateId, status) {
  return mockResponse({ type: "demo", candidateId, status });
}

// GET /recruiter/interviews — currently scheduled interviews.
// TODO: Replace with Pallavi's backend API.
export function getInterviews() {
  return mockResponse({ type: "demo", interviews: initialInterviews });
}

// POST /recruiter/interviews — schedule an interview.
// TODO: Replace with Pallavi's backend API. Never sends real emails or
// calendar invites — that would be a backend/notification-service concern.
export function scheduleInterview(interview) {
  return mockResponse({ type: "demo", interview: { ...interview, id: `int-${Date.now()}` } });
}

// GET /recruiter/analytics — recruitment analytics bundle.
// TODO: Replace with Pallavi's backend API + Soumya's charts data.
export function getRecruitmentAnalytics() {
  return mockResponse({
    type: "demo",
    applicationsByRole,
    statusDistribution,
    applicationsOverTime,
    hiringFunnel,
    selectedByRole,
  });
}
