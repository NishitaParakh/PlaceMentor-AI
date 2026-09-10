import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import "./InsightCard.css";

/**
 * Standalone "AI Career Insight" card. Reused wherever a short, AI-styled
 * recommendation needs to sit on its own (currently just the dashboard).
 *
 * Props: text — the insight sentence; to — where "View Recommendations" links
 */
export default function InsightCard({ text, to = "/roadmap" }) {
  return (
    <div className="card insight-card">
      <div className="insight-card-icon">
        <Bot size={20} />
      </div>
      <div className="insight-card-body">
        <div className="card-title-row">
          <h3>AI Career Insight</h3>
          <span className="demo-tag">Sample content</span>
        </div>
        <p>{text}</p>
        <Link to={to} className="card-link">
          View Recommendations →
        </Link>
      </div>
    </div>
  );
}
