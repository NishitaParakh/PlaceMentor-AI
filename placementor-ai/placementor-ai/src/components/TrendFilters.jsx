import "./TrendFilters.css";

/**
 * Filter bar for the Placement Trends page — Year, Role, Company Type
 * and a Time Range selector. Fully controlled; state lives in
 * PlacementTrends.jsx so changing a filter updates the charts instantly
 * with no page reload.
 */
export default function TrendFilters({
  years,
  year,
  onYearChange,
  roles,
  role,
  onRoleChange,
  companyTypes,
  companyType,
  onCompanyTypeChange,
  timeRanges,
  timeRange,
  onTimeRangeChange,
}) {
  return (
    <div className="trend-filters">
      <label className="trend-filter">
        <span>Year</span>
        <select value={year} onChange={(e) => onYearChange(e.target.value)} aria-label="Filter by year">
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <label className="trend-filter">
        <span>Role</span>
        <select value={role} onChange={(e) => onRoleChange(e.target.value)} aria-label="Filter by role">
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="trend-filter">
        <span>Company Type</span>
        <select value={companyType} onChange={(e) => onCompanyTypeChange(e.target.value)} aria-label="Filter by company type">
          {companyTypes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="trend-filter">
        <span>Time Range</span>
        <select value={timeRange} onChange={(e) => onTimeRangeChange(e.target.value)} aria-label="Select time range">
          {timeRanges.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
