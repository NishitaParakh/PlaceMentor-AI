from readiness_model import calculate_readiness
from placement_model import estimate_placement_probability
from skill_gap import analyze_skill_gap
from roadmap import build_learning_roadmap
from xai import explain_readiness


def generate_student_ml_report(student_id, company_id=None):
    readiness = calculate_readiness(student_id)

    if readiness is None:
        return None

    probability = estimate_placement_probability(student_id)
    gap = analyze_skill_gap(student_id, company_id)
    roadmap = build_learning_roadmap(student_id, company_id)
    explanation = explain_readiness(readiness)

    return {
        "student_id": student_id,
        "readiness": readiness,
        "placement_probability": probability,
        "skill_gap": gap,
        "learning_roadmap": roadmap,
        "xai_explanation": explanation,
    }


if __name__ == "__main__":
    import sys
    import json

    student_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    company_id = int(sys.argv[2]) if len(sys.argv) > 2 else None

    report = generate_student_ml_report(student_id, company_id)

    if report is None:
        print(json.dumps({"error": "Student not found"}, indent=2))
    else:
        print(json.dumps(report, indent=2))
