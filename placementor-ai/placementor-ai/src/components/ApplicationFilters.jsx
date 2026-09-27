import { Search } from "lucide-react";
import "./ApplicationFilters.css";

const STATUS_FILTERS = ["All", "Applied", "Shortlisted", "Assessment", "Interview", "Offer", "Rejected"];

const SORT_OPTIONS = [
  { value: "recent", label: "Recently Applied" },
  { value: "company", label: "Company" },
  { value: "deadline", label: "Deadline" },
  { value: "status", label: "Status" },
];

/**
 * Toolbar above the application table: search, status chips and a sort
 * dropdown. Fully controlled — state lives in ApplicationTracker.jsx so
 * filtering/sorting never reloads the page.
 */
export default function ApplicationFilters({
  status,
  onStatusChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="app-filters">
      <div className="app-filters-row">
        <div className="app-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search applications…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search applications by company, role or status"
          />
        </div>

        <label className="app-sort">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort applications">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="app-filters-row">
        <div className="app-chip-group" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`app-chip ${status === s ? "active" : ""}`}
              onClick={() => onStatusChange(s)}
              aria-pressed={status === s}
            >
              {s === "All" ? "All" : s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
