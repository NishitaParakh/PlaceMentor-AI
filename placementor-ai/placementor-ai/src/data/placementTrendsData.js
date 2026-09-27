// Dummy placement analytics data — stands in for Pallavi's backend +
// Soumya's charts/API response for the Placement Trends page (Phase 4).
// See src/services/api.js (getPlacementTrends) for how this will be
// swapped for a real API call later. Organized as small, focused
// datasets rather than one large blob so each chart only imports what
// it needs.

export const packageTrendData = [
  { year: 2021, package: 4.8 },
  { year: 2022, package: 5.2 },
  { year: 2023, package: 5.8 },
  { year: 2024, package: 6.4 },
  { year: 2025, package: 7.5 },
  { year: 2026, package: 8.4 },
];

export const placementRateData = [
  { year: 2021, rate: 64 },
  { year: 2022, rate: 68 },
  { year: 2023, rate: 71 },
  { year: 2024, rate: 74 },
  { year: 2025, rate: 76 },
  { year: 2026, rate: 78 },
];

export const hiringCompanyData = [
  { company: "TCS", hires: 42, type: "Service-based" },
  { company: "Infosys", hires: 35, type: "Service-based" },
  { company: "Accenture", hires: 31, type: "Service-based" },
  { company: "Deloitte", hires: 25, type: "Service-based" },
  { company: "Capgemini", hires: 22, type: "Service-based" },
  { company: "Amazon", hires: 18, type: "Product-based" },
  { company: "Flipkart", hires: 16, type: "Product-based" },
  { company: "Zepto", hires: 9, type: "Startup" },
];

export const roleDistributionData = [
  { role: "Software Engineer", value: 38 },
  { role: "Data Analyst", value: 22 },
  { role: "Frontend Developer", value: 15 },
  { role: "Backend Developer", value: 13 },
  { role: "ML Engineer", value: 8 },
  { role: "Other", value: 4 },
];

export const packageByRoleData = [
  { role: "Software Engineer", package: 9.2 },
  { role: "Data Scientist", package: 11.4 },
  { role: "Data Analyst", package: 7.5 },
  { role: "Frontend Developer", package: 8.1 },
  { role: "Backend Developer", package: 9.0 },
  { role: "ML Engineer", package: 10.8 },
];

export const keyMetrics = {
  averagePackage: 8.4,
  highestPackage: 24,
  studentsPlaced: 78,
  companiesHiring: 42,
  averagePackageGrowth: 12.5,
};

export const placementInsights = [
  { label: "Strongest Hiring Area", value: "Software Engineering" },
  { label: "Fastest Growing Role", value: "Data Science" },
  { label: "Highest Average Package", value: "ML Engineering" },
  { label: "Most Active Recruiters", value: "IT Services" },
];

export const careerIntelligenceInsight =
  "Software engineering continues to show strong hiring activity. Based on current trends, strengthening DSA, system design and backend development may improve your competitiveness for higher-paying technical roles.";

// ---- Filter option lists ----------------------------------------------

export const trendYears = ["2026", "2025", "2024", "2023", "2022"];

export const trendRoles = [
  "All Roles",
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Frontend Developer",
  "Backend Developer",
  "ML Engineer",
];

export const trendCompanyTypes = ["All", "Service-based", "Product-based", "Startup"];

export const trendTimeRanges = [
  { value: "3y", label: "Last 3 Years" },
  { value: "5y", label: "Last 5 Years" },
  { value: "all", label: "All Time" },
];

// ---- Filter-reactive derived data -------------------------------------
// Small year-over-year scale factors so the Year filter visibly changes
// the hiring / package snapshots shown on the page. Demo only — not a
// real historical model.
const YEAR_SCALE = { 2026: 1, 2025: 0.91, 2024: 0.83, 2023: 0.76, 2022: 0.7 };

export function getHiringDataForYear(year) {
  const scale = YEAR_SCALE[year] ?? 1;
  return hiringCompanyData.map((c) => ({ ...c, hires: Math.max(1, Math.round(c.hires * scale)) }));
}

export function getPackageByRoleForYear(year) {
  const scale = YEAR_SCALE[year] ?? 1;
  return packageByRoleData.map((r) => ({ ...r, package: Number((r.package * scale).toFixed(1)) }));
}

export function getCompaniesHiringForYear(year) {
  const scale = YEAR_SCALE[year] ?? 1;
  return Math.round(keyMetrics.companiesHiring * scale);
}
