import { useState } from "react";
import { Building2, User, Briefcase, MapPin, Mail, Pencil } from "lucide-react";
import "./RecruiterProfile.css";

/**
 * Recruiter/company information card. Edit Profile is a prototype action
 * only — it shows an inline "not available in this demo" note rather than
 * opening a real edit flow, since no backend exists yet to persist changes.
 *
 * Props:
 * - profile: recruiterProfile from src/data/recruiterData.js
 */
export default function RecruiterProfile({ profile }) {
  const [showEditNote, setShowEditNote] = useState(false);

  return (
    <section className="card recruiter-profile">
      <div className="recruiter-profile-top">
        <div className="recruiter-profile-logo" aria-hidden="true">
          <Building2 size={22} />
        </div>
        <div className="recruiter-profile-heading">
          <h3>{profile.companyName}</h3>
          <span>{profile.industry}</span>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm recruiter-edit-btn"
          onClick={() => setShowEditNote((v) => !v)}
        >
          <Pencil size={14} /> Edit Profile
        </button>
      </div>

      {showEditNote && (
        <p className="recruiter-edit-note" role="status">
          Editing isn't available in this prototype yet — profile changes will be saved once the backend
          is connected.
        </p>
      )}

      <div className="recruiter-profile-grid">
        <div className="recruiter-profile-item">
          <User size={15} />
          <div>
            <span className="recruiter-profile-label">Recruiter</span>
            <span className="recruiter-profile-value">{profile.recruiterName}</span>
          </div>
        </div>
        <div className="recruiter-profile-item">
          <Briefcase size={15} />
          <div>
            <span className="recruiter-profile-label">Role</span>
            <span className="recruiter-profile-value">{profile.role}</span>
          </div>
        </div>
        <div className="recruiter-profile-item">
          <MapPin size={15} />
          <div>
            <span className="recruiter-profile-label">Location</span>
            <span className="recruiter-profile-value">{profile.location}</span>
          </div>
        </div>
        <div className="recruiter-profile-item">
          <Mail size={15} />
          <div>
            <span className="recruiter-profile-label">Contact</span>
            <span className="recruiter-profile-value">{profile.contact}</span>
          </div>
        </div>
      </div>

      <div className="recruiter-profile-footer">
        <span className="badge badge-neutral">{profile.openPositions} Open Positions</span>
        <span className="badge badge-low">{profile.placementDrive}</span>
      </div>
    </section>
  );
}
