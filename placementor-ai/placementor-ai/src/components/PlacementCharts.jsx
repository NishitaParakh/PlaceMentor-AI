import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import EmptyState from "./EmptyState.jsx";
import "./PlacementCharts.css";

const COLORS = ["#4f46e5", "#7c6cff", "#12946f", "#b5720a", "#c23a3a", "#8388a6"];
const TOOLTIP_STYLE = { borderRadius: 10, border: "1px solid var(--line)", fontSize: 13, boxShadow: "var(--shadow-md)" };
const AXIS_TICK = { fontSize: 12, fill: "var(--ink-faint)" };

/**
 * Five self-contained, responsive Recharts panels for the Placement
 * Trends page. Each takes its data as a prop so the page can re-filter
 * (year / role / company type / time range) without touching these
 * components — they just re-render with whatever they're given.
 */

export function PackageTrendChart({ data }) {
  return (
    <div className="card chart-card">
      <div className="card-title-row">
        <h3>Average Package Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="var(--line-soft)" vertical={false} />
          <XAxis dataKey="year" tick={AXIS_TICK} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} unit=" LPA" width={64} />
          <Tooltip formatter={(v) => [`₹${v} LPA`, "Average Package"]} contentStyle={TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: 12.5 }} />
          <Line
            type="monotone"
            dataKey="package"
            name="Average Package (LPA)"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PlacementRateChart({ data }) {
  return (
    <div className="card chart-card">
      <div className="card-title-row">
        <h3>Placement Rate</h3>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="rateFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--line-soft)" vertical={false} />
          <XAxis dataKey="year" tick={AXIS_TICK} axisLine={{ stroke: "var(--line)" }} tickLine={false} />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} unit="%" width={48} />
          <Tooltip formatter={(v) => [`${v}%`, "Placement Rate"]} contentStyle={TOOLTIP_STYLE} />
          <Area type="monotone" dataKey="rate" name="Placement Rate" stroke="var(--accent)" strokeWidth={2.5} fill="url(#rateFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompanyHiringChart({ data }) {
  return (
    <div className="card chart-card">
      <div className="card-title-row">
        <h3>Top Hiring Companies</h3>
      </div>
      {data.length === 0 ? (
        <EmptyState message="No companies match this filter." />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
            <CartesianGrid stroke="var(--line-soft)" horizontal={false} />
            <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="company" tick={{ ...AXIS_TICK, fill: "var(--ink)", fontSize: 12.5 }} axisLine={false} tickLine={false} width={92} />
            <Tooltip formatter={(v) => [`${v} hires`, "Hires"]} contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="hires" fill="var(--primary)" radius={[0, 6, 6, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export function JobRoleChart({ data }) {
  return (
    <div className="card chart-card">
      <div className="card-title-row">
        <h3>Popular Job Roles</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="role" innerRadius={60} outerRadius={92} paddingAngle={2}>
            {data.map((entry, i) => (
              <Cell key={entry.role} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={TOOLTIP_STYLE} />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontSize: 12.5, color: "var(--ink-soft)" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PackageByRoleChart({ data, highlightRole }) {
  return (
    <div className="card chart-card">
      <div className="card-title-row">
        <h3>Average Package by Role</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 24 }}>
          <CartesianGrid stroke="var(--line-soft)" vertical={false} />
          <XAxis
            dataKey="role"
            tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
            axisLine={{ stroke: "var(--line)" }}
            tickLine={false}
            angle={-18}
            textAnchor="end"
            interval={0}
            height={54}
          />
          <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} unit=" LPA" width={56} />
          <Tooltip formatter={(v) => [`₹${v} LPA`, "Average Package"]} contentStyle={TOOLTIP_STYLE} />
          <Bar dataKey="package" radius={[6, 6, 0, 0]} barSize={30}>
            {data.map((entry) => (
              <Cell key={entry.role} fill={entry.role === highlightRole ? "var(--accent)" : "var(--primary)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
