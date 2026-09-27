import { FileText, ClipboardCheck, CalendarClock, Trophy, Briefcase, RefreshCw } from "lucide-react";
import "./ActivityTimeline.css";

const ICONS = {
  application: FileText,
  shortlist: ClipboardCheck,
  interview: CalendarClock,
  selected: Trophy,
  job: Briefcase,
  status: RefreshCw,
};

/**
 * Recent recruitment activity feed. A separate component from the
 * student dashboard's ActivityList since the icon set and event types
 * are recruiter-specific (applications, shortlists, interviews, hires)
 * rather than student prep activity.
 *
 * Props: items — [{ id, type, text, time }] from recruiterData.js
 */
export default function ActivityTimeline({ items }) {
  return (
    <div className="card recruiter-activity-card">
      <div className="card-title-row">
        <h3>Recruitment Activity</h3>
      </div>

      <ul className="recruiter-activity-list">
        {items.map((item) => {
          const Icon = ICONS[item.type] ?? FileText;
          return (
            <li key={item.id} className="recruiter-activity-item">
              <span className="recruiter-activity-icon">
                <Icon size={15} />
              </span>
              <span className="recruiter-activity-text">{item.text}</span>
              <span className="recruiter-activity-time">{item.time}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
