import { Link } from "react-router-dom";
import { Circle } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./ProfileCompletion.css";

/**
 * "Complete your profile" card.
 * Props: percent (0–100), missingItems (string[])
 */
export default function ProfileCompletion({ percent, missingItems }) {
  return (
    <div className="card profile-completion-card">
      <div className="card-title-row">
        <h3>Complete your profile</h3>
        <span className="profile-completion-percent">{percent}%</span>
      </div>

      <ProgressBar value={percent} size="sm" />

      <div className="profile-completion-missing">
        <span>Missing:</span>
        <ul>
          {missingItems.map((item) => (
            <li key={item}>
              <Circle size={7} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link to="/profile" className="btn btn-secondary btn-sm profile-completion-btn">
        Complete Profile
      </Link>
    </div>
  );
}
