import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { branchOptions, graduationYearOptions, skillOptions } from "../data/companyData.js";
import "./StudentEligibilityForm.css";

const ROLE_OPTIONS = [
  "Software Developer",
  "Data Analyst",
  "Frontend Developer",
  "Backend Developer",
  "QA Engineer",
];

/**
 * Student profile input for the eligibility checker. Pre-fills from the
 * student's known profile (name, branch, CGPA) so they aren't asked to
 * re-enter data the app already has, but every field stays editable —
 * eligibility is checked against whatever is currently in the form.
 *
 * Props:
 * - initialValues: { name, cgpa, branch, graduationYear, backlogs, skills,
 *   hasExperience, preferredRole }
 * - onSubmit: called with the validated profile object
 * - isChecking: disables the submit button while a result is "processing"
 */
export default function StudentEligibilityForm({ initialValues, onSubmit, isChecking }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleSkill(skill) {
    setValues((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }));
  }

  function validate() {
    const next = {};

    if (!values.name?.trim()) next.name = "Name is required.";
    if (values.cgpa === "" || values.cgpa === null || Number.isNaN(Number(values.cgpa))) {
      next.cgpa = "CGPA is required.";
    } else if (Number(values.cgpa) < 0 || Number(values.cgpa) > 10) {
      next.cgpa = "Enter a valid CGPA between 0 and 10.";
    }
    if (!values.branch) next.branch = "Please select your branch.";
    if (!values.graduationYear) next.graduationYear = "Please select your graduation year.";
    if (values.backlogs === "" || values.backlogs === null || Number.isNaN(Number(values.backlogs))) {
      next.backlogs = "Backlogs is required.";
    } else if (Number(values.backlogs) < 0) {
      next.backlogs = "Backlogs cannot be negative.";
    }
    if (!values.preferredRole) next.preferredRole = "Please select a preferred role.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...values,
      cgpa: Number(values.cgpa),
      graduationYear: Number(values.graduationYear),
      backlogs: Number(values.backlogs),
    });
  }

  return (
    <section className="card eligibility-form">
      <div className="card-title-row">
        <h3>Your Profile</h3>
      </div>
      <p className="eligibility-form-intro">
        Enter or confirm your details below, then select a company to check your sample eligibility.
      </p>

      <form className="eligibility-form-body" onSubmit={handleSubmit} noValidate>
        <div className="eligibility-form-grid">
          <label className="app-field" htmlFor="elig-name">
            Name
            <input
              id="elig-name"
              type="text"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <span className="app-modal-error">{errors.name}</span>}
          </label>

          <label className="app-field" htmlFor="elig-cgpa">
            CGPA (0–10) <span aria-hidden="true">*</span>
            <input
              id="elig-cgpa"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={values.cgpa}
              onChange={(e) => update("cgpa", e.target.value)}
              aria-invalid={errors.cgpa ? "true" : "false"}
            />
            {errors.cgpa && <span className="app-modal-error">{errors.cgpa}</span>}
          </label>

          <label className="app-field" htmlFor="elig-branch">
            Branch / Degree <span aria-hidden="true">*</span>
            <select
              id="elig-branch"
              value={values.branch}
              onChange={(e) => update("branch", e.target.value)}
              aria-invalid={errors.branch ? "true" : "false"}
            >
              <option value="">Select branch…</option>
              {branchOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            {errors.branch && <span className="app-modal-error">{errors.branch}</span>}
          </label>

          <label className="app-field" htmlFor="elig-year">
            Graduation Year <span aria-hidden="true">*</span>
            <select
              id="elig-year"
              value={values.graduationYear}
              onChange={(e) => update("graduationYear", e.target.value)}
              aria-invalid={errors.graduationYear ? "true" : "false"}
            >
              <option value="">Select year…</option>
              {graduationYearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {errors.graduationYear && <span className="app-modal-error">{errors.graduationYear}</span>}
          </label>

          <label className="app-field" htmlFor="elig-backlogs">
            Number of Backlogs <span aria-hidden="true">*</span>
            <input
              id="elig-backlogs"
              type="number"
              min="0"
              step="1"
              value={values.backlogs}
              onChange={(e) => update("backlogs", e.target.value)}
              aria-invalid={errors.backlogs ? "true" : "false"}
            />
            {errors.backlogs && <span className="app-modal-error">{errors.backlogs}</span>}
          </label>

          <label className="app-field" htmlFor="elig-role">
            Preferred Job Role <span aria-hidden="true">*</span>
            <select
              id="elig-role"
              value={values.preferredRole}
              onChange={(e) => update("preferredRole", e.target.value)}
              aria-invalid={errors.preferredRole ? "true" : "false"}
            >
              <option value="">Select role…</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.preferredRole && <span className="app-modal-error">{errors.preferredRole}</span>}
          </label>
        </div>

        <fieldset className="eligibility-form-skills">
          <legend>Relevant Technical Skills</legend>
          <div className="eligibility-skill-chips">
            {skillOptions.map((skill) => {
              const isChecked = values.skills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  className={isChecked ? "eligibility-skill-chip eligibility-skill-chip-active" : "eligibility-skill-chip"}
                  aria-pressed={isChecked}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="eligibility-experience-toggle">
          <input
            type="checkbox"
            checked={values.hasExperience}
            onChange={(e) => update("hasExperience", e.target.checked)}
          />
          I have internship or project experience relevant to this role.
        </label>

        <button type="submit" className="btn btn-primary eligibility-submit-btn" disabled={isChecking}>
          <ClipboardCheck size={16} />
          {isChecking ? "Checking…" : "Check Eligibility"}
        </button>
      </form>
    </section>
  );
}
