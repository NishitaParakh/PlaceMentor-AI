// Dummy data for the GitHub & Coding Platforms page (Phase 6).
//
// IMPORTANT: none of these numbers come from a real account. Nothing here
// calls GitHub, LeetCode or any other platform API — the stats below are
// hand-written samples so the UI can be demonstrated. When Pallavi's
// backend adds real profile syncing, getCodingPlatformData() and
// getCodingProgress() in src/services/api.js are the seams to replace.

export const platforms = [
  {
    id: "github",
    name: "GitHub",
    icon: "Github",
    tagline: "Code hosting and collaboration",
    description:
      "Where your code actually lives. For placements it doubles as your portfolio — recruiters frequently open a candidate's GitHub before the interview.",
    purpose: "Version control, project hosting and collaboration",
    skills: [
      "Repository management",
      "Version control with Git",
      "Project portfolio",
      "Team collaboration",
      "Open-source contribution",
    ],
    sampleStats: [
      { label: "Repositories", value: "14" },
      { label: "Contributions", value: "312" },
      { label: "Stars earned", value: "27" },
    ],
    recommendation:
      "Pin your three strongest projects and give each a clear README. A tidy profile matters more than a high repo count.",
    url: "https://github.com",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "Code2",
    tagline: "Interview-focused problem solving",
    description:
      "The closest match to what most product companies actually ask in technical rounds. Best used alongside a structured topic order rather than random problems.",
    purpose: "DSA practice and interview preparation",
    skills: [
      "Data structures and algorithms",
      "Problem-solving patterns",
      "Interview preparation",
      "Complexity analysis",
    ],
    sampleStats: [
      { label: "Problems solved", value: "186" },
      { label: "Easy / Medium / Hard", value: "94 / 76 / 16" },
      { label: "Current streak", value: "12 days" },
    ],
    recommendation:
      "Work topic by topic instead of by difficulty, and re-solve anything you got wrong after three or four days.",
    url: "https://leetcode.com",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    icon: "Terminal",
    tagline: "Practice and skill certifications",
    description:
      "Beginner-friendly progressions plus skill certificates. Many service-based companies run their online assessments on this platform, so the interface is worth knowing.",
    purpose: "Guided practice and technical assessments",
    skills: [
      "Programming fundamentals",
      "Skill certifications",
      "Beginner-friendly challenges",
      "Technical assessments",
    ],
    sampleStats: [
      { label: "Problems solved", value: "142" },
      { label: "Certifications", value: "3" },
      { label: "Badges", value: "9" },
    ],
    recommendation:
      "Clear the Problem Solving and SQL certifications — they're quick wins you can list directly on your resume.",
    url: "https://www.hackerrank.com",
  },
  {
    id: "codechef",
    name: "CodeChef",
    icon: "Trophy",
    tagline: "Contests and competitive programming",
    description:
      "Regular rated contests with a strong Indian college community. Useful for building speed and accuracy under time pressure.",
    purpose: "Competitive programming and contests",
    skills: [
      "Competitive programming",
      "Timed contests",
      "Algorithmic thinking",
      "Speed and accuracy",
    ],
    sampleStats: [
      { label: "Rating", value: "1642" },
      { label: "Contests played", value: "18" },
      { label: "Problems solved", value: "96" },
    ],
    recommendation:
      "Enter the Starters contest most weeks. Consistent participation moves your rating more than occasional long sessions.",
    url: "https://www.codechef.com",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    icon: "Zap",
    tagline: "Advanced rated competition",
    description:
      "The most demanding of the contest platforms. Worth adding once your fundamentals are solid — it sharpens problem-solving well beyond typical interview difficulty.",
    purpose: "Advanced competitive programming",
    skills: [
      "Rated contests",
      "Advanced problem-solving",
      "Time-bound thinking",
      "Mathematical reasoning",
    ],
    sampleStats: [
      { label: "Rating", value: "1284" },
      { label: "Contests played", value: "11" },
      { label: "Problems solved", value: "63" },
    ],
    recommendation:
      "Upsolve after every contest — reading editorials for problems you couldn't finish is where most of the learning happens.",
    url: "https://codeforces.com",
  },
  {
    id: "geeksforgeeks",
    name: "GeeksforGeeks",
    icon: "BookOpen",
    tagline: "Tutorials and interview prep",
    description:
      "Strong reference material for core CS subjects and company-wise interview archives. Best used to learn a concept before practising it elsewhere.",
    purpose: "Learning resources and interview preparation",
    skills: [
      "Programming tutorials",
      "Core CS concepts",
      "Interview preparation",
      "Practice problems",
    ],
    sampleStats: [
      { label: "Problems solved", value: "118" },
      { label: "Articles read", value: "240+" },
      { label: "Coding score", value: "410" },
    ],
    recommendation:
      "Use the company-wise archives to see the kind of questions your target recruiters have historically asked.",
    url: "https://www.geeksforgeeks.org",
  },
];

// Headline numbers for the coding progress dashboard.
export const codingProgress = {
  problemsSolved: 542,
  codingStreak: 12,
  currentLevel: "Intermediate",
  topicsPracticed: 7,
  totalTopics: 9,
  suggestedNextTopic: "Dynamic Programming",
};

// Per-topic mastery, rendered as progress bars.
export const topicProgress = [
  { topic: "Arrays", solved: 96, total: 110, progress: 87 },
  { topic: "Strings", solved: 71, total: 90, progress: 79 },
  { topic: "Linked Lists", solved: 48, total: 65, progress: 74 },
  { topic: "Stacks and Queues", solved: 42, total: 60, progress: 70 },
  { topic: "Trees", solved: 58, total: 95, progress: 61 },
  { topic: "Graphs", solved: 31, total: 80, progress: 39 },
  { topic: "Dynamic Programming", solved: 22, total: 85, progress: 26 },
  { topic: "SQL", solved: 54, total: 70, progress: 77 },
  { topic: "Object-Oriented Programming", solved: 38, total: 55, progress: 69 },
];

// Last seven days of activity, used for the small bar strip.
export const weeklyActivity = [
  { day: "Mon", problems: 4 },
  { day: "Tue", problems: 7 },
  { day: "Wed", problems: 3 },
  { day: "Thu", problems: 8 },
  { day: "Fri", problems: 5 },
  { day: "Sat", problems: 11 },
  { day: "Sun", problems: 6 },
];

// Eight-stage preparation path. `status` is one of
// "completed" | "in-progress" | "upcoming".
export const codingRoadmap = [
  {
    id: 1,
    stage: "Programming Basics",
    status: "completed",
    progress: 100,
    description: "Syntax, control flow, functions and complexity basics.",
    topics: ["Variables & types", "Loops", "Functions", "Time complexity"],
  },
  {
    id: 2,
    stage: "Arrays and Strings",
    status: "completed",
    progress: 100,
    description: "The foundation most interview questions build on.",
    topics: ["Two pointers", "Sliding window", "Prefix sums", "String manipulation"],
  },
  {
    id: 3,
    stage: "Searching and Sorting",
    status: "completed",
    progress: 100,
    description: "Core techniques plus when each sorting approach applies.",
    topics: ["Binary search", "Merge sort", "Quick sort", "Custom comparators"],
  },
  {
    id: 4,
    stage: "Linked Lists, Stacks and Queues",
    status: "in-progress",
    progress: 72,
    description: "Pointer manipulation and the structures built on it.",
    topics: ["Reversal", "Cycle detection", "Monotonic stack", "Deque problems"],
  },
  {
    id: 5,
    stage: "Trees and Graphs",
    status: "in-progress",
    progress: 45,
    description: "Traversals and the algorithms that run on them.",
    topics: ["DFS & BFS", "Binary search trees", "Shortest paths", "Topological sort"],
  },
  {
    id: 6,
    stage: "Dynamic Programming",
    status: "upcoming",
    progress: 26,
    description: "Recognising overlapping subproblems and building up solutions.",
    topics: ["Memoization", "Tabulation", "Knapsack", "LIS and LCS"],
  },
  {
    id: 7,
    stage: "SQL and Database Practice",
    status: "upcoming",
    progress: 0,
    description: "Query writing for data-facing roles and online assessments.",
    topics: ["Joins", "Aggregations", "Subqueries", "Window functions"],
  },
  {
    id: 8,
    stage: "Mock Coding Interviews",
    status: "upcoming",
    progress: 0,
    description: "Practising under real interview conditions and time pressure.",
    topics: ["Timed rounds", "Thinking aloud", "Edge cases", "Follow-up questions"],
  },
];

export default platforms;
