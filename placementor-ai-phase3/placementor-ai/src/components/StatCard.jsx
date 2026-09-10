import "./StatCard.css";

/**
 * One quick-stat tile in the dashboard's top stats row.
 *
 * Props:
 * - icon:  lucide-react icon component
 * - value: main number, e.g. "14/18" or "92%"
 * - label: what the number is, e.g. "Skills Matched"
 * - trend: short change string, e.g. "+2 this month"
 */
export default function StatCard({ icon: Icon, value, label, trend }) {
  return (
    <div className="card stat-card">
      <div className="stat-card-icon">
        <Icon size={19} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {trend && <div className="stat-card-trend">{trend}</div>}
    </div>
  );
}
