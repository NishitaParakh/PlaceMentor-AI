import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./RecruitmentAnalytics.css";

// Same palette and tooltip styling as PlacementCharts.jsx, so the
// recruiter view reads as part of the same design system.
const COLORS = ["#4f46e5", "#7c6cff", "#12946f", "#b5720a", "#c23a3a", "#8388a6"];
const TOOLTIP_STYLE = { borderRadius: 10, border: "1px solid var(--line)", fontSize: 13, boxShadow: "var(--shadow-md)" };
const AXIS_TICK = { fontSize: 12, fill: "var(--ink-faint)" };

/**
 * Six self-contained analytics panels for the Recruiter Dashboard —
 * dummy figures only, clearly labelled throughout the page as sample
 * recruitment analytics.
 *
 * Props: all data arrays from src/data/recruiterData.js
 */
export default function RecruitmentAnalytics({
  applicationsByRole,
  statusDistribution,
  applicationsOverTime,
  hiringFunnel,
  selectedByRole,
}) {
  return (
    <div className="recruiter-analytics-grid">
      <div className="card chart-card">
        <div className="card-title-row">
          <h3>Applications by Job Role</h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={applicationsByRole} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid stroke="var(--line-soft)" vertical={false} />
            <XAxis dataKey="role" tick={AXIS_TICK} interval={0} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={AXIS_TICK} allowDecimals={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="applications" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <div className="card-title-row">
          <h3>Candidate Status Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusDistribution}
              dataKey="count"
              nameKey="status"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {statusDistribution.map((entry, i) => (
                <Cell key={entry.status} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <div className="card-title-row">
          <h3>Applications Over Time</h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={applicationsOverTime} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid stroke="var(--line-soft)" vertical={false} />
            <XAxis dataKey="week" tick={AXIS_TICK} />
            <YAxis tick={AXIS_TICK} allowDecimals={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="applications" stroke="#4f46e5" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card">
        <div className="card-title-row">
          <h3>Hiring Funnel</h3>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart layout="vertical" data={hiringFunnel} margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--line-soft)" horizontal={false} />
            <XAxis type="number" tick={AXIS_TICK} allowDecimals={false} />
            <YAxis type="category" dataKey="stage" tick={AXIS_TICK} width={110} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="count" fill="#7c6cff" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card chart-card recruiter-analytics-wide">
        <div className="card-title-row">
          <h3>Selected Candidates by Role</h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={selectedByRole} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
            <CartesianGrid stroke="var(--line-soft)" vertical={false} />
            <XAxis dataKey="role" tick={AXIS_TICK} interval={0} angle={-15} textAnchor="end" height={55} />
            <YAxis tick={AXIS_TICK} allowDecimals={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="selected" fill="#12946f" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
