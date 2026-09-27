import { useMemo, useState } from "react";
import { Search, Eye, ClipboardCheck, XCircle, CalendarPlus } from "lucide-react";
import EmptyState from "./EmptyState.jsx";
import "./CandidateTable.css";

const STATUS_TONE = {
  Applied: "badge-neutral",
  "Under Review": "badge-medium",
  Shortlisted: "badge-low",
  "Interview Scheduled": "badge-medium",
  Selected: "badge-success",
  Rejected: "badge-high",
};

const STATUS_FILTERS = ["All", "Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Selected", "Rejected"];

const SORT_OPTIONS = [
  { value: "recent", label: "Recently Applied" },
  { value: "name", label: "Candidate Name" },
  { value: "cgpa", label: "CGPA (Highest First)" },
  { value: "status", label: "Status" },
];

function sortCandidates(list, sortBy) {
  const sorted = [...list];
  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "cgpa":
      return sorted.sort((a, b) => b.cgpa - a.cgpa);
    case "status":
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    case "recent":
    default:
      return sorted.sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn));
  }
}

/**
 * Candidate management table: search, status filter, job-role filter and
 * sort are all self-contained here since they only ever act on this one
 * list. Row actions (Details / Shortlist / Reject / Schedule Interview)
 * are reported upward — RecruiterDashboard.jsx owns the actual state
 * changes and the interview-scheduling flow.
 *
 * Props:
 * - candidates: full candidate list
 * - roles:      distinct job roles, for the role filter dropdown
 * - onView / onShortlist / onReject / onScheduleInterview: called with
 *   the candidate object
 */
export default function CandidateTable({ candidates, roles, onView, onShortlist, onReject, onScheduleInterview }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [role, setRole] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matches = candidates.filter((c) => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q);
      const matchesStatus = status === "All" || c.status === status;
      const matchesRole = role === "All" || c.role === role;
      return matchesSearch && matchesStatus && matchesRole;
    });
    return sortCandidates(matches, sortBy);
  }, [candidates, search, status, role, sortBy]);

  return (
    <div className="card candidate-table-card">
      <div className="card-title-row">
        <h3>Candidate Management</h3>
        <span className="demo-tag">Sample Candidates</span>
      </div>

      <div className="candidate-toolbar">
        <div className="candidate-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search candidates by name or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search candidates by name or role"
          />
        </div>

        <label className="candidate-select">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Filter by job role">
            <option value="All">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="candidate-select">
          <span>Sort by</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort candidates">
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="candidate-chip-group" role="group" aria-label="Filter by application status">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            className={status === s ? "candidate-chip candidate-chip-active" : "candidate-chip"}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="candidate-table-scroll">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied Role</th>
              <th>CGPA</th>
              <th>Status</th>
              <th>Interview</th>
              <th>Applied On</th>
              <th className="candidate-table-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>
                  <button className="candidate-name-link" onClick={() => onView(c)}>
                    {c.name}
                  </button>
                  <span className="candidate-id">{c.id}</span>
                </td>
                <td>{c.role}</td>
                <td>{c.cgpa}</td>
                <td>
                  <span className={`badge ${STATUS_TONE[c.status] ?? "badge-neutral"}`}>{c.status}</span>
                </td>
                <td>{c.interviewStatus}</td>
                <td>{c.appliedOn}</td>
                <td className="candidate-table-actions-col">
                  <div className="candidate-row-actions">
                    <button
                      className="candidate-row-btn"
                      onClick={() => onView(c)}
                      aria-label={`View details for ${c.name}`}
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="candidate-row-btn"
                      onClick={() => onShortlist(c)}
                      aria-label={`Shortlist ${c.name}`}
                      title="Shortlist"
                      disabled={c.status === "Shortlisted" || c.status === "Selected"}
                    >
                      <ClipboardCheck size={15} />
                    </button>
                    <button
                      className="candidate-row-btn"
                      onClick={() => onScheduleInterview(c)}
                      aria-label={`Schedule interview for ${c.name}`}
                      title="Schedule Interview"
                      disabled={c.status === "Rejected"}
                    >
                      <CalendarPlus size={15} />
                    </button>
                    <button
                      className="candidate-row-btn candidate-row-btn-danger"
                      onClick={() => onReject(c)}
                      aria-label={`Reject ${c.name}`}
                      title="Reject"
                      disabled={c.status === "Rejected" || c.status === "Selected"}
                    >
                      <XCircle size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && <EmptyState message="No candidates match your current search or filters." />}
    </div>
  );
}
