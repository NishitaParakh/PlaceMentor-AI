import ProgressBar from "./ProgressBar.jsx";
import "./TaskList.css";

const PRIORITY_LABEL = { high: "High Priority", medium: "Medium Priority", low: "Low Priority" };

/**
 * "Your Next Steps" task list on the dashboard.
 * Props: items — [{ id, title, priority, progress, actionLabel }] from src/data/taskData.js
 */
export default function TaskList({ items }) {
  return (
    <div className="card task-card">
      <div className="card-title-row">
        <h3>Your Next Steps</h3>
      </div>

      <ul className="task-list">
        {items.map((task, i) => (
          <li key={task.id} className="task-item">
            <div className="task-item-top">
              <span className="task-item-index">{i + 1}</span>
              <span className="task-item-title">{task.title}</span>
              <span className={`badge badge-${task.priority}`}>{PRIORITY_LABEL[task.priority]}</span>
            </div>
            <div className="task-item-bottom">
              <ProgressBar value={task.progress} size="sm" tone={task.priority === "high" ? "warning" : "primary"} />
              <button className="btn btn-secondary btn-sm task-action">{task.actionLabel} →</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
