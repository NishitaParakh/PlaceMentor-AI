import { Briefcase, Users, ListOrdered } from "lucide-react";
import "./PreparationOverview.css";

/**
 * Company snapshot at the top of the preparation plan: roles, hiring
 * stages and soft skills. The interview rounds are also shown in detail
 * further down the page — this is a compact at-a-glance version.
 *
 * Props:
 * - company: an entry from src/data/companyData.js (name/type)
 * - plan:    the matching entry from companyPreparationData.js
 */
export default function PreparationOverview({ company, plan }) {
  return (
    <section className="card prep-overview">
      <div className="card-title-row">
        <h3>{plan.name} — Overview</h3>
        <span className="badge badge-low">{company.type}</span>
      </div>
      <p className="prep-overview-note">
        Hiring stages, roles and requirements below are simplified samples for demonstration — not
        {" "}{plan.name}'s current, official policy.
      </p>

      <div className="prep-overview-grid">
        <div className="prep-overview-block">
          <h4>
            <Briefcase size={15} /> Sample Job Roles
          </h4>
          <div className="prep-overview-tags">
            {plan.roles.map((r) => (
              <span className="badge badge-neutral" key={r}>
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="prep-overview-block">
          <h4>
            <Users size={15} /> Suggested Soft Skills
          </h4>
          <div className="prep-overview-tags">
            {plan.softSkills.map((s) => (
              <span className="badge badge-low" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="prep-overview-block">
        <h4>
          <ListOrdered size={15} /> Sample Hiring Stages
        </h4>
        <ol className="prep-overview-stages">
          {plan.interviewRounds.map((round) => (
            <li key={round.stage}>
              <span className="prep-overview-stage-name">{round.stage}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
