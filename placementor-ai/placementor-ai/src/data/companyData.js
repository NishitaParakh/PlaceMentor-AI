// Dummy data for the Company Eligibility Checker (Phase 7).
//
// IMPORTANT: these are sample companies with simplified, made-up
// requirements for demonstration only — not real hiring criteria, and
// no company's actual policy. checkEligibility() below runs simple rule
// comparisons locally; nothing here calls a real backend, database or
// AI model. When Pallavi's backend is ready, checkCompanyEligibility()
// in src/services/api.js is the seam to replace.

export const branchOptions = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
];

export const graduationYearOptions = [2026, 2027, 2028];

export const skillOptions = [
  "Data Structures & Algorithms",
  "Java",
  "Python",
  "C++",
  "React",
  "SQL",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "Cloud Basics",
  "Problem Solving",
];

// Each company entry carries one sample role with simplified requirements.
// `minCgpa`/`maxBacklogs` are inclusive bounds; `graduationYears` is the
// set of years the sample rule accepts.
export const companies = [
  {
    id: "tcs",
    name: "TCS",
    role: "Assistant System Engineer",
    type: "Service-based",
    minCgpa: 6.0,
    branches: "all",
    maxBacklogs: 1,
    graduationYears: [2026, 2027],
    requiredSkills: ["Problem Solving", "SQL"],
    experienceRequired: false,
    focus: "Aptitude, verbal ability and basic programming fundamentals.",
  },
  {
    id: "infosys",
    name: "Infosys",
    role: "Systems Engineer",
    type: "Service-based",
    minCgpa: 6.5,
    branches: "all",
    maxBacklogs: 1,
    graduationYears: [2026, 2027],
    requiredSkills: ["Problem Solving", "DBMS"],
    experienceRequired: false,
    focus: "Pseudocode, logical reasoning and quantitative aptitude.",
  },
  {
    id: "wipro",
    name: "Wipro",
    role: "Project Engineer",
    type: "Service-based",
    minCgpa: 6.0,
    branches: "all",
    maxBacklogs: 2,
    graduationYears: [2026, 2027],
    requiredSkills: ["Problem Solving"],
    experienceRequired: false,
    focus: "Aptitude, communication and one core programming language.",
  },
  {
    id: "accenture",
    name: "Accenture",
    role: "Associate Software Engineer",
    type: "Service-based",
    minCgpa: 6.5,
    branches: "all",
    maxBacklogs: 1,
    graduationYears: [2026, 2027],
    requiredSkills: ["SQL", "Problem Solving"],
    experienceRequired: false,
    focus: "Aptitude, communication and a technical + HR interview round.",
  },
  {
    id: "deloitte",
    name: "Deloitte",
    role: "Analyst",
    type: "Consulting",
    minCgpa: 7.0,
    branches: "all",
    maxBacklogs: 0,
    graduationYears: [2026, 2027],
    requiredSkills: ["SQL", "Problem Solving", "DBMS"],
    experienceRequired: false,
    focus: "Case-style reasoning, SQL and strong communication skills.",
  },
  {
    id: "capgemini",
    name: "Capgemini",
    role: "Software Engineer",
    type: "Service-based",
    minCgpa: 6.0,
    branches: "all",
    maxBacklogs: 2,
    graduationYears: [2026, 2027],
    requiredSkills: ["Problem Solving"],
    experienceRequired: false,
    focus: "Pseudocode, aptitude and a group discussion round.",
  },
  {
    id: "cognizant",
    name: "Cognizant",
    role: "Programmer Analyst",
    type: "Service-based",
    minCgpa: 6.0,
    branches: "all",
    maxBacklogs: 1,
    graduationYears: [2026, 2027],
    requiredSkills: ["Problem Solving", "SQL"],
    experienceRequired: false,
    focus: "Automata-style coding round plus aptitude.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    role: "Software Engineer",
    type: "Product-based",
    minCgpa: 8.0,
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    maxBacklogs: 0,
    graduationYears: [2026, 2027],
    requiredSkills: ["Data Structures & Algorithms", "System Design", "Problem Solving"],
    experienceRequired: true,
    focus: "Strong DSA, system design fundamentals and a project you can defend in depth.",
  },
  {
    id: "amazon",
    name: "Amazon",
    role: "SDE-1",
    type: "Product-based",
    minCgpa: 7.5,
    branches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
    maxBacklogs: 0,
    graduationYears: [2026, 2027],
    requiredSkills: ["Data Structures & Algorithms", "Problem Solving", "Operating Systems"],
    experienceRequired: true,
    focus: "DSA rounds plus Amazon's leadership-principle style behavioral questions.",
  },
  {
    id: "google",
    name: "Google",
    role: "Software Engineer",
    type: "Product-based",
    minCgpa: 8.5,
    branches: ["Computer Science & Engineering", "Information Technology"],
    maxBacklogs: 0,
    graduationYears: [2026, 2027],
    requiredSkills: ["Data Structures & Algorithms", "System Design", "Computer Networks", "Problem Solving"],
    experienceRequired: true,
    focus: "Deep DSA, system design and strong fundamentals across core CS subjects.",
  },
];

/**
 * Runs the sample eligibility rules for one student profile against one
 * company. Deliberately simple, transparent comparisons — NOT a real
 * eligibility engine — which is why every result in the UI is labelled a
 * prototype.
 *
 * `profile` shape: { cgpa, branch, graduationYear, backlogs, skills,
 * hasExperience, preferredRole }
 *
 * Returns { eligible, satisfied[], unsatisfied[], missingSkills[] } where
 * satisfied/unsatisfied are { label, detail } describing each rule checked.
 */
export function checkEligibility(profile, company) {
  const satisfied = [];
  const unsatisfied = [];

  // CGPA
  if (profile.cgpa >= company.minCgpa) {
    satisfied.push({ label: "CGPA", detail: `${profile.cgpa} meets the ${company.minCgpa}+ requirement.` });
  } else {
    unsatisfied.push({
      label: "CGPA",
      detail: `${profile.cgpa} is below the sample requirement of ${company.minCgpa}.`,
    });
  }

  // Branch
  const branchOk = company.branches === "all" || company.branches.includes(profile.branch);
  if (branchOk) {
    satisfied.push({ label: "Branch", detail: `${profile.branch} is an eligible branch for this role.` });
  } else {
    unsatisfied.push({
      label: "Branch",
      detail: `${profile.branch} is not in the sample eligible branch list for this role.`,
    });
  }

  // Backlogs
  if (profile.backlogs <= company.maxBacklogs) {
    satisfied.push({
      label: "Backlogs",
      detail: `${profile.backlogs} is within the allowed maximum of ${company.maxBacklogs}.`,
    });
  } else {
    unsatisfied.push({
      label: "Backlogs",
      detail: `${profile.backlogs} exceeds the sample maximum of ${company.maxBacklogs}.`,
    });
  }

  // Graduation year
  if (company.graduationYears.includes(profile.graduationYear)) {
    satisfied.push({ label: "Graduation Year", detail: `${profile.graduationYear} matches the hiring window.` });
  } else {
    unsatisfied.push({
      label: "Graduation Year",
      detail: `${profile.graduationYear} is outside the sample hiring window (${company.graduationYears.join(", ")}).`,
    });
  }

  // Experience
  if (company.experienceRequired && !profile.hasExperience) {
    unsatisfied.push({
      label: "Experience",
      detail: "This role's sample criteria expects prior internship or project experience.",
    });
  } else {
    satisfied.push({
      label: "Experience",
      detail: company.experienceRequired
        ? "Internship or project experience is on file."
        : "No prior experience required for this role.",
    });
  }

  // Skills
  const missingSkills = company.requiredSkills.filter((s) => !profile.skills.includes(s));
  if (missingSkills.length === 0) {
    satisfied.push({ label: "Required Skills", detail: "All sample required skills are present." });
  } else {
    unsatisfied.push({
      label: "Required Skills",
      detail: `Missing: ${missingSkills.join(", ")}.`,
    });
  }

  const eligible = unsatisfied.length === 0;

  return { eligible, satisfied, unsatisfied, missingSkills };
}

/**
 * Turns an eligibility result into a short list of next steps. Kept
 * separate from checkEligibility() so the UI can call it independently
 * once a real backend supplies the eligibility result instead.
 */
export function getEligibilitySuggestions(result, company) {
  const steps = [];

  if (result.missingSkills.length > 0) {
    steps.push(`Build up ${result.missingSkills.join(", ")} — these are the sample required skills you're missing.`);
  }
  if (result.unsatisfied.some((r) => r.label === "CGPA")) {
    steps.push("Focus on raising your CGPA in the next semester where possible.");
  }
  if (result.unsatisfied.some((r) => r.label === "Backlogs")) {
    steps.push("Prioritise clearing pending backlogs before this hiring window opens.");
  }
  if (result.unsatisfied.some((r) => r.label === "Experience")) {
    steps.push("Take on an internship or a substantial personal project to build demonstrable experience.");
  }
  if (result.eligible) {
    steps.push(`Focus your prep on: ${company.focus}`);
    steps.push("Check the Company-Specific Preparation page for a full plan for this company.");
  }
  if (steps.length === 0) {
    steps.push("Review the unsatisfied criteria above and revisit this check closer to the hiring window.");
  }

  return steps;
}
