// Dummy data for the AI Placement Readiness card and the Readiness
// Breakdown section. The raw percentages live on studentData.readinessBreakdown;
// this file just adds the display label + short description for each category,
// plus the AI-generated-sounding insight text (all sample content).

export const readinessCategories = [
  { key: "technical", label: "Technical Skills" },
  { key: "coding", label: "Coding" },
  { key: "aptitude", label: "Aptitude" },
  { key: "communication", label: "Communication" },
  { key: "resume", label: "Resume" },
  { key: "interview", label: "Interview" },
];

export const readinessInsight = {
  text: "Your technical and coding skills are strong. Focus on interview communication and system design to improve your overall readiness.",
  lastUpdated: "Today",
};

export const careerInsight = {
  text: "You're strongest in Python, React and problem solving. Your biggest improvement opportunity is interview preparation. Completing the recommended interview roadmap could significantly improve your overall readiness score.",
};
