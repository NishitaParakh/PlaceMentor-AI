import sqlite3

DATABASE = "database/placementor.db"


def _split_skills(value):
    if not value:
        return []
    return [x.strip().lower() for x in str(value).replace(";", ",").split(",") if x.strip()]


def analyze_skill_gap(student_id, company_id=None):
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""
        SELECT s.name, s.category, ss.proficiency
        FROM student_skills ss
        JOIN skills s ON s.id = ss.skill_id
        WHERE ss.student_id = ?
    """, (student_id,))
    student_rows = cur.fetchall()

    student_skills = {
        row["name"].strip().lower(): {
            "name": row["name"],
            "category": row["category"],
            "proficiency": float(row["proficiency"] or 0),
        }
        for row in student_rows
    }

    if company_id is not None:
        cur.execute("""
            SELECT required_skills
            FROM company_requirements
            WHERE company_id = ?
        """, (company_id,))
        req = cur.fetchone()
        required = _split_skills(req["required_skills"] if req else "")
    else:
        cur.execute("SELECT required_skills FROM company_requirements")
        required = []
        for row in cur.fetchall():
            required.extend(_split_skills(row["required_skills"]))

    required = list(dict.fromkeys(required))

    matched = []
    gaps = []

    for skill in required:
        if skill in student_skills:
            item = student_skills[skill]
            if item["proficiency"] >= 60:
                matched.append({
                    "skill": item["name"],
                    "proficiency": item["proficiency"],
                    "status": "ready"
                })
            else:
                gaps.append({
                    "skill": item["name"],
                    "current_proficiency": item["proficiency"],
                    "target_proficiency": 70,
                    "status": "improve"
                })
        else:
            gaps.append({
                "skill": skill,
                "current_proficiency": 0,
                "target_proficiency": 70,
                "status": "missing"
            })

    conn.close()

    gap_count = len(gaps)
    match_count = len(matched)
    total = gap_count + match_count
    match_percentage = round((match_count / total) * 100, 2) if total else 100.0

    return {
        "student_id": student_id,
        "company_id": company_id,
        "required_skill_count": total,
        "matched_skill_count": match_count,
        "skill_match_percentage": match_percentage,
        "matched_skills": matched,
        "skill_gaps": gaps,
    }
