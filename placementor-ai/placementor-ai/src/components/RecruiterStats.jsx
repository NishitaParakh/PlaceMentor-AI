import { Briefcase, Users, ClipboardCheck, CalendarDays, Trophy, Clock3 } from "lucide-react";
import StatCard from "./StatCard.jsx";
import "./RecruiterStats.css";

const ICONS = {
  openings: Briefcase,
  applicants: Users,
  shortlisted: ClipboardCheck,
  interviews: CalendarDays,
  selected: Trophy,
  pending: Clock3,
};

/**
 * Summary stat row for the Recruiter Dashboard — reuses StatCard from the
 * student dashboard so both areas share one visual language.
 *
 * Props:
 * - stats: recruiterStats from src/data/recruiterData.js
 */
export default function RecruiterStats({ stats }) {
  return (
    <div className="recruiter-stats">
      {stats.map((s) => (
        <StatCard key={s.key} icon={ICONS[s.key] ?? Briefcase} value={s.value} label={s.label} trend={s.trend} />
      ))}
    </div>
  );
}
