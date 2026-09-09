from skill_gap import analyze_skill_gap


RESOURCE_MAP = {
    "python": "Python fundamentals, OOP and problem-solving practice",
    "java": "Java fundamentals, OOP and DSA practice",
    "sql": "SQL queries, joins, aggregation and database practice",
    "machine learning": "Supervised learning, preprocessing and model evaluation",
    "ml": "Supervised learning, preprocessing and model evaluation",
    "deep learning": "Neural networks and practical deep-learning projects",
    "react": "React components, hooks and API integration",
    "javascript": "JavaScript fundamentals, async programming and DOM",
    "c++": "C++ fundamentals, STL and competitive programming",
    "dsa": "Arrays, strings, trees, graphs and dynamic programming",
    "data structures": "Data structures and algorithm practice",
}


def build_learning_roadmap(student_id, company_id=None):
    gap_result = analyze_skill_gap(student_id, company_id)
    roadmap = []

    for gap in gap_result["skill_gaps"]:
        skill = gap["skill"]
        key = skill.strip().lower()
        resource = RESOURCE_MAP.get(
            key,
            f"Study {skill}, practice interview questions, and build a small project using it."
        )

        priority = "High" if gap["status"] == "missing" else "Medium"

        roadmap.append({
            "skill": skill,
            "priority": priority,
            "status": "Not Started",
            "resource": resource,
            "estimated_duration": "2-4 weeks",
        })

    return {
        "student_id": student_id,
        "company_id": company_id,
        "roadmap": roadmap,
        "total_learning_items": len(roadmap),
    }
