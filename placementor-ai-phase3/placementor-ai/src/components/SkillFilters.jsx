import { Search, LayoutGrid, List } from "lucide-react";
import "./SkillFilters.css";

const PRIORITIES = ["All", "High", "Medium", "Low"];
const SORT_OPTIONS = [
  { value: "priority", label: "Priority" },
  { value: "gap", label: "Largest Skill Gap" },
  { value: "current", label: "Current Score" },
  { value: "name", label: "Skill Name" },
];

/**
 * Toolbar above the skill list: search, category tabs, priority chips,
 * a sort dropdown, and a grid/table view toggle. Fully controlled —
 * all state lives in SkillGap.jsx so filtering/sorting never reloads
 * the page.
 */
export default function SkillFilters({
  categories,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  view,
  onViewChange,
}) {
  return (
    <div className="skill-filters">
      <div className="skill-filters-row">
        <div className="skill-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search skills…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search skills"
          />
        </div>

        <label className="skill-sort">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort skills">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <div className="skill-view-toggle" role="group" aria-label="Change view">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => onViewChange("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            className={view === "table" ? "active" : ""}
            onClick={() => onViewChange("table")}
            aria-pressed={view === "table"}
            aria-label="Table view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="skill-filters-row">
        <div className="skill-chip-group" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skill-chip ${category === cat ? "active" : ""}`}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={category === cat}
            >
              {cat === "All" ? "All Skills" : cat}
            </button>
          ))}
        </div>

        <div className="skill-chip-group" role="group" aria-label="Filter by priority">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              className={`skill-chip skill-chip-priority ${priority === p ? "active" : ""}`}
              onClick={() => onPriorityChange(p)}
              aria-pressed={priority === p}
            >
              {p === "All" ? "All Priorities" : `${p} Priority`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
