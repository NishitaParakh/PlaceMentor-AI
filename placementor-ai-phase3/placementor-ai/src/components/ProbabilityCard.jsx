import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import "./ProbabilityCard.css";

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="probability-tooltip">
      <span>{label}</span>
      <strong>{payload[0].value}%</strong>
    </div>
  );
}

/**
 * Placement Probability card: current value, month-over-month change,
 * and a small trend chart. All figures are sample data — see the
 * "Demo AI Prediction" tag.
 *
 * Props: current, changePercent, note, trend — from probabilityData.js
 */
export default function ProbabilityCard({ current, changePercent, note, trend }) {
  const isUp = changePercent >= 0;

  return (
    <div className="card probability-card">
      <div className="card-title-row">
        <h3>Placement Probability</h3>
        <span className="demo-tag">Demo AI Prediction</span>
      </div>

      <div className="probability-value-row">
        <span className="probability-value">{current}%</span>
        <span className={`probability-change ${isUp ? "up" : "down"}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(changePercent)}%
        </span>
      </div>
      <p className="probability-caption">Compared with last month</p>

      <div className="probability-chart">
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={trend} margin={{ top: 6, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="probability-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "var(--ink-faint)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip content={<TrendTooltip />} />
            <Area
              type="monotone"
              dataKey="probability"
              stroke="#4F46E5"
              strokeWidth={2.5}
              fill="url(#probability-fill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="probability-note">{note}</p>
    </div>
  );
}
