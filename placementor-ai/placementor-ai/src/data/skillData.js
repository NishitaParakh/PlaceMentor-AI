// Dummy skill inventory behind the Skill Gap Analysis page.
// current/target are 0-100. Status and gap are derived (see
// src/pages/SkillGap.jsx / helpers below) rather than stored, so the
// numbers here are the only thing a real backend would need to send.

const skillData = [
  // ---- Technical Skills ----
  { id: 1, name: "Python", category: "Technical", current: 86, target: 90, priority: "Low" },
  { id: 2, name: "Java", category: "Technical", current: 70, target: 80, priority: "Medium" },
  { id: 3, name: "C++", category: "Technical", current: 58, target: 75, priority: "Medium" },
  { id: 4, name: "SQL", category: "Technical", current: 72, target: 85, priority: "Medium" },
  { id: 5, name: "React", category: "Technical", current: 84, target: 88, priority: "Low" },
  { id: 6, name: "HTML/CSS", category: "Technical", current: 90, target: 85, priority: "Low" },
  { id: 7, name: "Git", category: "Technical", current: 80, target: 80, priority: "Low" },

  // ---- Core CS ----
  { id: 8, name: "Data Structures & Algorithms", category: "Core CS", current: 55, target: 85, priority: "High" },
  { id: 9, name: "DBMS", category: "Core CS", current: 68, target: 80, priority: "Medium" },
  { id: 10, name: "Operating Systems", category: "Core CS", current: 65, target: 78, priority: "Medium" },
  { id: 11, name: "Computer Networks", category: "Core CS", current: 60, target: 75, priority: "Medium" },
  { id: 12, name: "OOP", category: "Core CS", current: 82, target: 85, priority: "Low" },
  { id: 13, name: "System Design", category: "Core CS", current: 42, target: 75, priority: "High" },

  // ---- Aptitude ----
  { id: 14, name: "Quantitative Aptitude", category: "Aptitude", current: 70, target: 82, priority: "Medium" },
  { id: 15, name: "Logical Reasoning", category: "Aptitude", current: 75, target: 82, priority: "Low" },
  { id: 16, name: "Verbal Ability", category: "Aptitude", current: 66, target: 78, priority: "Medium" },

  // ---- Soft Skills ----
  { id: 17, name: "Communication", category: "Soft Skills", current: 61, target: 80, priority: "High" },
  { id: 18, name: "Interview Skills", category: "Soft Skills", current: 58, target: 78, priority: "High" },
  { id: 19, name: "Presentation", category: "Soft Skills", current: 72, target: 80, priority: "Low" },
  { id: 20, name: "Problem Solving", category: "Soft Skills", current: 82, target: 85, priority: "Low" },
];

export default skillData;

export const skillCategories = ["All", "Technical", "Core CS", "Aptitude", "Soft Skills"];

// Sample summary numbers for the "Overall Skill Readiness" card — demo
// values, not a computed average of the list above.
export const skillSummary = {
  current: 74,
  target: 82,
  gap: 8,
  status: "Good Progress",
  insight:
    "Your strongest areas are Python, React and SQL. Your biggest improvement opportunities are DSA, System Design and Communication.",
};

// Curated "AI Recommended Focus Areas" — sample recommendation content.
export const recommendedFocus = [
  { skill: "Data Structures & Algorithms", gap: 30, hoursPerWeek: 8 },
  { skill: "System Design", gap: 33, hoursPerWeek: 5 },
  { skill: "Communication", gap: 19, hoursPerWeek: 3 },
];
