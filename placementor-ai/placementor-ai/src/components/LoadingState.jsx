import "./LoadingState.css";

/**
 * Generic "fetching data" indicator for any future page/section that
 * loads through src/services/api.js. Student Dashboard uses its own
 * layout-matching skeleton (see StudentDashboard.jsx's DashboardSkeleton)
 * since it already knows its final shape; this component is for simpler
 * spots — a card, a chart, a section — that just need a lightweight
 * "loading…" placeholder while a mock (later: real) API call resolves.
 *
 * Props:
 * - message: text shown next to the spinner (defaults to "Loading…")
 * - compact: true for a small inline spinner+text row, false (default)
 *            for a centered block with more breathing room
 */
export default function LoadingState({ message = "Loading…", compact = false }) {
  return (
    <div className={compact ? "loading-state loading-state-compact" : "loading-state"} role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
