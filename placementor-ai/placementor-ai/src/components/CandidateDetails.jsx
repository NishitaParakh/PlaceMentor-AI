import Modal from "./Modal.jsx";
import { ClipboardCheck, XCircle, CalendarPlus, Trophy } from "lucide-react";
import "./CandidateDetails.css";

const STATUS_TONE = {
  Applied: "badge-neutral",
  "Under Review": "badge-medium",
  Shortlisted: "badge-low",
  "Interview Scheduled": "badge-medium",
  Selected: "badge-success",
  Rejected: "badge-high",
};

/**
 * Candidate details panel, opened from the table or a job card. Shows
 * the full profile plus an application timeline, with the same
 * shortlist/reject/schedule/select actions as the table row — kept in
 * sync since both call back into the same handlers in
 * RecruiterDashboard.jsx.
 *
 * Props:
 * - isOpen / onClose
 * - candidate: the selected candidate, or null
 * - timeline:  [{ date, event }] for this candidate
 * - onShortlist / onReject / onScheduleInterview / onMarkSelected: called
 *   with the candidate
 */
export default function CandidateDetails({
  isOpen,
  onClose,
  candidate,
  timeline,
  onShortlist,
  onReject,
  onScheduleInterview,
  onMarkSelected,
}) {
  if (!candidate) return null;

  const isFinal = candidate.status === "Selected" || candidate.status === "Rejected";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={candidate.name} maxWidth={620}>
      <div className="candidate-details">
        <div className="candidate-details-head">
          <div>
            <h3>{candidate.name}</h3>
            <span className="candidate-details-role">{candidate.role}</span>
          </div>
          <span className={`badge ${STATUS_TONE[candidate.status] ?? "badge-neutral"}`}>{candidate.status}</span>
        </div>

        <div className="candidate-details-grid">
          <div className="candidate-details-item">
            <span>CGPA</span>
            <strong>{candidate.cgpa}</strong>
          </div>
          <div className="candidate-details-item">
            <span>Projects</span>
            <strong>{candidate.projects}</strong>
          </div>
          <div className="candidate-details-item">
            <span>Resume Status</span>
            <strong>{candidate.resumeStatus}</strong>
          </div>
          <div className="candidate-details-item">
            <span>Interview Status</span>
            <strong>{candidate.interviewStatus}</strong>
          </div>
        </div>

        <div className="candidate-details-skills">
          <span className="candidate-details-label">Skills</span>
          <div className="candidate-details-tags">
            {candidate.skills.map((s) => (
              <span className="badge badge-low" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="candidate-details-timeline">
          <span className="candidate-details-label">Application Timeline</span>
          <ul>
            {timeline.map((t) => (
              <li key={`${t.date}-${t.event}`}>
                <span className="candidate-timeline-date">{t.date}</span>
                <span>{t.event}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="candidate-details-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onShortlist(candidate)}
            disabled={candidate.status === "Shortlisted" || isFinal}
          >
            <ClipboardCheck size={14} /> Shortlist
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onScheduleInterview(candidate)}
            disabled={candidate.status === "Rejected"}
          >
            <CalendarPlus size={14} /> Schedule Interview
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onMarkSelected(candidate)}
            disabled={isFinal}
          >
            <Trophy size={14} /> Mark as Selected
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm candidate-details-reject-btn"
            onClick={() => onReject(candidate)}
            disabled={isFinal}
          >
            <XCircle size={14} /> Reject
          </button>
        </div>
      </div>
    </Modal>
  );
}
