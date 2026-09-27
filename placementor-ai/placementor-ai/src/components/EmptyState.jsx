import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import "./EmptyState.css";

/**
 * Reusable "nothing to show" message, used anywhere a list/table/chart
 * can come back empty — no applications, no skills matching a filter,
 * no upcoming deadlines, no trend data for the current selection, etc.
 *
 * Two sizes:
 * - compact (default): a single centered line, meant to sit inside an
 *   existing card/table/chart that already has its own padding
 *   (e.g. "No skills match your current filters.")
 * - full: icon + title + message + optional action button, for a
 *   standalone empty section (e.g. the Application Tracker with zero
 *   applications at all)
 *
 * Props:
 * - icon:        lucide icon component (full size only; defaults to Inbox)
 * - title:       heading text (full size only)
 * - message:     the empty-state sentence (required)
 * - actionLabel: optional button/link text
 * - actionTo:    optional route — renders the action as a <Link>
 * - onAction:    optional click handler — renders the action as a <button>
 * - compact:     true (default) for the inline one-liner, false for the
 *                full icon+title+button layout
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
  compact = true,
}) {
  if (compact) {
    return <p className="empty-state-compact">{message}</p>;
  }

  return (
    <div className="empty-state-full">
      <div className="empty-state-icon">
        <Icon size={22} />
      </div>
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
