def explain_readiness(readiness_result):
    if readiness_result is None:
        return None

    components = readiness_result["components"]

    ordered = sorted(
        components.items(),
        key=lambda item: item[1],
        reverse=True
    )

    strengths = []
    improvements = []

    for feature, score in ordered:
        if feature == "cgpa":
            label = "CGPA"
        elif feature == "skills":
            label = "technical skills"
        elif feature == "projects":
            label = "projects"
        elif feature == "coding":
            label = "coding profile"
        else:
            label = "resume"

        if score >= 0.70 * {
            "cgpa": 30,
            "skills": 25,
            "projects": 20,
            "coding": 15,
            "resume": 10,
        }[feature]:
            strengths.append(f"{label} is contributing strongly to readiness.")
        elif score < 0.40 * {
            "cgpa": 30,
            "skills": 25,
            "projects": 20,
            "coding": 15,
            "resume": 10,
        }[feature]:
            improvements.append(f"{label} is a major area for improvement.")

    return {
        "student_id": readiness_result["student_id"],
        "readiness_score": readiness_result["readiness_score"],
        "strengths": strengths,
        "improvements": improvements,
        "feature_contributions": components,
        "explanation_type": "feature contribution based explanation",
    }
