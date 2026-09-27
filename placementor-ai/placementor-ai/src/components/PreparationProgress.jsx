import { ArrowRight } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./PreparationProgress.css";

function getStatus(percent) {
  if (percent === 100) return "Fully Prepared (Demo)";
  if (percent >= 60) return "Almost Ready";
  if (percent >= 25) return "Building Momentum";
  return "Just Getting Started";
}

/**
 * Rolls the checklist completion into a progress summary: completed vs
 * remaining counts, an overall bar, and a suggested next task (the first
 * unchecked item, so it always points somewhere useful).
 *
 * Props:
 * - total:     total checklist items
 * - completedCount
 * - nextTask:  the task object for the first incomplete item, or null
 */
export default function PreparationProgress({ total, completedCount, nextTask }) {
  const remaining = total - completedCount;
  const percent = total ? Math.round((completedCount / total) * 100) : 0;

  return (
    <section className="card prep-progress">
      <div className="card-title-row">
        <h3>Preparation Progress</h3>
        <span className="demo-tag">Sample Status</span>
      </div>

      <ProgressBar label="Overall preparation" value={percent} />

      <div className="prep-progress-stats">
        <div className="prep-progress-stat">
          <span className="prep-progress-stat-value">{completedCount}</span>
          <span className="prep-progress-stat-label">Completed</span>
        </div>
        <div className="prep-progress-stat">
          <span className="prep-progress-stat-value">{remaining}</span>
          <span className="prep-progress-stat-label">Remaining</span>
        </div>
        <div className="prep-progress-stat">
          <span className="prep-progress-stat-value">{percent}%</span>
          <span className="prep-progress-stat-label">{getStatus(percent)}</span>
        </div>
      </div>

      {nextTask ? (
        <div className="prep-progress-next">
          <ArrowRight size={16} />
          <span>
            <strong>Recommended next:</strong> {nextTask.task}
          </span>
        </div>
      ) : (
        <div className="prep-progress-next prep-progress-next-done">
          <ArrowRight size={16} />
          <span>All checklist items are complete for this demo run.</span>
        </div>
      )}
    </section>
  );
}
