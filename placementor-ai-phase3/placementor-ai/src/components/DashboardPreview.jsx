import { TrendingUp, CheckCircle2 } from "lucide-react";
import "./DashboardPreview.css";

// A static visual mockup of the student dashboard, used on the landing
// hero and login panel. This is illustration only — the real, data-driven
// version is built in Phase 2 (src/pages/StudentDashboard.jsx).
export default function DashboardPreview() {
  const score = 82;
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  const bars = [86, 78, 81, 84, 79, 75];

  return (
    <div className="preview-card" role="img" aria-label="Preview of the placement readiness dashboard">
      <div className="preview-card-header">
        <span>Placement readiness</span>
        <span className="preview-pill">
          <CheckCircle2 size={13} /> Excellent progress
        </span>
      </div>

      <div className="preview-score-row">
        <svg width="104" height="104" viewBox="0 0 104 104">
          <circle cx="52" cy="52" r="42" fill="none" stroke="#ECECF7" strokeWidth="10" />
          <circle
            cx="52"
            cy="52"
            r="42"
            fill="none"
            stroke="url(#preview-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 52 52)"
          />
          <defs>
            <linearGradient id="preview-gradient" x1="0" y1="0" x2="104" y2="104" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#7C6CFF" />
            </linearGradient>
          </defs>
          <text x="52" y="48" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="Space Grotesk" fill="#101534">
            {score}
          </text>
          <text x="52" y="66" textAnchor="middle" fontSize="10" fontFamily="Inter" fill="#8388A6">
            out of 100
          </text>
        </svg>

        <div className="preview-bars">
          {bars.map((value, i) => (
            <div className="preview-bar-track" key={i}>
              <div className="preview-bar-fill" style={{ height: `${value}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="preview-footer">
        <TrendingUp size={15} />
        <span>Placement probability up 8.4% this month</span>
      </div>
    </div>
  );
}
