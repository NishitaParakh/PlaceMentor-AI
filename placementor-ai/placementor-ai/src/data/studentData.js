// Dummy student profile — stands in for Pallavi's backend response for
// GET /student/dashboard. See src/services/api.js for the mock function
// that returns this, and README.md for how a real API call will replace it.

const studentData = {
  name: "Priyanshi Verma",
  branch: "Computer Science & Engineering",
  year: "3rd Year",
  cgpa: 8.4,

  placementSeason: "2026-27",
  preparationStatus: "Actively Preparing",

  readinessScore: 82,
  placementProbability: 78,

  skillsMatched: 14,
  totalSkills: 18,

  applications: 6,
  activeApplications: 2,

  interviews: 3,
  upcomingInterviews: 1,

  profileCompletion: 92,
  missingProfileItems: ["LinkedIn profile", "GitHub profile", "Resume"],

  readinessBreakdown: {
    technical: 86,
    coding: 84,
    aptitude: 78,
    communication: 81,
    resume: 79,
    interview: 75,
  },
};

export default studentData;
