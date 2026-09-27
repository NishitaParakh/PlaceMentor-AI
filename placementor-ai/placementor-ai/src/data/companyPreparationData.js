// Dummy data for the Company-Specific Preparation page (Phase 7).
//
// IMPORTANT: hiring stages, topics and focus areas below are simplified
// samples for demonstration — not verified, current company policy.
// getCompanyPreparationPlan() in src/services/api.js is the seam to
// replace once Pallavi's backend can supply a real, current plan.

// Shared across every company — the topic areas don't change by company,
// only the emphasis (see each company's `focus` field) does.
export const aptitudeTopics = [
  "Quantitative aptitude",
  "Logical reasoning",
  "Verbal ability",
  "Data interpretation",
  "Time management under timed tests",
];

export const technicalTopics = [
  "Programming fundamentals",
  "Data structures and algorithms",
  "Object-oriented programming",
  "DBMS",
  "SQL",
  "Operating systems",
  "Computer networks",
  "Software engineering basics",
];

export const hrTopics = [
  "Self-introduction",
  "Strengths and weaknesses",
  "Why should we hire you?",
  "Company-related questions",
  "Teamwork",
  "Leadership",
  "Conflict resolution",
  "Communication skills",
];

// One preparation profile per company: role, hiring stages, coding
// practice guidance and a preparation checklist. Keyed by the same id
// used in companyData.js so the two stay easy to cross-reference.
export const companyPreparationPlans = {
  tcs: {
    id: "tcs",
    name: "TCS",
    roles: ["Assistant System Engineer", "Digital Specialist Engineer"],
    softSkills: ["Communication", "Adaptability", "Teamwork"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "TCS NQT-style quantitative, reasoning and verbal sections." },
      { stage: "Technical Interview", detail: "Core CS fundamentals and basic coding questions." },
      { stage: "HR Interview", detail: "Background, communication and role fit." },
    ],
    codingPractice: {
      topics: ["Arrays", "Strings", "Basic recursion", "SQL queries"],
      difficulty: "Beginner to Intermediate",
      goal: "Solve 3–5 problems a day, focused on correctness over speed.",
      platforms: ["HackerRank", "GeeksforGeeks"],
    },
  },
  infosys: {
    id: "infosys",
    name: "Infosys",
    roles: ["Systems Engineer", "Digital Specialist Engineer"],
    softSkills: ["Communication", "Learnability", "Problem-solving mindset"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "Infosys InfyTQ-style quant, logical and pseudocode sections." },
      { stage: "Technical Interview", detail: "DBMS, OOP basics and a simple coding problem." },
      { stage: "HR Interview", detail: "Motivation, background and communication." },
    ],
    codingPractice: {
      topics: ["Arrays", "Strings", "Pseudocode logic", "DBMS queries"],
      difficulty: "Beginner to Intermediate",
      goal: "Practise pseudocode-style questions alongside regular DSA.",
      platforms: ["HackerRank", "GeeksforGeeks"],
    },
  },
  wipro: {
    id: "wipro",
    name: "Wipro",
    roles: ["Project Engineer"],
    softSkills: ["Communication", "Teamwork", "Willingness to learn"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "WILP-style quantitative and logical reasoning." },
      { stage: "Technical Interview", detail: "One core language plus basic OOP and DBMS." },
      { stage: "HR Interview", detail: "Background, communication and cultural fit." },
    ],
    codingPractice: {
      topics: ["Arrays", "Strings", "Basic OOP problems"],
      difficulty: "Beginner",
      goal: "Get comfortable with one language end to end rather than many shallowly.",
      platforms: ["HackerRank", "LeetCode"],
    },
  },
  accenture: {
    id: "accenture",
    name: "Accenture",
    roles: ["Associate Software Engineer"],
    softSkills: ["Communication", "Client-orientation", "Adaptability"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "Cognitive, technical MCQ and coding sections." },
      { stage: "Coding Assessment", detail: "One or two programming problems, beginner to intermediate." },
      { stage: "Technical + HR Interview", detail: "Combined round covering fundamentals and fit." },
    ],
    codingPractice: {
      topics: ["Arrays", "Strings", "SQL", "Basic OOP"],
      difficulty: "Beginner to Intermediate",
      goal: "Balance coding practice with mock HR rounds — communication is weighted heavily.",
      platforms: ["HackerRank", "GeeksforGeeks"],
    },
  },
  deloitte: {
    id: "deloitte",
    name: "Deloitte",
    roles: ["Analyst", "Consultant"],
    softSkills: ["Communication", "Analytical thinking", "Client-orientation"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "Quantitative, logical and case-style reasoning." },
      { stage: "Technical Interview", detail: "SQL, DBMS and structured problem-solving." },
      { stage: "HR / Case Interview", detail: "Case-style questions and strong communication." },
    ],
    codingPractice: {
      topics: ["SQL", "DBMS concepts", "Basic algorithms"],
      difficulty: "Intermediate",
      goal: "Prioritise SQL fluency and structured case-style reasoning over pure DSA volume.",
      platforms: ["GeeksforGeeks", "HackerRank"],
    },
  },
  capgemini: {
    id: "capgemini",
    name: "Capgemini",
    roles: ["Software Engineer", "Analyst"],
    softSkills: ["Communication", "Teamwork", "Group discussion skills"],
    interviewRounds: [
      { stage: "Aptitude / Screening Test", detail: "Quantitative, logical and pseudocode-based questions." },
      { stage: "Group Discussion", detail: "A current-affairs or technical topic, judged on clarity." },
      { stage: "Technical + HR Interview", detail: "Fundamentals plus background and fit." },
    ],
    codingPractice: {
      topics: ["Arrays", "Pseudocode logic", "Basic OOP"],
      difficulty: "Beginner to Intermediate",
      goal: "Practise structured, concise speaking for the group discussion round alongside coding.",
      platforms: ["HackerRank", "GeeksforGeeks"],
    },
  },
  cognizant: {
    id: "cognizant",
    name: "Cognizant",
    roles: ["Programmer Analyst"],
    softSkills: ["Communication", "Adaptability", "Teamwork"],
    interviewRounds: [
      { stage: "Automata / Coding Round", detail: "Timed coding round similar to TCS's automata pattern." },
      { stage: "Technical Interview", detail: "SQL, OOP and core programming fundamentals." },
      { stage: "HR Interview", detail: "Background, motivation and communication." },
    ],
    codingPractice: {
      topics: ["Arrays", "Strings", "SQL", "Basic algorithms"],
      difficulty: "Beginner to Intermediate",
      goal: "Time yourself on coding rounds — the automata-style test rewards speed.",
      platforms: ["HackerRank", "LeetCode"],
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    roles: ["Software Engineer"],
    softSkills: ["Structured communication", "Ownership", "Collaboration"],
    interviewRounds: [
      { stage: "Online Coding Assessment", detail: "2–3 DSA problems, intermediate to advanced difficulty." },
      { stage: "Technical Interview (multiple rounds)", detail: "DSA, system design basics and project deep-dives." },
      { stage: "HR / Culture-fit Interview", detail: "Behavioral questions and role motivation." },
    ],
    codingPractice: {
      topics: ["Trees & graphs", "Dynamic programming", "System design basics", "OOP design"],
      difficulty: "Intermediate to Advanced",
      goal: "Solve medium-to-hard DSA problems daily and be ready to explain your projects in depth.",
      platforms: ["LeetCode", "Codeforces"],
    },
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    roles: ["SDE-1"],
    softSkills: ["Ownership", "Bias for action", "Clear communication"],
    interviewRounds: [
      { stage: "Online Coding Assessment", detail: "2 DSA problems plus a work-style simulation." },
      { stage: "Technical Interviews (multiple rounds)", detail: "DSA, low-level design and leadership-principle questions." },
      { stage: "Bar Raiser / HR Round", detail: "Behavioral questions mapped to Amazon's leadership principles." },
    ],
    codingPractice: {
      topics: ["Arrays & strings", "Trees & graphs", "Dynamic programming", "OOP design"],
      difficulty: "Intermediate to Advanced",
      goal: "Pair DSA practice with STAR-format behavioral stories for the leadership-principle round.",
      platforms: ["LeetCode", "HackerRank"],
    },
  },
  google: {
    id: "google",
    name: "Google",
    roles: ["Software Engineer"],
    softSkills: ["Structured thinking", "Collaboration", "Googleyness (culture fit)"],
    interviewRounds: [
      { stage: "Online Coding Assessment", detail: "DSA problems under time pressure." },
      { stage: "Technical Interviews (multiple rounds)", detail: "DSA, system design and coding-on-whiteboard style rounds." },
      { stage: "Googleyness / Behavioral Interview", detail: "Collaboration, ambiguity handling and culture fit." },
    ],
    codingPractice: {
      topics: ["Advanced DSA", "System design", "Graph algorithms", "Dynamic programming"],
      difficulty: "Advanced",
      goal: "Practise explaining your approach out loud, not just arriving at the answer.",
      platforms: ["LeetCode", "Codeforces"],
    },
  },
};

// Default checklist shown regardless of the selected company — the same
// eight tasks apply broadly to placement prep. `id` is stable so React
// state can track completion independent of ordering.
export const defaultChecklist = [
  { id: "c1", task: "Revise programming basics." },
  { id: "c2", task: "Practice arrays and strings." },
  { id: "c3", task: "Revise SQL queries." },
  { id: "c4", task: "Prepare your project explanation." },
  { id: "c5", task: "Practice your self-introduction." },
  { id: "c6", task: "Complete at least one mock interview." },
  { id: "c7", task: "Update your resume." },
  { id: "c8", task: "Review company-related information." },
];
