// Dummy data for the ATS Resume Analyzer (Phase 6).
//
// IMPORTANT: no resume is ever parsed and no AI model is involved. The
// uploaded file never leaves the browser — it isn't read, sent anywhere,
// or inspected. analyzeResume() below simply returns this fixed sample
// report after a short delay, which is why every surface in the UI is
// labelled as a prototype.
//
// When Vrinda's NLP parsing and Pallavi's backend are ready,
// analyzeResume() in src/services/api.js is the single seam to replace.

export const acceptedFormats = [".pdf", ".doc", ".docx"];
export const maxFileSizeMB = 5;

// Headline score shown in the radial gauge.
export const atsScore = 78;

// "Resume Summary" — six scored dimensions, each rendered as a progress bar.
export const resumeSummary = [
  {
    key: "completeness",
    label: "Resume Completeness",
    value: 85,
    note: "Most expected sections are present.",
  },
  {
    key: "formatting",
    label: "Formatting Quality",
    value: 90,
    note: "Single column, standard fonts — parses cleanly.",
  },
  {
    key: "keywords",
    label: "Keyword Relevance",
    value: 68,
    note: "Several role-specific terms are missing.",
  },
  {
    key: "skills",
    label: "Skills Coverage",
    value: 74,
    note: "Good technical spread, thin on tooling.",
  },
  {
    key: "projects",
    label: "Project Visibility",
    value: 62,
    note: "Projects lack measurable outcomes.",
  },
  {
    key: "experience",
    label: "Experience Clarity",
    value: 70,
    note: "Responsibilities stated, impact unclear.",
  },
];

// Keyword analysis, split by how the sample report classifies each term.
export const keywordAnalysis = {
  matched: [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Git",
    "REST API",
    "MySQL",
    "Problem Solving",
  ],
  missing: [
    "Data Structures",
    "Algorithms",
    "Unit Testing",
    "CI/CD",
    "Agile",
    "System Design",
  ],
  recommended: [
    "TypeScript",
    "Docker",
    "Cloud (AWS/Azure)",
    "Performance Optimization",
  ],
  technical: [
    "React",
    "JavaScript",
    "Node.js",
    "MySQL",
    "Git",
    "REST API",
    "HTML/CSS",
  ],
  soft: ["Communication", "Teamwork", "Problem Solving", "Time Management"],
};

// Section-by-section review. `status` drives both the badge text and its
// tone, so the result never depends on colour alone.
export const sectionAnalysis = [
  {
    section: "Contact Information",
    status: "Good",
    detail: "Name, phone, email and location are all present and clearly placed.",
  },
  {
    section: "Career Objective / Summary",
    status: "Needs Improvement",
    detail: "The summary is generic. Tailor it to the specific role you're applying for.",
  },
  {
    section: "Education",
    status: "Good",
    detail: "Degree, institution, year and CGPA are all listed in a parseable format.",
  },
  {
    section: "Technical Skills",
    status: "Good",
    detail: "Skills are grouped sensibly, though a few in-demand tools are missing.",
  },
  {
    section: "Projects",
    status: "Needs Improvement",
    detail: "Projects describe what was built but not the outcome or your specific role.",
  },
  {
    section: "Experience",
    status: "Needs Improvement",
    detail: "Internship entries list duties rather than measurable results.",
  },
  {
    section: "Certifications",
    status: "Recommended",
    detail: "No certifications found. One or two relevant ones would strengthen the profile.",
  },
  {
    section: "Achievements",
    status: "Missing",
    detail: "No achievements section detected. Add contests, ranks or recognitions.",
  },
];

export const strengths = [
  "Clean, single-column layout that ATS software can parse reliably.",
  "Education and contact details are complete and well structured.",
  "Technical skills are grouped into clear, scannable categories.",
  "Resume fits on a single page — appropriate for a fresher.",
];

export const weaknesses = [
  "Project descriptions have no measurable outcomes or metrics.",
  "The professional summary is generic and not role-specific.",
  "Several common keywords for technical roles are absent.",
  "No achievements or certifications section is present.",
];

export const improvementSuggestions = [
  "Add measurable achievements to each project — users served, percentage improvement, records processed.",
  "Use role-specific keywords drawn directly from the job description you're targeting.",
  "Rewrite the professional summary to name the role and your two strongest relevant skills.",
  "Include the technical skills recruiters screen for, such as data structures and testing.",
  "Keep formatting consistent — one font family, uniform bullet style, uniform date format.",
  "Add links to your GitHub and coding profiles near your contact details.",
  "Avoid graphics, icons, tables and multi-column layouts, which many ATS parsers mishandle.",
  "Add one or two relevant certifications to strengthen your technical credibility.",
];

// Bundled so the page (and the future API call) gets one object back.
export const sampleAnalysis = {
  atsScore,
  resumeSummary,
  keywordAnalysis,
  sectionAnalysis,
  strengths,
  weaknesses,
  improvementSuggestions,
};

export default sampleAnalysis;
