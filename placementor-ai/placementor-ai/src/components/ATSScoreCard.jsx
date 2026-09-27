import { Sparkles } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./ATSScoreCard.css";

function getBand(score) {
  if (score >= 80) return { label: "Strong ATS match", tone: "badge-success" };
  if (score >= 60) return { label: "Moderate ATS match", tone: "badge-medium" };
  return { label: "Needs significant work", tone: "badge-high" };
}

/**
 * The headline of the resume report: a radial ATS score gauge plus the
 * six scored summary dimensions.
 *
 * Follows the same gauge construction as the dashboard's ReadinessScore
 * card so the two read as part of one design system.
 *
 * Props:
 * - score:   0–100 sample ATS score
 * - summary: [{ key, label, value, note }] from resumeData.js
 */
export default function ATSScoreCard({ score, summary }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const band = getBand(score);

  return (
    <section className="card ats-score-card">
      <div className="card-title-row">
        <h3>Sample ATS Score</h3>
        <span className="demo-tag">Demo Analysis</span>
      </div>

      <div className="ats-score-top">
        <div className="ats-gauge">
          <svg width="152" height="152" viewBox="0 0 152 152" role="img" aria-label={`Sample ATS score ${score} out of 100`}>
            <circle cx="76" cy="76" r={radius} fill="none" stroke="var(--surface-alt)" strokeWidth="13" />
            <circle
              cx="76"
              cy="76"
              r={radius}
              fill="none"
              stroke="url(#ats-gradient)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 76 76)"
            />
            <defs>
              <linearGradient id="ats-gradient" x1="0" y1="0" x2="152" y2="152" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#7C6CFF" />
              </linearGradient>
            </defs>
            <text x="76" y="72" textAnchor="middle" fontSize="34" fontWeight="700" fontFamily="Space Grotesk" fill="#101534">
              {score}
            </text>
            <text x="76" y="94" textAnchor="middle" fontSize="12" fontFamily="Inter" fill="#8388A6">
              out of 100
            </text>
          </svg>
          <span className={`badge ${band.tone} ats-gauge-status`}>{band.label}</span>
        </div>

        <div className="ats-summary">
          {summary.map((item) => (
            <div className="ats-summary-item" key={item.key}>
              <ProgressBar label={item.label} value={item.value} size="sm" />
              <span className="ats-summary-note">{item.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ats-score-footer">
        <Sparkles size={16} />
        <p>
          This score is a fixed sample figure, not the result of parsing your file. A real ATS score will
          be produced by the backend once resume parsing is connected.
        </p>
      </div>
    </section>
  );
}
