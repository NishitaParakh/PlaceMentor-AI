import "./CompanyRequirementCard.css";

/**
 * Read-only summary of one company's sample requirements, shown once a
 * company is selected on the Eligibility Checker so the student can see
 * exactly what's about to be checked before they submit.
 *
 * Props:
 * - company: an entry from src/data/companyData.js
 */
export default function CompanyRequirementCard({ company }) {
  return (
    <section className="card requirement-card">
      <div className="card-title-row">
        <h3>{company.name} — Sample Requirements</h3>
        <span className="demo-tag">Not Official</span>
      </div>
      <p className="requirement-card-role">{company.role}</p>

      <div className="requirement-grid">
        <div className="requirement-item">
          <span className="requirement-label">Minimum CGPA</span>
          <span className="requirement-value">{company.minCgpa}+</span>
        </div>
        <div className="requirement-item">
          <span className="requirement-label">Eligible Branches</span>
          <span className="requirement-value">
            {company.branches === "all" ? "All branches" : company.branches.join(", ")}
          </span>
        </div>
        <div className="requirement-item">
          <span className="requirement-label">Max Backlogs</span>
          <span className="requirement-value">{company.maxBacklogs}</span>
        </div>
        <div className="requirement-item">
          <span className="requirement-label">Graduation Year</span>
          <span className="requirement-value">{company.graduationYears.join(", ")}</span>
        </div>
        <div className="requirement-item">
          <span className="requirement-label">Experience</span>
          <span className="requirement-value">{company.experienceRequired ? "Required" : "Not required"}</span>
        </div>
      </div>

      <div className="requirement-skills">
        <span className="requirement-label">Required Skills</span>
        <div className="requirement-skill-tags">
          {company.requiredSkills.map((s) => (
            <span className="badge badge-neutral" key={s}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <p className="requirement-focus">
        <strong>Preparation focus:</strong> {company.focus}
      </p>
    </section>
  );
}
