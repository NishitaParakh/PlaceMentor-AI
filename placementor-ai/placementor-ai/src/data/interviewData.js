// Dummy data for the AI Mock Interview (Phase 5).
//
// IMPORTANT: no real AI evaluates anything here. evaluateAnswer() below
// scores an answer with simple, transparent heuristics (length + whether
// expected keywords appear), which is why every score in the UI is
// labelled "Demo Evaluation". When Tanishqa's ML scoring and Pallavi's
// backend are ready, evaluateAnswer() and getInterviewQuestions() are the
// two functions to replace — see src/services/api.js.

export const interviewTypes = [
  { value: "Technical", label: "Technical Interview" },
  { value: "HR", label: "HR Interview" },
  { value: "Behavioral", label: "Behavioral Interview" },
  { value: "Mixed", label: "Mixed Interview" },
];

export const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

export const jobRoles = [
  "Software Developer",
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer",
  "QA Engineer",
];

// Each question carries its own model answer, tips and the keywords the
// demo evaluator looks for. `roles: "all"` means it applies to every role.
export const questionBank = [
  // ---------------- Technical — Beginner ----------------
  {
    id: "t-b-1",
    type: "Technical",
    difficulty: "Beginner",
    roles: "all",
    question: "What is the difference between a stack and a queue?",
    keywords: ["lifo", "fifo", "push", "pop", "enqueue", "dequeue", "last", "first"],
    modelAnswer:
      "A stack is LIFO — the last element pushed is the first one popped, like a stack of plates. A queue is FIFO — the first element enqueued is the first dequeued, like a line at a counter. Stacks suit undo operations and recursion; queues suit scheduling and buffering.",
    tips: [
      "Name the access order explicitly (LIFO vs FIFO).",
      "Give one real use case for each.",
    ],
  },
  {
    id: "t-b-2",
    type: "Technical",
    difficulty: "Beginner",
    roles: "all",
    question: "Explain object-oriented programming in your own words.",
    keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object"],
    modelAnswer:
      "OOP organises code around objects that bundle data with the behaviour that acts on it. Its four pillars are encapsulation (hiding internal state), inheritance (reusing a base class), polymorphism (one interface, many implementations) and abstraction (exposing only what matters).",
    tips: [
      "Name all four pillars, then expand on one.",
      "A short code or real-world analogy lands well here.",
    ],
  },
  {
    id: "t-b-3",
    type: "Technical",
    difficulty: "Beginner",
    roles: "all",
    question: "What is the time complexity of binary search, and why?",
    keywords: ["log n", "logarithmic", "half", "sorted", "divide"],
    modelAnswer:
      "Binary search runs in O(log n). Each comparison discards half the remaining search space, so the number of steps grows logarithmically with input size. It requires the array to be sorted first.",
    tips: [
      "State the complexity and the reason behind it.",
      "Mention the sorted-input precondition — candidates often forget it.",
    ],
  },

  // ---------------- Technical — Intermediate ----------------
  {
    id: "t-i-1",
    type: "Technical",
    difficulty: "Intermediate",
    roles: ["Software Developer", "Backend Developer", "Data Analyst"],
    question: "What is the difference between SQL and NoSQL databases?",
    keywords: ["schema", "relational", "scale", "acid", "document", "structured", "flexible"],
    modelAnswer:
      "SQL databases are relational with a fixed schema and strong ACID guarantees, which suits structured data and complex joins. NoSQL databases use flexible schemas (document, key-value, graph) and scale horizontally more easily, which suits large volumes of semi-structured data where write throughput matters more than joins.",
    tips: [
      "Contrast schema, scaling model and consistency guarantees.",
      "Say when you would choose each rather than declaring one 'better'.",
    ],
  },
  {
    id: "t-i-2",
    type: "Technical",
    difficulty: "Intermediate",
    roles: ["Software Developer", "Backend Developer"],
    question: "Explain the concept of inheritance and when you would avoid it.",
    keywords: ["parent", "child", "base", "derived", "reuse", "composition", "override"],
    modelAnswer:
      "Inheritance lets a derived class reuse and extend a base class's behaviour, modelling an 'is-a' relationship. It's worth avoiding when the relationship is really 'has-a', or when deep hierarchies make behaviour hard to trace — composition is usually the safer default.",
    tips: [
      "Mention method overriding as the extension mechanism.",
      "Showing you know composition-over-inheritance signals maturity.",
    ],
  },
  {
    id: "t-i-3",
    type: "Technical",
    difficulty: "Intermediate",
    roles: ["Frontend Developer", "Software Developer"],
    question: "What is the virtual DOM and why does it help performance?",
    keywords: ["diff", "reconciliation", "render", "batch", "real dom", "tree"],
    modelAnswer:
      "The virtual DOM is an in-memory tree representing the UI. On a state change the library builds a new tree, diffs it against the previous one, and applies only the minimal set of real DOM updates. Direct DOM manipulation is expensive, so batching and minimising those writes is where the gain comes from.",
    tips: [
      "Explain diffing/reconciliation, not just 'it's faster'.",
      "Note that the win is in avoiding unnecessary real DOM writes.",
    ],
  },

  // ---------------- Technical — Advanced ----------------
  {
    id: "t-a-1",
    type: "Technical",
    difficulty: "Advanced",
    roles: ["Software Developer", "Backend Developer"],
    question: "How would you design a URL shortener that handles high read traffic?",
    keywords: ["hash", "cache", "database", "redirect", "scale", "load", "index", "collision"],
    modelAnswer:
      "Generate a short key per URL (base62 of an incrementing ID, or a hash with collision handling), store the key-to-URL mapping in a database indexed on the key, and put a cache in front since reads vastly outnumber writes. Redirects return a 301/302. Scale reads with cache plus read replicas, and shard by key if write volume grows.",
    tips: [
      "Lead with the read/write ratio — it justifies the caching layer.",
      "Mention collision handling if you propose hashing.",
    ],
  },
  {
    id: "t-a-2",
    type: "Technical",
    difficulty: "Advanced",
    roles: ["Software Developer", "Backend Developer", "QA Engineer"],
    question: "How do you find and fix a performance bottleneck in an application?",
    keywords: ["profile", "measure", "monitor", "query", "index", "benchmark", "cache"],
    modelAnswer:
      "Measure before changing anything — profile the application and check monitoring to find where time is actually spent. Common culprits are unindexed database queries, N+1 query patterns, blocking I/O and unnecessary re-renders. Fix one bottleneck, re-measure to confirm the gain, then repeat.",
    tips: [
      "Emphasise measuring first — guessing is the classic wrong answer.",
      "Re-measuring after the fix shows real engineering discipline.",
    ],
  },
  {
    id: "t-a-3",
    type: "Technical",
    difficulty: "Advanced",
    roles: ["Data Analyst"],
    question: "How would you investigate a sudden 30% drop in a key metric?",
    keywords: ["segment", "data quality", "trend", "compare", "hypothesis", "tracking", "root cause"],
    modelAnswer:
      "First rule out instrumentation — a tracking or pipeline change explains many sudden drops. If the data is sound, segment by dimension (region, device, channel, user cohort) to see whether the drop is broad or concentrated, compare against the same period in prior weeks for seasonality, then form and test specific hypotheses against the narrowed segment.",
    tips: [
      "Check data quality before hunting for business causes.",
      "Segmenting to localise the drop is the key analytical move.",
    ],
  },

  // ---------------- HR ----------------
  {
    id: "h-1",
    type: "HR",
    difficulty: "Beginner",
    roles: "all",
    question: "Tell me about yourself.",
    keywords: ["studying", "project", "skills", "interest", "experience", "learning"],
    modelAnswer:
      "Keep it to about 90 seconds and structure it as present, past, future: what you're studying now, the projects or experience that shaped your interests, and why that leads you to this role. Avoid repeating your resume line by line.",
    tips: [
      "Use a present → past → future structure.",
      "End by connecting your background to this specific role.",
    ],
  },
  {
    id: "h-2",
    type: "HR",
    difficulty: "Beginner",
    roles: "all",
    question: "Why should we hire you?",
    keywords: ["skills", "contribute", "value", "match", "experience", "learn"],
    modelAnswer:
      "Connect two or three specific strengths to what the role actually needs, and back each with brief evidence. The answer should sound like a match argument, not a list of adjectives.",
    tips: [
      "Reference the job description's stated requirements.",
      "Support each claim with a concrete example.",
    ],
  },
  {
    id: "h-3",
    type: "HR",
    difficulty: "Intermediate",
    roles: "all",
    question: "What are your strengths and weaknesses?",
    keywords: ["strength", "weakness", "improve", "working on", "feedback", "example"],
    modelAnswer:
      "Give a strength that's relevant to the role with a supporting example, then a genuine weakness plus the concrete steps you're taking on it. A real weakness with visible progress reads far better than a disguised humblebrag.",
    tips: [
      "Avoid 'I'm a perfectionist' — interviewers discount it immediately.",
      "Always pair the weakness with what you're actively doing about it.",
    ],
  },
  {
    id: "h-4",
    type: "HR",
    difficulty: "Intermediate",
    roles: "all",
    question: "Where do you see yourself in five years?",
    keywords: ["grow", "learn", "role", "responsibility", "career", "contribute"],
    modelAnswer:
      "Show direction without sounding rigid: the kind of technical depth or responsibility you want to build toward, and how this role is a credible first step. Tie the ambition back to the company where you reasonably can.",
    tips: [
      "Balance ambition with realism about starting out.",
      "Avoid naming a specific title you couldn't justify.",
    ],
  },

  // ---------------- Behavioral ----------------
  {
    id: "b-1",
    type: "Behavioral",
    difficulty: "Intermediate",
    roles: "all",
    question: "Describe a challenging project you worked on.",
    keywords: ["situation", "task", "action", "result", "challenge", "solved", "learned", "team"],
    modelAnswer:
      "Use STAR: the Situation and your specific Task, the Actions you personally took, and the measurable Result. Be explicit about what was yours versus the team's, and close with what you'd do differently now.",
    tips: [
      "Follow the STAR structure explicitly.",
      "Say 'I' for your own contribution, not only 'we'.",
    ],
  },
  {
    id: "b-2",
    type: "Behavioral",
    difficulty: "Intermediate",
    roles: "all",
    question: "How do you handle conflict within a team?",
    keywords: ["listen", "discuss", "resolve", "perspective", "compromise", "communication"],
    modelAnswer:
      "Describe a real disagreement, how you separated the issue from the person, what you did to understand the other view, and how the team reached a decision. Interviewers care about the process more than who turned out to be right.",
    tips: [
      "Show you listened before advocating your position.",
      "End with the outcome and the working relationship afterwards.",
    ],
  },
  {
    id: "b-3",
    type: "Behavioral",
    difficulty: "Advanced",
    roles: "all",
    question: "Describe a time you failed and what you learned from it.",
    keywords: ["mistake", "failed", "learned", "responsibility", "changed", "next time"],
    modelAnswer:
      "Pick a real failure with genuine stakes, own your part in it without deflecting, and focus most of the answer on the specific change you made afterwards and its effect. Ownership plus evidence of change is the whole point of the question.",
    tips: [
      "Don't pick a fake failure — it undermines the answer.",
      "Spend most of your time on what changed afterwards.",
    ],
  },
  {
    id: "b-4",
    type: "Behavioral",
    difficulty: "Beginner",
    roles: "all",
    question: "Tell me about a time you had to learn something quickly.",
    keywords: ["learn", "deadline", "resource", "approach", "applied", "quickly"],
    modelAnswer:
      "Set out what you had to learn and the time pressure, how you broke it down and which resources you used, and what you actually shipped with it. Finish with how you'd approach a similar crunch now.",
    tips: [
      "Describe your learning method, not just the outcome.",
      "Name what you produced with the new skill.",
    ],
  },
];

/**
 * Filters the question bank for the chosen setup.
 *
 * - "Mixed" pulls from every type.
 * - Difficulty is a soft filter: if too few questions match exactly, we
 *   top up from other difficulties so the interview never runs short.
 * - Role-specific questions are included alongside `roles: "all"` ones.
 *
 * Returns at most `limit` questions.
 */
export function getInterviewQuestions({ type, difficulty, role }, limit = 5) {
  const matchesRole = (q) => q.roles === "all" || q.roles.includes(role);
  const matchesType = (q) => type === "Mixed" || q.type === type;

  const pool = questionBank.filter((q) => matchesType(q) && matchesRole(q));
  const exact = pool.filter((q) => q.difficulty === difficulty);
  const rest = pool.filter((q) => q.difficulty !== difficulty);

  return [...exact, ...rest].slice(0, limit);
}

/**
 * Demo answer "evaluation".
 *
 * This is NOT machine learning. The score combines two visible signals:
 *   1. how many of the question's expected keywords appear, and
 *   2. whether the answer has enough substance (word count).
 * Both are surfaced to the user as sample feedback, and the UI labels
 * the result as a demo score so nobody mistakes it for real assessment.
 */
export function evaluateAnswer(question, answer) {
  const text = (answer ?? "").toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const matched = question.keywords.filter((k) => text.includes(k));
  const keywordRatio = question.keywords.length ? matched.length / question.keywords.length : 0;

  // Coverage is worth up to 60 points, depth (length) up to 40.
  const coverageScore = Math.round(keywordRatio * 60);
  const depthScore = Math.min(40, Math.round((wordCount / 70) * 40));
  const score = Math.max(0, Math.min(100, coverageScore + depthScore));

  const strengths = [];
  const improvements = [];

  if (matched.length >= 3) {
    strengths.push(`Covered several key points, including ${matched.slice(0, 3).join(", ")}.`);
  } else if (matched.length > 0) {
    strengths.push(`Touched on ${matched.join(" and ")}.`);
  }

  if (wordCount >= 60) {
    strengths.push("Gave a detailed answer with enough supporting explanation.");
  } else if (wordCount >= 25) {
    strengths.push("Kept the answer clear and to the point.");
  }

  if (keywordRatio < 0.5) {
    const missed = question.keywords.filter((k) => !text.includes(k)).slice(0, 3);
    improvements.push(`Consider also addressing: ${missed.join(", ")}.`);
  }
  if (wordCount < 25) {
    improvements.push("Expand your answer — aim for 60–120 words so you can include an example.");
  }
  if (question.type !== "Technical" && !/\b(i|my)\b/.test(text)) {
    improvements.push("Use 'I' to make your own contribution explicit.");
  }

  if (strengths.length === 0) {
    strengths.push("You attempted the question — that's the starting point.");
  }
  if (improvements.length === 0) {
    improvements.push("Solid coverage. Next, tighten the structure so the key point comes first.");
  }

  return { score, matched, wordCount, strengths, improvements };
}

// Turns the per-question demo scores into the closing summary.
export function buildInterviewSummary(questions, answers) {
  const attempted = answers.filter((a) => a && a.submitted);
  const skipped = answers.filter((a) => a && a.skipped);

  const averageScore = attempted.length
    ? Math.round(attempted.reduce((sum, a) => sum + a.evaluation.score, 0) / attempted.length)
    : 0;

  // Strong vs weak areas are grouped by question type so the summary
  // says something more useful than a single number. Iterating by index
  // keeps each answer aligned with the question it belongs to.
  const byType = {};
  answers.forEach((a, i) => {
    if (!a || !a.submitted) return;
    const type = questions[i]?.type ?? "General";
    if (!byType[type]) byType[type] = [];
    byType[type].push(a.evaluation.score);
  });

  const typeAverages = Object.entries(byType).map(([type, scores]) => ({
    type,
    average: Math.round(scores.reduce((s, v) => s + v, 0) / scores.length),
  }));

  const strongAreas = typeAverages.filter((t) => t.average >= 60).map((t) => t.type);
  const weakAreas = typeAverages.filter((t) => t.average < 60).map((t) => t.type);

  const nextSteps = [];
  if (weakAreas.length) {
    nextSteps.push(`Revisit ${weakAreas.join(" and ")} questions — those scored lowest in this demo run.`);
  }
  if (skipped.length) {
    nextSteps.push(`You skipped ${skipped.length} question${skipped.length > 1 ? "s" : ""}. Try answering them next time, even partially.`);
  }
  if (averageScore < 60) {
    nextSteps.push("Aim for longer, structured answers — state your main point first, then explain it.");
  } else {
    nextSteps.push("Keep the structure and add a concrete example to each answer.");
  }
  nextSteps.push("Run another mock interview in a few days to compare your demo scores.");

  return {
    averageScore,
    attempted: attempted.length,
    skipped: skipped.length,
    total: questions.length,
    strongAreas,
    weakAreas,
    typeAverages,
    nextSteps,
  };
}
