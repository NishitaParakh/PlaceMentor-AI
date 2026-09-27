import { AlertTriangle, Clock3, CheckCircle2 } from "lucide-react";
import EmptyState from "./EmptyState.jsx";
import { DEMO_TODAY } from "../data/applicationData.js";
import "./DeadlineList.css";

function getUrgency(deadline) {
  const diffDays = Math.round((new Date(deadline) - new Date(DEMO_TODAY)) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: "Completed", className: "urgency-completed", icon: CheckCircle2 };
  if (diffDays <= 4) return { label: "Due Soon", className: "urgency-soon", icon: AlertTriangle };
  return { label: "Upcoming", className: "urgency-upcoming", icon: Clock3 };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

/**
 * "Upcoming Deadlines" card. Props: items — applications (with a
 * deadline) sorted by soonest first, passed in from ApplicationTracker.
 * Urgency (Due Soon / Upcoming / Completed) uses an icon + label, not
 * color alone.
 */
export default function DeadlineList({ items }) {
  return (
    <div className="card deadline-card">
      <div className="card-title-row">
        <h3>Upcoming Deadlines</h3>
      </div>

      {items.length === 0 ? (
        <EmptyState message="No upcoming deadlines — you're all caught up." />
      ) : (
        <ul className="deadline-list">
          {items.map((item) => {
            const urgency = getUrgency(item.deadline);
            const Icon = urgency.icon;
            return (
              <li className="deadline-item" key={item.id}>
                <div className="deadline-item-main">
                  <span className="deadline-item-title">
                    {item.company} · {item.nextStep}
                  </span>
                  <span className="deadline-item-sub">{item.role}</span>
                </div>
                <div className="deadline-item-meta">
                  <span className="deadline-item-date">{formatDate(item.deadline)}</span>
                  <span className={`deadline-badge ${urgency.className}`}>
                    <Icon size={12} />
                    {urgency.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
