import sqlite3

DATABASE = "database/placementor.db"


def calculate_readiness(student_id):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT id, cgpa FROM students WHERE id = ?", (student_id,))
    student = cur.fetchone()
    if student is None:
        conn.close()
        return None

    cgpa = float(student["cgpa"] or 0)
    cgpa_component = min(max(cgpa / 10.0, 0), 1) * 30

    cur.execute("""
        SELECT AVG(proficiency) AS avg_proficiency, COUNT(*) AS skill_count
        FROM student_skills
        WHERE student_id = ?
    """, (student_id,))
    skills = cur.fetchone()
    avg_proficiency = float(skills["avg_proficiency"] or 0)
    skill_count = int(skills["skill_count"] or 0)
    skills_component = min(max(avg_proficiency / 100.0, 0), 1) * 25

    cur.execute("SELECT COUNT(*) AS n FROM projects WHERE student_id = ?", (student_id,))
    project_count = int(cur.fetchone()["n"] or 0)
    project_component = min(project_count / 2.0, 1) * 20

    cur.execute("""
        SELECT MAX(coding_score) AS coding_score
        FROM coding_profiles
        WHERE student_id = ?
    """, (student_id,))
    coding = cur.fetchone()
    coding_score = float(coding["coding_score"] or 0)
    coding_component = min(max(coding_score / 100.0, 0), 1) * 15

    cur.execute("""
        SELECT overall_score
        FROM resumes
        WHERE student_id = ?
        ORDER BY created_at DESC
        LIMIT 1
    """, (student_id,))
    resume = cur.fetchone()
    resume_score = float(resume["overall_score"] or 0) if resume else 0
    resume_component = min(max(resume_score / 100.0, 0), 1) * 10

    total = round(min(
        cgpa_component + skills_component + project_component +
        coding_component + resume_component, 100
    ), 2)

    if total >= 80:
        level = "Excellent"
    elif total >= 65:
        level = "Good"
    elif total >= 50:
        level = "Needs Improvement"
    else:
        level = "Low"

    result = {
        "student_id": student_id,
        "readiness_score": total,
        "readiness_level": level,
        "components": {
            "cgpa": round(cgpa_component, 2),
            "skills": round(skills_component, 2),
            "projects": round(project_component, 2),
            "coding": round(coding_component, 2),
            "resume": round(resume_component, 2),
        },
        "raw_features": {
            "cgpa": cgpa,
            "skill_count": skill_count,
            "average_skill_proficiency": round(avg_proficiency, 2),
            "project_count": project_count,
            "coding_score": coding_score,
            "resume_score": resume_score,
        },
        "method": "transparent weighted readiness score",
    }

    conn.close()
    return result
