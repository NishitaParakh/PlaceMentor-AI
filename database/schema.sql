-- =========================================================
-- PlaceMentor AI - SQLite Database Schema
-- =========================================================

PRAGMA foreign_keys = ON;

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    university TEXT,
    branch TEXT,
    year INTEGER CHECK (year >= 1 AND year <= 5),
    cgpa REAL CHECK (cgpa >= 0 AND cgpa <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT
);

CREATE TABLE student_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    skill_id INTEGER NOT NULL,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE(student_id, skill_id)
);

CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT,
    github_url TEXT,
    evaluation_score REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE coding_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    platform TEXT NOT NULL,
    username TEXT,
    problems_solved INTEGER DEFAULT 0,
    easy_solved INTEGER DEFAULT 0,
    medium_solved INTEGER DEFAULT 0,
    hard_solved INTEGER DEFAULT 0,
    contest_rating INTEGER,
    coding_score REAL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE(student_id, platform)
);

CREATE TABLE resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    file_url TEXT,
    ats_score REAL,
    skills_found TEXT,
    experience_score REAL,
    education_score REAL,
    project_score REAL,
    overall_score REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    industry TEXT,
    location TEXT,
    description TEXT,
    website TEXT
);

CREATE TABLE company_requirements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    minimum_cgpa REAL,
    required_experience INTEGER DEFAULT 0,
    required_skills TEXT,
    minimum_coding_score REAL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    role TEXT,
    status TEXT DEFAULT 'Applied',
    application_date DATE DEFAULT CURRENT_DATE,
    interview_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CHECK (status IN ('Applied','Shortlisted','Interview','Selected','Rejected'))
);

CREATE TABLE predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    readiness_score REAL,
    placement_probability REAL,
    model_version TEXT,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE recruiter_feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    recruiter_id INTEGER,
    feedback_text TEXT,
    sentiment TEXT,
    technical_score REAL,
    communication_score REAL,
    teamwork_score REAL,
    overall_score REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    type TEXT,
    recommendation TEXT NOT NULL,
    priority TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE learning_roadmap (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    skill TEXT NOT NULL,
    resource TEXT,
    priority TEXT,
    status TEXT DEFAULT 'Not Started',
    estimated_duration TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_student_skills_student
ON student_skills(student_id);

CREATE INDEX idx_projects_student
ON projects(student_id);

CREATE INDEX idx_coding_profiles_student
ON coding_profiles(student_id);

CREATE INDEX idx_resumes_student
ON resumes(student_id);

CREATE INDEX idx_applications_student
ON applications(student_id);

CREATE INDEX idx_applications_company
ON applications(company_id);

CREATE INDEX idx_predictions_student
ON predictions(student_id);

CREATE INDEX idx_feedback_student
ON recruiter_feedback(student_id);

CREATE INDEX idx_recommendations_student
ON recommendations(student_id);

CREATE INDEX idx_roadmap_student
ON learning_roadmap(student_id);