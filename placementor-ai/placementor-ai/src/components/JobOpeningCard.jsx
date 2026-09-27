import { Users, GraduationCap, CalendarClock, MapPin, Eye, Pencil, Lock } from "lucide-react";
import "./JobOpeningCard.css";

// Status drives badge tone + label together — never colour alone.
const STATUS_TONE = {
  Active: "badge-success",
  Draft: "badge-low",
  "Under Review": "badge-medium",
  Closed: "badge-high",
};

/**
 * One job opening card in the recruiter's job list.
 *
 * Props:
 * - job:            an entry from src/data/recruiterData.js jobOpenings
 * - onViewDetails / onEdit / onCloseJob: called with the job id
 */
export default function JobOpeningCard({ job, onViewDetails, onEdit, onCloseJob }) {
  const isClosed = job.status === "Closed";

  return (
    <article className="card job-card">
      <div className="job-card-head">
        <div>
          <h3>{job.title}</h3>
          <span className="job-card-dept">{job.department}</span>
        </div>
        <span className={`badge ${STATUS_TONE[job.status] ?? "badge-neutral"}`}>{job.status}</span>
      </div>

      <div className="job-card-meta">
        <span>
          <MapPin size={13} /> {job.location}
        </span>
        <span>{job.type}</span>
      </div>

      <div className="job-card-skills">
        {job.skills.map((s) => (
          <span className="badge badge-low" key={s}>
            {s}
          </span>
        ))}
      </div>

      <div className="job-card-stats">
        <div className="job-card-stat">
          <GraduationCap size={14} />
          <span>{job.minCgpa}+ CGPA</span>
        </div>
        <div className="job-card-stat">
          <Users size={14} />
          <span>{job.applicants} applicants</span>
        </div>
        <div className="job-card-stat">
          <CalendarClock size={14} />
          <span>Due {job.deadline}</span>
        </div>
      </div>

      <div className="job-card-actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onViewDetails(job.id)}>
          <Eye size={14} /> View Details
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onEdit(job.id)}>
          <Pencil size={14} /> Edit
        </button>
        {!isClosed && (
          <button type="button" className="btn btn-ghost btn-sm job-card-close-btn" onClick={() => onCloseJob(job.id)}>
            <Lock size={14} /> Close Job
          </button>
        )}
      </div>
    </article>
  );
}
