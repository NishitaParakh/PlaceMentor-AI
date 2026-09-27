import { FileCheck2, ClipboardCheck, ClipboardList, Users, Trophy, XCircle, Undo2 } from "lucide-react";
import "./StatusBadge.css";

// Each status pairs a distinct color AND a distinct icon + text label —
// so status is never communicated by color alone (accessibility).
const STATUS_META = {
  Applied: { icon: FileCheck2, className: "status-badge-applied" },
  Shortlisted: { icon: ClipboardCheck, className: "status-badge-shortlisted" },
  Assessment: { icon: ClipboardList, className: "status-badge-assessment" },
  Interview: { icon: Users, className: "status-badge-interview" },
  Offer: { icon: Trophy, className: "status-badge-offer" },
  Rejected: { icon: XCircle, className: "status-badge-rejected" },
  Withdrawn: { icon: Undo2, className: "status-badge-withdrawn" },
};

/**
 * Application status pill used in the table, details view and filters.
 * Props: status — one of the APPLICATION_STATUSES; size — "sm" | "md"
 */
export default function StatusBadge({ status, size = "md" }) {
  const meta = STATUS_META[status] ?? STATUS_META.Applied;
  const Icon = meta.icon;

  return (
    <span className={`status-badge ${meta.className} status-badge-${size}`}>
      <Icon size={size === "sm" ? 12 : 13} />
      {status}
    </span>
  );
}
