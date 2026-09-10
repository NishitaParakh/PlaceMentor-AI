import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./ReadinessScore.css";

function getStatus(score) {
  if (score >= 80) return "Excellent Progress";
  if (score >= 60) return "Good Progress";
  if (score >= 40) return "Building Momentum";
  return "Needs Attention";
}

/**
 * The dashboard's centerpiece card: overall readiness score as a radial
 * gauge, a compact per-category breakdown, and a short AI-style insight.
 *
 * Props:
 * - score:      0–100
 * - categories: [{ key, label }] — from src/data/readinessData.js
 * - breakdown:  { [key]: number } — from studentData.readinessBreakdown
 * - insight:    { text, lastUpdated }
 */
export default function ReadinessScore({ score, categories, breakdown, insight }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card readiness-card">
      <div className="card-title-row">
        <h3>AI Placement Readiness</h3>
        <span className="demo-tag">Sample prediction</span>
      </div>

      <div className="readiness-top">
        <div className="readiness-gauge">
          <svg width="152" height="152" viewBox="0 0 152 152">
            <circle cx="76" cy="76" r={radius} fill="none" stroke="var(--surface-alt)" strokeWidth="13" />
            <circle
              cx="76"
              cy="76"
              r={radius}
              fill="none"
              stroke="url(#readiness-gradient)"
              strokeWidth="13"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 76 76)"
            />
            <defs>
              <linearGradient id="readiness-gradient" x1="0" y1="0" x2="152" y2="152" gradientUnits="userSpaceOnUse">
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
          <span className="badge badge-success readiness-status">{getStatus(score)}</span>
        </div>

        <div className="readiness-categories">
          {categories.map((cat) => (
            <ProgressBar key={cat.key} label={cat.label} value={breakdown[cat.key]} size="sm" />
          ))}
        </div>
      </div>

      <div className="readiness-insight">
        <Sparkles size={16} />
        <p>{insight.text}</p>
      </div>

      <div className="readiness-footer">
        <span className="readiness-updated">Last updated: {insight.lastUpdated}</span>
        <Link to="/readiness" className="card-link">
          View Detailed Analysis →
        </Link>
      </div>
    </div>
  );
}
