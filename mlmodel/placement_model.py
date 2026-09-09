import sqlite3
from readiness_model import calculate_readiness

DATABASE = "database/placementor.db"


def estimate_placement_probability(student_id):
    """
    Current-data placement estimate.

    The project database has very few historical applications, so this module
    deliberately does not claim a statistically trained probability model.
    It combines readiness with observed application outcomes and returns a
    clearly labeled estimate.
    """
    readiness = calculate_readiness(student_id)
    if readiness is None:
        return None

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()

    cur.execute("""
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'Selected' THEN 1 ELSE 0 END) AS selected
        FROM applications
        WHERE student_id = ?
    """, (student_id,))
    row = cur.fetchone()
    total = int(row[0] or 0)
    selected = int(row[1] or 0)

    cur.execute("""
        SELECT COUNT(*)
        FROM applications
        WHERE status = 'Selected'
    """)
    total_selected = int(cur.fetchone()[0] or 0)

    cur.execute("""
        SELECT COUNT(*)
        FROM applications
    """)
    total_applications = int(cur.fetchone()[0] or 0)

    historical_rate = (
        total_selected / total_applications
        if total_applications else 0.5
    )

    # A conservative estimate: readiness is the main signal, while available
    # historical outcome data provides a small calibration signal.
    readiness_rate = readiness["readiness_score"] / 100.0
    probability = (0.80 * readiness_rate) + (0.20 * historical_rate)

    probability = round(max(0.0, min(probability, 1.0)) * 100, 2)

    if probability >= 80:
        band = "High"
    elif probability >= 60:
        band = "Moderate"
    elif probability >= 40:
        band = "Low"
    else:
        band = "Very Low"

    result = {
        "student_id": student_id,
        "placement_probability_estimate": probability,
        "probability_band": band,
        "readiness_score": readiness["readiness_score"],
        "historical_context": {
            "student_applications": total,
            "student_selected": selected,
            "all_applications": total_applications,
            "all_selected": total_selected,
            "historical_selected_rate": round(historical_rate * 100, 2),
        },
        "model_status": "baseline estimate; not a statistically trained classifier",
    }

    conn.close()
    return result
