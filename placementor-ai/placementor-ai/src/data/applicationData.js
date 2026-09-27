// Dummy application data — stands in for Pallavi's backend response for
// the Application Tracker (Phase 4). See src/services/api.js
// (getApplications) for how this will be swapped for a real API call
// later. Adds/edits/deletes during a session live in local React state
// on the tracker page (src/pages/ApplicationTracker.jsx) — nothing here
// persists across a refresh, by design (no backend yet).

export const APPLICATION_STATUSES = [
  "Applied",
  "Shortlisted",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

// The five stages of the visual pipeline. A separate field on each
// application (stageReached) tracks the furthest stage it ever reached,
// even if it was later rejected/withdrawn — that's what powers the
// cumulative pipeline funnel (see computePipelineCounts below).
export const PIPELINE_STAGES = ["Applied", "Shortlisted", "Assessment", "Interview", "Offer"];

export const JOB_TYPES = ["Full-time", "Internship", "Contract"];
export const LOCATIONS = ["Remote", "On-site", "Hybrid"];

// Fixed reference "today" for this demo placement season, so deadline
// urgency (Due Soon / Upcoming / Completed) stays consistent no matter
// when this project is actually opened.
export const DEMO_TODAY = "2026-08-15";

const applicationData = [
  {
    id: 1,
    company: "Accenture",
    role: "Frontend Developer",
    appliedDate: "2026-08-05",
    deadline: null,
    status: "Applied",
    nextStep: "Awaiting response",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Applied through the campus placement portal.",
    stageReached: 0,
    timeline: [{ date: "2026-08-05", event: "Application submitted" }],
  },
  {
    id: 2,
    company: "Wipro",
    role: "Graduate Engineer Trainee",
    appliedDate: "2026-08-07",
    deadline: null,
    status: "Applied",
    nextStep: "Awaiting response",
    jobType: "Full-time",
    location: "On-site",
    notes: "WILP track — pooled campus drive.",
    stageReached: 0,
    timeline: [{ date: "2026-08-07", event: "Application submitted" }],
  },
  {
    id: 3,
    company: "Cognizant",
    role: "Programmer Analyst",
    appliedDate: "2026-07-28",
    deadline: null,
    status: "Rejected",
    nextStep: "Process closed",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Did not clear the aptitude round.",
    stageReached: 0,
    timeline: [
      { date: "2026-07-28", event: "Application submitted" },
      { date: "2026-07-30", event: "Aptitude test attempted" },
      { date: "2026-08-02", event: "Application rejected" },
    ],
  },
  {
    id: 4,
    company: "Capgemini",
    role: "Software Developer",
    appliedDate: "2026-07-30",
    deadline: null,
    status: "Rejected",
    nextStep: "Process closed",
    jobType: "Full-time",
    location: "Remote",
    notes: "Rejected after the technical assessment.",
    stageReached: 0,
    timeline: [
      { date: "2026-07-30", event: "Application submitted" },
      { date: "2026-08-01", event: "Online assessment completed" },
      { date: "2026-08-05", event: "Application rejected" },
    ],
  },
  {
    id: 5,
    company: "Deloitte",
    role: "Analyst",
    appliedDate: "2026-08-10",
    deadline: "2026-08-20",
    status: "Shortlisted",
    nextStep: "Interview",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Shortlisted for the first interview round.",
    stageReached: 1,
    timeline: [
      { date: "2026-08-10", event: "Application submitted" },
      { date: "2026-08-14", event: "Resume shortlisted" },
      { date: "2026-08-16", event: "Interview scheduled for 20 Aug" },
    ],
  },
  {
    id: 6,
    company: "IBM",
    role: "Application Developer",
    appliedDate: "2026-08-08",
    deadline: "2026-08-19",
    status: "Shortlisted",
    nextStep: "Group Discussion",
    jobType: "Full-time",
    location: "Remote",
    notes: "Shortlisted based on resume screening.",
    stageReached: 1,
    timeline: [
      { date: "2026-08-08", event: "Application submitted" },
      { date: "2026-08-13", event: "Resume shortlisted" },
    ],
  },
  {
    id: 7,
    company: "HCLTech",
    role: "Associate Software Engineer",
    appliedDate: "2026-08-01",
    deadline: null,
    status: "Rejected",
    nextStep: "Process closed",
    jobType: "Full-time",
    location: "On-site",
    notes: "Not selected after the HR round.",
    stageReached: 1,
    timeline: [
      { date: "2026-08-01", event: "Application submitted" },
      { date: "2026-08-04", event: "Shortlisted for interview" },
      { date: "2026-08-09", event: "Application rejected" },
    ],
  },
  {
    id: 8,
    company: "TCS",
    role: "Software Engineer",
    appliedDate: "2026-08-12",
    deadline: "2026-08-18",
    status: "Assessment",
    nextStep: "Online Test",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Online assessment scheduled for 18 Aug.",
    stageReached: 2,
    timeline: [
      { date: "2026-08-12", event: "Application submitted" },
      { date: "2026-08-14", event: "Resume shortlisted" },
      { date: "2026-08-16", event: "Online assessment scheduled" },
    ],
  },
  {
    id: 9,
    company: "Tech Mahindra",
    role: "Software Engineer",
    appliedDate: "2026-08-03",
    deadline: null,
    status: "Withdrawn",
    nextStep: "Withdrawn by candidate",
    jobType: "Full-time",
    location: "On-site",
    notes: "Withdrew after accepting a preferred offer track.",
    stageReached: 2,
    timeline: [
      { date: "2026-08-03", event: "Application submitted" },
      { date: "2026-08-06", event: "Resume shortlisted" },
      { date: "2026-08-09", event: "Online assessment cleared" },
      { date: "2026-08-11", event: "Application withdrawn" },
    ],
  },
  {
    id: 10,
    company: "Amazon",
    role: "SDE Intern",
    appliedDate: "2026-08-01",
    deadline: "2026-08-22",
    status: "Interview",
    nextStep: "Technical Round",
    jobType: "Internship",
    location: "On-site",
    notes: "Technical interview round scheduled.",
    stageReached: 3,
    timeline: [
      { date: "2026-08-01", event: "Application submitted" },
      { date: "2026-08-05", event: "Online assessment cleared" },
      { date: "2026-08-12", event: "Shortlisted for interview" },
      { date: "2026-08-15", event: "Technical round scheduled for 22 Aug" },
    ],
  },
  {
    id: 11,
    company: "Flipkart",
    role: "SDE-1",
    appliedDate: "2026-08-06",
    deadline: "2026-08-24",
    status: "Interview",
    nextStep: "Technical Interview — Round 2",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Cleared round 1; second technical round upcoming.",
    stageReached: 3,
    timeline: [
      { date: "2026-08-06", event: "Application submitted" },
      { date: "2026-08-10", event: "Online assessment cleared" },
      { date: "2026-08-18", event: "Technical round 1 cleared" },
    ],
  },
  {
    id: 12,
    company: "Infosys",
    role: "Systems Engineer",
    appliedDate: "2026-07-20",
    deadline: null,
    status: "Offer",
    nextStep: "Awaiting joining formalities",
    jobType: "Full-time",
    location: "Hybrid",
    notes: "Received the offer letter; joining formalities in progress.",
    stageReached: 4,
    timeline: [
      { date: "2026-07-20", event: "Application submitted" },
      { date: "2026-07-25", event: "Resume shortlisted" },
      { date: "2026-07-29", event: "Online assessment cleared" },
      { date: "2026-08-03", event: "Interview completed" },
      { date: "2026-08-08", event: "Offer received" },
    ],
  },
];

export default applicationData;

// ---------------------------------------------------------------------
// Derived/summary helpers. Every number shown on the Application
// Tracker is computed from applicationData through these functions —
// nothing is hardcoded separately, so stats stay correct after any
// add/edit/delete during the session.
// ---------------------------------------------------------------------

// Total / active / interviews / offers / rejected + the three demo
// conversion percentages used by the Application Progress cards.
export function computeApplicationStats(applications) {
  const total = applications.length;
  const active = applications.filter((a) => ["Applied", "Shortlisted", "Assessment"].includes(a.status)).length;
  const interviews = applications.filter((a) => a.stageReached >= 3).length; // reached Interview or beyond
  const offers = applications.filter((a) => a.status === "Offer").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  const successRate = total ? Number(((offers / total) * 100).toFixed(1)) : 0;
  const interviewRate = total ? Number(((interviews / total) * 100).toFixed(1)) : 0;
  const offerConversion = total ? Number(((offers / total) * 100).toFixed(1)) : 0;

  return { total, active, interviews, offers, rejected, successRate, interviewRate, offerConversion };
}

// Cumulative funnel counts for the Application Pipeline — how many
// applications reached each stage or beyond.
export function computePipelineCounts(applications) {
  return PIPELINE_STAGES.reduce((acc, stage, index) => {
    acc[stage] = applications.filter((a) => a.stageReached >= index).length;
    return acc;
  }, {});
}

// Demo AI Application Insight text, built from the live stats so it
// updates as applications are added/edited/deleted.
export function buildApplicationInsight(stats) {
  return `You have ${stats.active} active application${stats.active === 1 ? "" : "s"} and ${stats.interviews} interview stage${stats.interviews === 1 ? "" : "s"} reached so far. Your application activity is strong, but your interview-to-offer conversion could improve. Focus on technical interview preparation and mock interviews.`;
}
