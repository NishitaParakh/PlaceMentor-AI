import { CheckCircle2, Loader, Circle, ChevronDown, Clock, BarChart3 } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import RoadmapTask from "./RoadmapTask.jsx";
import "./RoadmapCard.css";

const STATUS_META = {
  completed: { label: "Completed", icon: CheckCircle2, markerClass: "roadmap-marker-completed", badgeClass: "badge-success" },
  "in-progress": { label: "In Progress", icon: Loader, markerClass: "roadmap-marker-progress", badgeClass: "badge-neutral" },
  upcoming: { label: "Upcoming", icon: Circle, markerClass: "roadmap-marker-upcoming", badgeClass: "badge-low" },
};

/**
 * One week of the roadmap timeline. Click the header to expand/collapse
 * learning objectives, topics and tasks.
 *
 * Props:
 * - week:       a roadmapData entry, plus a live-computed `progress`/`status`
 * - expanded:   whether this card is open
 * - onToggleExpand
 * - onToggleTask(taskIndex)
 */
export default function RoadmapCard({ week, expanded, onToggleExpand, onToggleTask }) {
  const meta = STATUS_META[week.status];
  const StatusIcon = meta.icon;

  return (
    <div className={`roadmap-card ${expanded ? "expanded" : ""}`} id={`week-${week.id}`}>
      <div className={`roadmap-card-marker ${meta.markerClass}`}>
        <StatusIcon size={16} />
      </div>

      <div className="card roadmap-card-body">
        <button className="roadmap-card-header" onClick={onToggleExpand} aria-expanded={expanded}>
          <div className="roadmap-card-header-text">
            <span className="roadmap-card-week">Week {week.week}</span>
            <h3>{week.title}</h3>
          </div>
          <div className="roadmap-card-header-right">
            <span className={`badge ${meta.badgeClass}`}>{meta.label}</span>
            <ChevronDown size={18} className={`roadmap-card-chevron ${expanded ? "open" : ""}`} />
          </div>
        </button>

        <div className="roadmap-card-quickstats">
          <span>
            <Clock size={13} /> {week.duration}
          </span>
          <span>
            <BarChart3 size={13} /> {week.difficulty}
          </span>
          <span className="roadmap-card-skills">{week.skills.join(" · ")}</span>
        </div>

        <ProgressBar value={week.progress} size="sm" tone={week.status === "upcoming" ? "primary" : "success"} />

        {expanded && (
          <div className="roadmap-card-details">
            <p className="roadmap-card-description">{week.description}</p>

            <span className="roadmap-card-tasks-label">Tasks</span>
            <ul className="roadmap-card-tasks">
              {week.tasks.map((task, i) => (
                <RoadmapTask key={task.title} task={task} onToggle={() => onToggleTask(i)} />
              ))}
            </ul>
          </div>
        )}

        <button className="btn btn-secondary btn-sm roadmap-card-continue" onClick={onToggleExpand}>
          {expanded ? "Collapse" : "Continue"} →
        </button>
      </div>
    </div>
  );
}
