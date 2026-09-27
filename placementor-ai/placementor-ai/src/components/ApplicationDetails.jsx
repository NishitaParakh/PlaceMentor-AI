import { CalendarDays, Clock, Briefcase, MapPin, Pencil } from "lucide-react";
import Modal from "./Modal.jsx";
import StatusBadge from "./StatusBadge.jsx";
import "./ApplicationDetails.css";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Full detail view for a single application: key facts + notes + a
 * vertical timeline of everything that's happened so far. Props:
 * application — the app object (or null to keep the modal mounted-off),
 * onEdit(app) — opens ApplicationModal pre-filled for this application.
 */
export default function ApplicationDetails({ isOpen, onClose, application, onEdit }) {
  if (!application) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${application.company} — ${application.role}`} maxWidth={620}>
      <div className="app-details">
        <div className="app-details-top">
          <StatusBadge status={application.status} />
          <button className="btn btn-secondary btn-sm" onClick={() => onEdit(application)}>
            <Pencil size={14} /> Edit Application
          </button>
        </div>

        <div className="app-details-grid">
          <div className="app-details-item">
            <CalendarDays size={16} />
            <div>
              <span>Applied On</span>
              <strong>{formatDate(application.appliedDate)}</strong>
            </div>
          </div>
          <div className="app-details-item">
            <Clock size={16} />
            <div>
              <span>Deadline</span>
              <strong>{formatDate(application.deadline)}</strong>
            </div>
          </div>
          <div className="app-details-item">
            <Briefcase size={16} />
            <div>
              <span>Job Type</span>
              <strong>{application.jobType}</strong>
            </div>
          </div>
          <div className="app-details-item">
            <MapPin size={16} />
            <div>
              <span>Location</span>
              <strong>{application.location}</strong>
            </div>
          </div>
        </div>

        {application.notes && (
          <div className="app-details-notes">
            <span>Notes</span>
            <p>{application.notes}</p>
          </div>
        )}

        <div className="app-details-timeline">
          <span className="app-details-timeline-title">Application Timeline</span>
          <ul>
            {application.timeline.map((event, i) => (
              <li key={i}>
                <span className="app-details-timeline-dot" />
                <div className="app-details-timeline-text">
                  <span className="app-details-timeline-date">{formatDate(event.date)}</span>
                  <span className="app-details-timeline-event">{event.event}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
