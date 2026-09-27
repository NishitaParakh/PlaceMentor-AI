import { Sparkles, Crosshair } from "lucide-react";
import "./SkillProgress.css";

/**
 * "Overall Skill Readiness" summary card at the top of the Skill Gap page.
 * Props: current, target, gap, status, insight — from src/data/skillData.js (skillSummary)
 */
export default function SkillProgress({ current, target, gap, status, insight }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (current / 100) * circumference;

  return (
    <div className="card skill-progress-card">
      <div className="card-title-row">
        <h3>Overall Skill Readiness</h3>
        <span className="demo-tag">Demo Analysis</span>
      </div>

      <div className="skill-progress-top">
        <svg width="136" height="136" viewBox="0 0 136 136">
          <circle cx="68" cy="68" r={radius} fill="none" stroke="var(--surface-alt)" strokeWidth="12" />
          <circle
            cx="68"
            cy="68"
            r={radius}
            fill="none"
            stroke="url(#skill-progress-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 68 68)"
          />
          <defs>
            <linearGradient id="skill-progress-gradient" x1="0" y1="0" x2="136" y2="136" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#7C6CFF" />
            </linearGradient>
          </defs>
          <text x="68" y="64" textAnchor="middle" fontSize="28" fontWeight="700" fontFamily="Space Grotesk" fill="#101534">
            {current}%
          </text>
          <text x="68" y="84" textAnchor="middle" fontSize="11" fontFamily="Inter" fill="#8388A6">
            current
          </text>
        </svg>

        <div className="skill-progress-meta">
          <span className="badge badge-success">{status}</span>

          <div className="skill-progress-row">
            <Crosshair size={15} />
            <span>
              Target readiness <strong>{target}%</strong>
            </span>
          </div>
          <div className="skill-progress-row">
            <span className="skill-progress-gap-dot" />
            <span>
              Current skill gap <strong>{gap}%</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="skill-progress-insight">
        <Sparkles size={15} />
        <p>{insight}</p>
      </div>
    </div>
  );
}
