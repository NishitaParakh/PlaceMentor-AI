import { CheckCircle2, FileText, BookOpen, Send, Mic } from "lucide-react";
import "./ActivityList.css";

const ICONS = {
  assessment: CheckCircle2,
  resume: FileText,
  learning: BookOpen,
  application: Send,
  interview: Mic,
};

/**
 * "Recent Activity" feed on the dashboard.
 * Props: items — [{ id, type, text, time }] from src/data/activityData.js
 */
export default function ActivityList({ items }) {
  return (
    <div className="card activity-card">
      <div className="card-title-row">
        <h3>Recent Activity</h3>
      </div>

      <ul className="activity-list">
        {items.map((item) => {
          const Icon = ICONS[item.type] || CheckCircle2;
          return (
            <li key={item.id} className="activity-item">
              <span className="activity-icon">
                <Icon size={15} />
              </span>
              <span className="activity-text">{item.text}</span>
              <span className="activity-time">{item.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
