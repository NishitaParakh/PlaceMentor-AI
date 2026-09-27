import { TrendingUp, TrendingDown } from "lucide-react";
import "./TrendMetricCard.css";

/**
 * One metric tile on the Placement Trends page — visually consistent
 * with StatCard, plus an optional up/down trend indicator for growth
 * figures.
 *
 * Props: icon, value, label, trend (optional caption), trendDirection —
 * "up" | "down" (defaults to "up")
 */
export default function TrendMetricCard({ icon: Icon, value, label, trend, trendDirection = "up" }) {
  const TrendIcon = trendDirection === "down" ? TrendingDown : TrendingUp;

  return (
    <div className="card stat-card trend-metric-card">
      <div className="stat-card-icon">
        <Icon size={19} />
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
      {trend && (
        <div className={`trend-metric-trend trend-metric-trend-${trendDirection}`}>
          <TrendIcon size={12} /> {trend}
        </div>
      )}
    </div>
  );
}
