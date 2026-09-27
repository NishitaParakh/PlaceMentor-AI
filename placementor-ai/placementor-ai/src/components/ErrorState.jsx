import { AlertCircle } from "lucide-react";
import "./ErrorState.css";

/**
 * Frontend-only error placeholder for a future failed API call — nothing
 * here talks to a real backend today, but every function in
 * src/services/api.js is already written to be swapped for a real
 * fetch() later (see that file's comments), and a real fetch can reject.
 * Drop this in wherever a page/section handles that rejected state.
 *
 * Props:
 * - message: user-friendly explanation (defaults to a generic one)
 * - onRetry: optional callback — shows a "Try Again" button when passed
 */
export default function ErrorState({ message = "We could not load this information. Please try again.", onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon">
        <AlertCircle size={22} />
      </div>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
