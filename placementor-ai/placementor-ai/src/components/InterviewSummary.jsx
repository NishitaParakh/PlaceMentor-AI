import { Link } from "react-router-dom";
import { Trophy, RotateCcw, LayoutDashboard, TrendingUp, TrendingDown, ListChecks } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./InterviewSummary.css";

/**
 * Step 5 of the mock interview: the closing report.
 *
 * Every number comes from buildInterviewSummary() in interviewData.js,
 * which averages the demo per-question scores — so it's labelled as a
 * demo result throughout.
 *
 * Props:
 * - summary:   output of buildInterviewSummary()
 * - settings:  { type, difficulty, role } the interview was run with
 * - onRestart: returns to the setup step
 */
export default function InterviewSummary({ summary, settings, onRestart }) {
  const { averageScore, attempted, skipped, total, strongAreas, weakAreas, typeAverages, nextSteps } = summary;

  return (
    <section className="card interview-summary">
      <div className="interview-summary-head">
        <div className="interview-summary-icon" aria-hidden="true">
          <Trophy size={22} />
        </div>
        <div>
          <div className="interview-summary-title-row">
            <h2>Interview Complete</h2>
            <span className="demo-tag">Demo Result</span>
          </div>
          <p>
            {settings.type} interview · {settings.difficulty} · {settings.role}
          </p>
        </div>
      </div>

      {/* ---- Headline score ---- */}
      <div className="interview-summary-score">
        <div className="interview-summary-score-value">
          <span>{averageScore}</span>
          <small>/ 100</small>
        </div>
        <div className="interview-summary-score-bar">
          <ProgressBar label="Overall demo score" value={averageScore} />
        </div>
      </div>

      {/* ---- Counts ---- */}
      <div className="interview-summary-stats">
        <div className="interview-summary-stat">
          <span className="interview-summary-stat-value">{attempted}</span>
          <span className="interview-summary-stat-label">Questions attempted</span>
        </div>
        <div className="interview-summary-stat">
          <span className="interview-summary-stat-value">{skipped}</span>
          <span className="interview-summary-stat-label">Questions skipped</span>
        </div>
        <div className="interview-summary-stat">
          <span className="interview-summary-stat-value">{total}</span>
          <span className="interview-summary-stat-label">Total questions</span>
        </div>
      </div>

      {attempted === 0 ? (
        <p className="interview-summary-none">
          You didn't submit any answers this round, so there's no sample feedback to show. Start again
          and answer at least one question to see a demo score.
        </p>
      ) : (
        <>
          {/* ---- Per-type breakdown ---- */}
          {typeAverages.length > 0 && (
            <div className="interview-summary-block">
              <h4>
                <ListChecks size={15} /> Score by question type
              </h4>
              <div className="interview-summary-types">
                {typeAverages.map((t) => (
                  <div className="interview-summary-type" key={t.type}>
                    <ProgressBar label={t.type} value={t.average} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Strong / weak ---- */}
          <div className="interview-summary-grid">
            <div className="interview-summary-block">
              <h4>
                <TrendingUp size={15} /> Strong areas
              </h4>
              {strongAreas.length > 0 ? (
                <div className="interview-summary-tags">
                  {strongAreas.map((a) => (
                    <span className="badge badge-success" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="interview-summary-muted">
                  No area scored above 60 in this demo run yet.
                </p>
              )}
            </div>

            <div className="interview-summary-block">
              <h4>
                <TrendingDown size={15} /> Areas for improvement
              </h4>
              {weakAreas.length > 0 ? (
                <div className="interview-summary-tags">
                  {weakAreas.map((a) => (
                    <span className="badge badge-medium" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="interview-summary-muted">
                  Every area scored above 60 — keep the structure consistent.
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {/* ---- Next steps ---- */}
      <div className="interview-summary-block">
        <h4>Suggested next steps</h4>
        <ul className="interview-summary-steps">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="interview-summary-actions">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          <RotateCcw size={16} /> Restart Interview
        </button>
        <Link to="/dashboard" className="btn btn-secondary">
          <LayoutDashboard size={16} /> Back to Dashboard
        </Link>
      </div>
    </section>
  );
}
