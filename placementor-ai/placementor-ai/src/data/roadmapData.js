// Dummy data behind the Personalized Learning Roadmap page.
// All numbers are sample/demo content — see the "Demo AI Analysis" tags
// wherever this is shown in the UI.

const roadmapData = [
  {
    id: 1,
    week: 1,
    title: "Python & OOP",
    description: "Refresh core Python syntax and object-oriented fundamentals before moving into DSA.",
    status: "completed",
    progress: 100,
    duration: "6 hours",
    difficulty: "Easy",
    skills: ["Python", "OOP"],
    tasks: [
      { title: "Python fundamentals refresher", completed: true },
      { title: "Classes, objects and inheritance", completed: true },
      { title: "Build a small OOP mini-project", completed: true },
    ],
  },
  {
    id: 2,
    week: 2,
    title: "Arrays & Strings",
    description: "Build pattern recognition for the most common interview question type.",
    status: "completed",
    progress: 100,
    duration: "6 hours",
    difficulty: "Easy",
    skills: ["DSA", "Problem Solving"],
    tasks: [
      { title: "Two-pointer and sliding-window patterns", completed: true },
      { title: "Solve 15 array/string problems", completed: true },
      { title: "Take topic assessment", completed: true },
    ],
  },
  {
    id: 3,
    week: 3,
    title: "Linked Lists",
    description: "Cover singly/doubly linked lists and the manipulation patterns interviewers favor.",
    status: "in-progress",
    progress: 65,
    duration: "5 hours",
    difficulty: "Medium",
    skills: ["DSA", "Problem Solving"],
    tasks: [
      { title: "Learn linked list basics", completed: true },
      { title: "Implement insertion/deletion", completed: true },
      { title: "Solve 10 practice problems", completed: false },
      { title: "Take topic assessment", completed: false },
    ],
  },
  {
    id: 4,
    week: 4,
    title: "Trees & Graphs",
    description: "Traversals, BSTs and graph search — the backbone of most DSA interview rounds.",
    status: "upcoming",
    progress: 0,
    duration: "7 hours",
    difficulty: "Medium",
    skills: ["DSA"],
    tasks: [
      { title: "Tree traversals (in/pre/post-order)", completed: false },
      { title: "BST insert/search/delete", completed: false },
      { title: "BFS and DFS on graphs", completed: false },
      { title: "Solve 12 practice problems", completed: false },
    ],
  },
  {
    id: 5,
    week: 5,
    title: "Dynamic Programming",
    description: "The topic students find hardest — build intuition with a structured problem set.",
    status: "upcoming",
    progress: 0,
    duration: "8 hours",
    difficulty: "Hard",
    skills: ["DSA", "Problem Solving"],
    tasks: [
      { title: "Memoization vs tabulation", completed: false },
      { title: "Classic DP patterns (knapsack, LIS)", completed: false },
      { title: "Solve 10 practice problems", completed: false },
    ],
  },
  {
    id: 6,
    week: 6,
    title: "DBMS + SQL",
    description: "Normalization, transactions, indexing and hands-on query writing.",
    status: "upcoming",
    progress: 0,
    duration: "6 hours",
    difficulty: "Medium",
    skills: ["DBMS", "SQL"],
    tasks: [
      { title: "Normalization and ER modeling", completed: false },
      { title: "Joins, subqueries and indexing", completed: false },
      { title: "Timed SQL query practice set", completed: false },
    ],
  },
  {
    id: 7,
    week: 7,
    title: "System Design",
    description: "Fundamentals of scalable design — the area with your largest current skill gap.",
    status: "upcoming",
    progress: 0,
    duration: "7 hours",
    difficulty: "Hard",
    skills: ["System Design"],
    tasks: [
      { title: "Scalability and load balancing basics", completed: false },
      { title: "Caching, sharding and databases at scale", completed: false },
      { title: "Design one system end-to-end (mock)", completed: false },
    ],
  },
  {
    id: 8,
    week: 8,
    title: "Mock Interviews",
    description: "Bring everything together across technical, HR and behavioral rounds.",
    status: "upcoming",
    progress: 0,
    duration: "5 hours",
    difficulty: "Medium",
    skills: ["Interview Skills", "Communication"],
    tasks: [
      { title: "2 technical mock interviews", completed: false },
      { title: "1 HR/behavioral mock interview", completed: false },
      { title: "Review feedback and iterate", completed: false },
    ],
  },
];

export default roadmapData;

// Summary numbers for the roadmap overview card — demo values.
export const roadmapSummary = {
  goal: "Software Engineer",
  target: "Product-based companies",
  currentReadiness: 82,
  progress: 46,
  estimatedWeeks: 8,
  completedCount: 2,
  inProgressCount: 1,
  upcomingCount: 5,
};

export const roadmapInsight = {
  text: "You're progressing well in programming fundamentals. Your biggest placement risk is currently DSA and system design. We recommend spending the next two weeks strengthening these areas before starting advanced interview preparation.",
  reasons: [
    "Your current skill levels across DSA and System Design",
    "The target skill levels required for your selected goal",
    "Your selected placement goal and target company",
    "Your overall AI placement readiness score",
  ],
};

// "Recommended Learning" cards — separate from skillData's recommendedFocus
// since these track in-progress hours/continue state for this page.
export const recommendedLearning = [
  { id: 1, skill: "Data Structures & Algorithms", hoursPerWeek: 8, priority: "High", progress: 40 },
  { id: 2, skill: "SQL & DBMS", hoursPerWeek: 4, priority: "Medium", progress: 20 },
  { id: 3, skill: "System Design", hoursPerWeek: 5, priority: "High", progress: 10 },
  { id: 4, skill: "Communication", hoursPerWeek: 3, priority: "Medium", progress: 25 },
];

export const careerGoals = [
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Frontend Developer",
  "Backend Developer",
  "ML Engineer",
  "Product Manager",
];

export const targetCompanies = [
  "General Placement",
  "TCS",
  "Infosys",
  "Accenture",
  "Deloitte",
  "Amazon",
  "Microsoft",
  "Google",
];
