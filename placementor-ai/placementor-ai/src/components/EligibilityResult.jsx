import { CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";
import "./EligibilityResult.css";

/**
 * The simulated eligibility verdict for one company + student profile
 * pair. Every criterion the check ran is shown, satisfied and
 * unsatisfied alike, so the result is never a bare pass/fail.
 *
 * Props:
 * - company:     the company entry checked against
 * - profile:     the submitted student profile (for the summary line)
 * - result:      { eligible, satisfied[], unsatisfied[], missingSkills[] }
 * - suggestions: string[] next steps
 */
export default function EligibilityResult({ company, profile, result, suggestions }) {
  const { eligible, satisfied, unsatisfied } = result;

  return (
    <section className="card eligibility-result">
      <div className={eligible ? "eligibility-verdict eligibility-verdict-eligible" : "eligibility-verdict eligibility-verdict-not"}>
        <div className="eligibility-verdict-icon" aria-hidden="true">
          {eligible ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
        </div>
        <div className="eligibility-verdict-body">
          <span className={`badge ${eligible ? "badge-success" : "badge-high"}`}>
            {eligible ? "Eligible based on sample criteria" : "Not eligible based on sample criteria"}
          </span>
          <p>
            {profile.name || "You"} vs. <strong>{company.name}</strong> — {company.role}
          </p>
        </div>
      </div>

      <p className="eligibility-disclaimer" role="note">
        Prototype Result — Not an Official Recruitment Decision. Based on simplified sample criteria, not
        {" "}{company.name}'s real hiring policy.
      </p>

      <div className="eligibility-criteria-grid">
        <div className="eligibility-criteria-block">
          <h4>
            <CheckCircle2 size={15} /> Criteria Satisfied
          </h4>
          {satisfied.length > 0 ? (
            <ul>
              {satisfied.map((r) => (
                <li key={r.label}>
                  <strong>{r.label}:</strong> {r.detail}
                </li>
              ))}
            </ul>
          ) : (
            <p className="eligibility-criteria-empty">No criteria were satisfied in this sample check.</p>
          )}
        </div>

        <div className="eligibility-criteria-block">
          <h4>
            <AlertTriangle size={15} /> Criteria Not Satisfied
          </h4>
          {unsatisfied.length > 0 ? (
            <ul>
              {unsatisfied.map((r) => (
                <li key={r.label}>
                  <strong>{r.label}:</strong> {r.detail}
                </li>
              ))}
            </ul>
          ) : (
            <p className="eligibility-criteria-empty">Every sample criterion was satisfied.</p>
          )}
        </div>
      </div>

      <div className="eligibility-suggestions">
        <h4>
          <Lightbulb size={15} /> Sample Next Steps
        </h4>
        <ul>
          {suggestions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
