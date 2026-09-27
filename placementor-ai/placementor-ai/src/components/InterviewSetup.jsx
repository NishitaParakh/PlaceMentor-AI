import { useState } from "react";
import { Play, SlidersHorizontal } from "lucide-react";
import { interviewTypes, difficultyLevels, jobRoles } from "../data/interviewData.js";
import "./InterviewSetup.css";

/**
 * Step 1 of the mock interview: pick type, difficulty and role.
 *
 * Props:
 * - onStart:        called with { type, difficulty, role }
 * - initialSettings: optional, used to pre-fill on restart
 * - noQuestions:    true when the last chosen combination returned no
 *                   questions, so we can warn instead of starting empty
 */
export default function InterviewSetup({ onStart, initialSettings, noQuestions = false }) {
  const [type, setType] = useState(initialSettings?.type ?? "");
  const [difficulty, setDifficulty] = useState(initialSettings?.difficulty ?? "");
  const [role, setRole] = useState(initialSettings?.role ?? "");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = {};
    if (!type) nextErrors.type = "Please choose an interview type.";
    if (!difficulty) nextErrors.difficulty = "Please choose a difficulty level.";
    if (!role) nextErrors.role = "Please choose a job role.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onStart({ type, difficulty, role });
  }

  return (
    <section className="card interview-setup">
      <div className="card-title-row">
        <h3>
          <SlidersHorizontal size={16} /> Interview Setup
        </h3>
        <span className="demo-tag">Demo Interview</span>
      </div>
      <p className="interview-setup-intro">
        Choose what you'd like to practise. Questions and feedback come from a fixed sample set.
      </p>

      <form className="interview-setup-form" onSubmit={handleSubmit} noValidate>
        <div className="interview-setup-grid">
          <label className="interview-field" htmlFor="interview-type">
            Interview Type <span aria-hidden="true">*</span>
            <select
              id="interview-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-invalid={errors.type ? "true" : "false"}
              aria-describedby={errors.type ? "interview-type-error" : undefined}
            >
              <option value="">Select a type…</option>
              {interviewTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="interview-field-error" id="interview-type-error">
                {errors.type}
              </span>
            )}
          </label>

          <label className="interview-field" htmlFor="interview-difficulty">
            Difficulty <span aria-hidden="true">*</span>
            <select
              id="interview-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              aria-invalid={errors.difficulty ? "true" : "false"}
              aria-describedby={errors.difficulty ? "interview-difficulty-error" : undefined}
            >
              <option value="">Select a level…</option>
              {difficultyLevels.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.difficulty && (
              <span className="interview-field-error" id="interview-difficulty-error">
                {errors.difficulty}
              </span>
            )}
          </label>

          <label className="interview-field" htmlFor="interview-role">
            Job Role <span aria-hidden="true">*</span>
            <select
              id="interview-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-invalid={errors.role ? "true" : "false"}
              aria-describedby={errors.role ? "interview-role-error" : undefined}
            >
              <option value="">Select a role…</option>
              {jobRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {errors.role && (
              <span className="interview-field-error" id="interview-role-error">
                {errors.role}
              </span>
            )}
          </label>
        </div>

        {noQuestions && (
          <p className="interview-setup-warning" role="alert">
            No sample questions are available for that combination yet. Try a different type or role.
          </p>
        )}

        <button type="submit" className="btn btn-primary interview-start-btn">
          <Play size={16} /> Start Interview
        </button>
      </form>
    </section>
  );
}
