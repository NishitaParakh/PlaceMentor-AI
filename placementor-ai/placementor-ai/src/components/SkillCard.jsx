import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";
import "./SkillCard.css";

const PRIORITY_CLASS = { High: "badge-high", Medium: "badge-medium", Low: "badge-low" };

/**
 * One skill's visual card — used in the Skill Gap Analysis grid view.
 * Props: skill — { name, category, current, target, priority }
 */
export default function SkillCard({ skill }) {
  const gap = Math.max(0, skill.target - skill.current);

  return (
    <div className={`card skill-card ${skill.priority === "High" ? "skill-card-high" : ""}`}>
      <div className="skill-card-top">
        <div>
          <h4>{skill.name}</h4>
          <span className="skill-card-category">{skill.category}</span>
        </div>
        <span className={`badge ${PRIORITY_CLASS[skill.priority]}`}>{skill.priority} priority</span>
      </div>

      <div className="skill-card-stats">
        <div>
          <span className="skill-card-stat-value">{skill.current}%</span>
          <span className="skill-card-stat-label">Current</span>
        </div>
        <div>
          <span className="skill-card-stat-value">{skill.target}%</span>
          <span className="skill-card-stat-label">Target</span>
        </div>
        <div>
          <span className="skill-card-stat-value skill-card-gap">{gap}%</span>
          <span className="skill-card-stat-label">Gap</span>
        </div>
      </div>

      <ProgressBar value={skill.current} size="sm" tone={skill.priority === "High" ? "warning" : "primary"} />

      <Link to="/roadmap" className="btn btn-secondary btn-sm skill-card-btn">
        Improve Skill →
      </Link>
    </div>
  );
}
