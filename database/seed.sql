-- =========================================================
-- PlaceMentor AI - Sample Data
-- SQLite
-- =========================================================

INSERT INTO students
(name, email, university, branch, year, cgpa)
VALUES
('Aarav Sharma', 'aarav@example.com', 'VIT Bhopal', 'CSE', 2, 8.6),
('Ananya Verma', 'ananya@example.com', 'VIT Bhopal', 'CSE', 3, 9.1),
('Rohan Mehta', 'rohan@example.com', 'VIT Bhopal', 'AI/ML', 2, 7.8);

INSERT INTO skills
(name, category)
VALUES
('Python', 'Programming'),
('Java', 'Programming'),
('C++', 'Programming'),
('SQL', 'Database'),
('Machine Learning', 'AI/ML'),
('Deep Learning', 'AI/ML'),
('Data Structures', 'Computer Science'),
('Communication', 'Soft Skill'),
('Problem Solving', 'Soft Skill'),
('Git', 'Tools');

INSERT INTO student_skills
(student_id, skill_id, proficiency)
VALUES
(1, 1, 85),
(1, 4, 75),
(1, 5, 70),
(1, 7, 80),
(1, 8, 65),
(2, 1, 92),
(2, 2, 85),
(2, 4, 90),
(2, 5, 88),
(2, 7, 90),
(2, 8, 82),
(3, 1, 75),
(3, 3, 80),
(3, 4, 65),
(3, 5, 60),
(3, 7, 70),
(3, 8, 60);

INSERT INTO projects
(student_id, title, description, technologies, github_url, evaluation_score)
VALUES
(1, 'AI Expense Analyzer',
'Analyzes student expenses and generates an AI-based report.',
'Python, Pandas, NumPy, Machine Learning',
'https://github.com/example/ai-expense-analyzer',
82),

(1, 'GitHub Profile Viewer',
'Displays GitHub profile information using the GitHub API.',
'HTML, CSS, JavaScript, Python',
'https://github.com/example/github-profile-viewer',
78),

(2, 'Placement Prediction System',
'Predicts placement probability using machine learning.',
'Python, Pandas, Scikit-learn',
'https://github.com/example/placement-prediction',
91),

(3, 'Smart Pollution Monitoring',
'Monitors pollution levels and calculates AQI.',
'Python, Sensors, IoT',
'https://github.com/example/pollution-monitoring',
75);

INSERT INTO coding_profiles
(student_id, platform, username, problems_solved,
easy_solved, medium_solved, hard_solved,
contest_rating, coding_score)
VALUES
(1, 'LeetCode', 'aarav123', 250, 150, 85, 15, 1450, 78),
(2, 'LeetCode', 'ananya456', 420, 180, 190, 50, 1750, 91),
(3, 'LeetCode', 'rohan789', 160, 110, 45, 5, 1250, 65);

INSERT INTO resumes
(student_id, file_url, ats_score, skills_found,
experience_score, education_score, project_score, overall_score)
VALUES
(1, 'resumes/aarav_resume.pdf', 82,
'Python, SQL, Machine Learning, DSA, Git',
70, 85, 82, 80),

(2, 'resumes/ananya_resume.pdf', 92,
'Python, Java, SQL, Machine Learning, DSA',
88, 92, 91, 91),

(3, 'resumes/rohan_resume.pdf', 70,
'Python, C++, SQL, IoT',
60, 78, 75, 70);

INSERT INTO companies
(name, industry, location, description, website)
VALUES
('TechNova', 'Technology', 'Bangalore',
'Software and technology company.',
'https://example.com/technova'),

('DataSphere', 'AI & Data', 'Hyderabad',
'Company focused on AI, analytics and data solutions.',
'https://example.com/datasphere'),

('CloudWorks', 'Cloud Computing', 'Pune',
'Cloud and software engineering company.',
'https://example.com/cloudworks');

INSERT INTO company_requirements
(company_id, minimum_cgpa, required_experience,
required_skills, minimum_coding_score)
VALUES
(1, 7.5, 0, 'Python, Java, DSA', 70),
(2, 8.0, 0, 'Python, SQL, Machine Learning', 75),
(3, 7.0, 0, 'Python, Java, SQL', 65);

INSERT INTO applications
(student_id, company_id, role, status, application_date, interview_date)
VALUES
(1, 1, 'Software Engineer Intern', 'Shortlisted',
date('now', '-10 days'), date('now', '+5 days')),

(1, 2, 'Machine Learning Intern', 'Applied',
date('now', '-3 days'), NULL),

(2, 1, 'Software Engineer', 'Interview',
date('now', '-20 days'), date('now', '+2 days')),

(2, 2, 'Data Scientist Intern', 'Selected',
date('now', '-30 days'), date('now', '-10 days')),

(3, 3, 'Software Developer Intern', 'Rejected',
date('now', '-15 days'), date('now', '-5 days'));

INSERT INTO predictions
(student_id, readiness_score, placement_probability,
model_version, explanation)
VALUES
(1, 79, 84, 'v1.0',
'Good CGPA, strong projects and coding skills. Communication skills can improve.'),

(2, 91, 94, 'v1.0',
'Strong academic performance, coding ability, projects and technical skills.'),

(3, 68, 62, 'v1.0',
'Good programming foundation but needs improvement in ML, communication and coding performance.');

INSERT INTO recruiter_feedback
(student_id, recruiter_id, feedback_text,
sentiment, technical_score, communication_score,
teamwork_score, overall_score)
VALUES
(1, 101,
'Good technical knowledge and project understanding. Communication can improve.',
'Positive', 82, 65, 78, 75),

(2, 102,
'Excellent technical skills and clear communication.',
'Positive', 92, 88, 90, 90),

(3, 103,
'Shows potential but needs stronger problem solving and communication.',
'Neutral', 70, 60, 68, 66);

INSERT INTO recommendations
(student_id, type, recommendation, priority)
VALUES
(1, 'Skill Improvement',
'Improve communication and practice medium-level DSA problems.',
'High'),

(1, 'Project',
'Add one advanced machine learning project to the portfolio.',
'Medium'),

(2, 'Interview',
'Focus on company-specific interview preparation.',
'High'),

(3, 'Skill Improvement',
'Improve Machine Learning and SQL skills.',
'High'),

(3, 'Coding',
'Practice more medium-level DSA problems.',
'High');

INSERT INTO learning_roadmap
(student_id, skill, resource, priority, status, estimated_duration)
VALUES
(1, 'Communication',
'Practice mock interviews and technical explanations',
'High', 'In Progress', '4 weeks'),

(1, 'Machine Learning',
'Learn model evaluation and feature engineering',
'Medium', 'Not Started', '6 weeks'),

(2, 'System Design',
'Study basic system design concepts',
'Medium', 'Not Started', '4 weeks'),

(3, 'Machine Learning',
'Learn supervised and unsupervised learning',
'High', 'In Progress', '6 weeks'),

(3, 'SQL',
'Practice joins, subqueries and database design',
'High', 'Not Started', '3 weeks');