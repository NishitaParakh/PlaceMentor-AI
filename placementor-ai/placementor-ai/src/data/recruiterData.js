// Dummy data for the Recruiter Dashboard (Phase 8).
//
// IMPORTANT: this is a separate, fictional demo view — company, recruiter,
// job and candidate names below are all made up for demonstration. No
// real student data, database, or backend is involved. When Pallavi's
// backend is ready, the functions in src/services/api.js that wrap this
// data are the seam to replace.

export const recruiterProfile = {
  recruiterName: "Ananya Rao",
  role: "Senior Talent Acquisition Partner",
  companyName: "Nimbus Technologies",
  industry: "Information Technology Services",
  location: "Bengaluru, India",
  openPositions: 6,
  contact: "careers@nimbustech.example",
  placementDrive: "Campus Drive 2026–27",
};

// ---- Summary statistics (top of dashboard) ----
export const recruiterStats = [
  { key: "openings", label: "Active Job Openings", value: 6, trend: "+2 this month" },
  { key: "applicants", label: "Total Applicants", value: 214, trend: "+38 this week" },
  { key: "shortlisted", label: "Shortlisted Candidates", value: 52, trend: "+9 this week" },
  { key: "interviews", label: "Scheduled Interviews", value: 18, trend: "5 this week" },
  { key: "selected", label: "Selected Candidates", value: 11, trend: "+3 this month" },
  { key: "pending", label: "Pending Applications", value: 96, trend: "Needs review" },
];

export const jobStatuses = ["Active", "Draft", "Under Review", "Closed"];
export const jobTypes = ["Full-time", "Internship", "Internship + PPO"];

// ---- Job openings ----
export const jobOpenings = [
  {
    id: "job-1",
    title: "Software Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Bengaluru (Hybrid)",
    skills: ["Java", "Data Structures & Algorithms", "SQL"],
    minCgpa: 7.0,
    applicants: 58,
    deadline: "2026-10-05",
    status: "Active",
  },
  {
    id: "job-2",
    title: "Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    skills: ["React", "JavaScript", "HTML/CSS"],
    minCgpa: 6.5,
    applicants: 47,
    deadline: "2026-10-12",
    status: "Active",
  },
  {
    id: "job-3",
    title: "Backend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Pune (On-site)",
    skills: ["Node.js", "SQL", "System Design"],
    minCgpa: 7.0,
    applicants: 36,
    deadline: "2026-10-15",
    status: "Under Review",
  },
  {
    id: "job-4",
    title: "Data Analyst",
    department: "Analytics",
    type: "Full-time",
    location: "Bengaluru (Hybrid)",
    skills: ["SQL", "Excel", "Data Interpretation"],
    minCgpa: 6.5,
    applicants: 41,
    deadline: "2026-10-08",
    status: "Active",
  },
  {
    id: "job-5",
    title: "QA Engineer",
    department: "Quality Assurance",
    type: "Internship + PPO",
    location: "Remote",
    skills: ["Manual Testing", "SQL", "Problem Solving"],
    minCgpa: 6.0,
    applicants: 19,
    deadline: "2026-09-30",
    status: "Draft",
  },
  {
    id: "job-6",
    title: "Business Analyst",
    department: "Strategy",
    type: "Full-time",
    location: "Mumbai (On-site)",
    skills: ["Communication", "Data Interpretation", "Problem Solving"],
    minCgpa: 7.0,
    applicants: 13,
    deadline: "2026-09-20",
    status: "Closed",
  },
];

export const applicationStatuses = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Rejected",
];

export const resumeStatuses = ["Received", "Reviewed", "Flagged"];
export const interviewStatuses = ["Not Scheduled", "Scheduled", "Completed"];

// ---- Candidates ----
// Fictional names and figures only — this mirrors what a recruiter's
// applicant list might look like, not real student records.
export const candidates = [
  {
    id: "cand-1",
    name: "Rohan Mehta",
    role: "Software Developer",
    skills: ["Java", "Data Structures & Algorithms", "SQL"],
    cgpa: 8.2,
    projects: 3,
    status: "Shortlisted",
    resumeStatus: "Reviewed",
    interviewStatus: "Scheduled",
    appliedOn: "2026-09-02",
  },
  {
    id: "cand-2",
    name: "Ishita Sharma",
    role: "Frontend Developer",
    skills: ["React", "JavaScript", "HTML/CSS"],
    cgpa: 7.9,
    projects: 4,
    status: "Interview Scheduled",
    resumeStatus: "Reviewed",
    interviewStatus: "Scheduled",
    appliedOn: "2026-09-03",
  },
  {
    id: "cand-3",
    name: "Aditya Verma",
    role: "Backend Developer",
    skills: ["Node.js", "SQL", "System Design"],
    cgpa: 7.3,
    projects: 2,
    status: "Under Review",
    resumeStatus: "Received",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-09-05",
  },
  {
    id: "cand-4",
    name: "Sneha Reddy",
    role: "Data Analyst",
    skills: ["SQL", "Excel", "Data Interpretation"],
    cgpa: 8.6,
    projects: 3,
    status: "Selected",
    resumeStatus: "Reviewed",
    interviewStatus: "Completed",
    appliedOn: "2026-08-28",
  },
  {
    id: "cand-5",
    name: "Karan Malhotra",
    role: "Software Developer",
    skills: ["Java", "SQL"],
    cgpa: 6.4,
    projects: 1,
    status: "Rejected",
    resumeStatus: "Reviewed",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-08-30",
  },
  {
    id: "cand-6",
    name: "Priya Nair",
    role: "QA Engineer",
    skills: ["Manual Testing", "SQL"],
    cgpa: 7.1,
    projects: 2,
    status: "Applied",
    resumeStatus: "Received",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-09-10",
  },
  {
    id: "cand-7",
    name: "Devansh Gupta",
    role: "Frontend Developer",
    skills: ["React", "JavaScript"],
    cgpa: 7.6,
    projects: 3,
    status: "Shortlisted",
    resumeStatus: "Reviewed",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-09-06",
  },
  {
    id: "cand-8",
    name: "Meera Iyer",
    role: "Business Analyst",
    skills: ["Communication", "Data Interpretation"],
    cgpa: 8.0,
    projects: 2,
    status: "Under Review",
    resumeStatus: "Flagged",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-09-01",
  },
  {
    id: "cand-9",
    name: "Aryan Kapoor",
    role: "Software Developer",
    skills: ["Java", "Data Structures & Algorithms"],
    cgpa: 7.8,
    projects: 2,
    status: "Interview Scheduled",
    resumeStatus: "Reviewed",
    interviewStatus: "Scheduled",
    appliedOn: "2026-09-04",
  },
  {
    id: "cand-10",
    name: "Tanvi Joshi",
    role: "Data Analyst",
    skills: ["SQL", "Data Interpretation"],
    cgpa: 6.9,
    projects: 1,
    status: "Applied",
    resumeStatus: "Received",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-09-11",
  },
  {
    id: "cand-11",
    name: "Yash Patel",
    role: "Backend Developer",
    skills: ["Node.js", "SQL"],
    cgpa: 7.0,
    projects: 2,
    status: "Rejected",
    resumeStatus: "Reviewed",
    interviewStatus: "Not Scheduled",
    appliedOn: "2026-08-27",
  },
  {
    id: "cand-12",
    name: "Diya Kulkarni",
    role: "QA Engineer",
    skills: ["Manual Testing", "Problem Solving"],
    cgpa: 7.4,
    projects: 1,
    status: "Selected",
    resumeStatus: "Reviewed",
    interviewStatus: "Completed",
    appliedOn: "2026-08-25",
  },
];

// Per-candidate application timeline, used in the details view. Keyed by
// candidate id so it's easy to look up.
export const candidateTimelines = {
  "cand-1": [
    { date: "2026-09-02", event: "Application submitted" },
    { date: "2026-09-04", event: "Resume reviewed" },
    { date: "2026-09-07", event: "Shortlisted for Software Developer" },
  ],
  "cand-2": [
    { date: "2026-09-03", event: "Application submitted" },
    { date: "2026-09-05", event: "Resume reviewed" },
    { date: "2026-09-08", event: "Shortlisted for Frontend Developer" },
    { date: "2026-09-12", event: "Technical interview scheduled" },
  ],
  "cand-4": [
    { date: "2026-08-28", event: "Application submitted" },
    { date: "2026-08-30", event: "Resume reviewed" },
    { date: "2026-09-02", event: "Shortlisted for Data Analyst" },
    { date: "2026-09-06", event: "Technical interview completed" },
    { date: "2026-09-09", event: "Marked as Selected" },
  ],
  "cand-9": [
    { date: "2026-09-04", event: "Application submitted" },
    { date: "2026-09-06", event: "Resume reviewed" },
    { date: "2026-09-09", event: "Shortlisted for Software Developer" },
    { date: "2026-09-13", event: "Technical interview scheduled" },
  ],
};

export function getCandidateTimeline(candidateId) {
  return (
    candidateTimelines[candidateId] ?? [
      { date: candidates.find((c) => c.id === candidateId)?.appliedOn ?? "—", event: "Application submitted" },
    ]
  );
}

// ---- Interview scheduling ----
export const interviewRounds = ["Technical Round", "HR Round", "Managerial Round", "Final Discussion"];
export const interviewModes = ["Online", "Offline", "Hybrid"];

export const initialInterviews = [
  {
    id: "int-1",
    candidateId: "cand-2",
    candidateName: "Ishita Sharma",
    role: "Frontend Developer",
    round: "Technical Round",
    date: "2026-09-20",
    time: "11:00",
    mode: "Online",
    interviewer: "Karthik Subramaniam",
  },
  {
    id: "int-2",
    candidateId: "cand-9",
    candidateName: "Aryan Kapoor",
    role: "Software Developer",
    round: "Technical Round",
    date: "2026-09-21",
    time: "14:30",
    mode: "Online",
    interviewer: "Neha Kulshreshtha",
  },
  {
    id: "int-3",
    candidateId: "cand-1",
    candidateName: "Rohan Mehta",
    role: "Software Developer",
    round: "HR Round",
    date: "2026-09-22",
    time: "10:00",
    mode: "Hybrid",
    interviewer: "Ananya Rao",
  },
];

// ---- Recruitment activity timeline ----
export const recruitmentActivity = [
  { id: "act-1", type: "application", text: "New application received from Tanvi Joshi for Data Analyst.", time: "2 hours ago" },
  { id: "act-2", type: "interview", text: "Technical interview scheduled with Ishita Sharma.", time: "5 hours ago" },
  { id: "act-3", type: "shortlist", text: "Devansh Gupta shortlisted for Frontend Developer.", time: "1 day ago" },
  { id: "act-4", type: "selected", text: "Diya Kulkarni marked as Selected for QA Engineer.", time: "1 day ago" },
  { id: "act-5", type: "job", text: "New job opening created: Business Analyst.", time: "2 days ago" },
  { id: "act-6", type: "status", text: "Karan Malhotra's application status updated to Rejected.", time: "3 days ago" },
];

// ---- Recruitment analytics (dummy) ----
export const applicationsByRole = [
  { role: "Software Developer", applications: 58 },
  { role: "Frontend Developer", applications: 47 },
  { role: "Backend Developer", applications: 36 },
  { role: "Data Analyst", applications: 41 },
  { role: "QA Engineer", applications: 19 },
  { role: "Business Analyst", applications: 13 },
];

export const statusDistribution = [
  { status: "Applied", count: 78 },
  { status: "Under Review", count: 34 },
  { status: "Shortlisted", count: 52 },
  { status: "Interview Scheduled", count: 18 },
  { status: "Selected", count: 11 },
  { status: "Rejected", count: 21 },
];

export const applicationsOverTime = [
  { week: "Week 1", applications: 28 },
  { week: "Week 2", applications: 41 },
  { week: "Week 3", applications: 35 },
  { week: "Week 4", applications: 52 },
  { week: "Week 5", applications: 58 },
];

export const hiringFunnel = [
  { stage: "Applied", count: 214 },
  { stage: "Shortlisted", count: 52 },
  { stage: "Interview Scheduled", count: 18 },
  { stage: "Selected", count: 11 },
];

export const selectedByRole = [
  { role: "Software Developer", selected: 3 },
  { role: "Frontend Developer", selected: 2 },
  { role: "Backend Developer", selected: 1 },
  { role: "Data Analyst", selected: 3 },
  { role: "QA Engineer", selected: 2 },
];
