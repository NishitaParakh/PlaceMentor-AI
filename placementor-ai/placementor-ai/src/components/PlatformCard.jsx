import { Github, Code2, Terminal, Trophy, Zap, BookOpen, ExternalLink } from "lucide-react";
import "./PlatformCard.css";

// Data files stay free of JSX, so the icon arrives as a string name and
// gets resolved here.
const ICONS = { Github, Code2, Terminal, Trophy, Zap, BookOpen };

/**
 * One coding/collaboration platform: what it's for, what it builds, the
 * sample activity figures, and a recommendation.
 *
 * Props:
 * - platform: an entry from src/data/codingPlatformsData.js
 */
export default function PlatformCard({ platform }) {
  const Icon = ICONS[platform.icon] ?? Code2;

  return (
    <article className="card platform-card">
      <div className="platform-card-head">
        <div className="platform-card-icon" aria-hidden="true">
          <Icon size={20} />
        </div>
        <div className="platform-card-title">
          <h3>{platform.name}</h3>
          <span>{platform.tagline}</span>
        </div>
      </div>

      <p className="platform-card-desc">{platform.description}</p>

      <div className="platform-card-purpose">
        <span className="platform-card-label">Main purpose</span>
        <span className="platform-card-purpose-text">{platform.purpose}</span>
      </div>

      <div className="platform-card-block">
        <span className="platform-card-label">Skills developed</span>
        <div className="platform-card-skills">
          {platform.skills.map((skill) => (
            <span className="badge badge-low" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="platform-card-block">
        <span className="platform-card-label">Sample activity</span>
        <div className="platform-card-stats">
          {platform.sampleStats.map((stat) => (
            <div className="platform-card-stat" key={stat.label}>
              <span className="platform-card-stat-value">{stat.value}</span>
              <span className="platform-card-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="platform-card-tip">
        <strong>Recommended use:</strong> {platform.recommendation}
      </p>

      <a
        className="btn btn-secondary btn-sm platform-card-link"
        href={platform.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        Visit {platform.name} <ExternalLink size={14} />
      </a>
    </article>
  );
}
