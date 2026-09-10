import "./ProgressBar.css";

/**
 * A labeled horizontal progress bar, reused across the readiness score,
 * readiness breakdown, and profile completion card.
 *
 * Props:
 * - label:    text shown above the bar
 * - value:    0–100
 * - size:     "sm" | "md" (defaults to "md")
 * - tone:     "primary" | "success" | "warning" (defaults to "primary")
 */
export default function ProgressBar({ label, value, size = "md", tone = "primary" }) {
  return (
    <div className={`progress-bar progress-bar-${size}`}>
      {label && (
        <div className="progress-bar-top">
          <span>{label}</span>
          <span className="progress-bar-value">{value}%</span>
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill progress-bar-fill-${tone}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
