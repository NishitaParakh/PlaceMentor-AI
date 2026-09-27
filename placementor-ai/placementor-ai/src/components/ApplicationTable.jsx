import { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import EmptyState from "./EmptyState.jsx";
import { DEMO_TODAY } from "../data/applicationData.js";
import "./ApplicationTable.css";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function isDeadlineSoon(iso) {
  if (!iso) return false;
  const diffDays = (new Date(iso) - new Date(DEMO_TODAY)) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 5;
}

/**
 * Professional application table with a per-row action menu
 * (View / Edit / Delete). Scrolls horizontally on small screens instead
 * of breaking the page layout.
 *
 * Props: applications — filtered/sorted array; onView/onEdit/onDelete(app)
 */
export default function ApplicationTable({ applications, onView, onEdit, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (openMenuId === null) return;
    function handleOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenuId(null);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [openMenuId]);

  return (
    <div className="card app-table-card" ref={wrapRef}>
      <div className="app-table-scroll">
        <table className="app-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied On</th>
              <th>Status</th>
              <th>Next Step</th>
              <th>Deadline</th>
              <th className="app-table-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>
                  <button className="app-table-company-link" onClick={() => onView(app)}>
                    {app.company}
                  </button>
                </td>
                <td>{app.role}</td>
                <td>{formatDate(app.appliedDate)}</td>
                <td>
                  <StatusBadge status={app.status} />
                </td>
                <td className="app-table-next">{app.nextStep}</td>
                <td className={isDeadlineSoon(app.deadline) ? "app-table-deadline-soon" : ""}>
                  {formatDate(app.deadline)}
                </td>
                <td className="app-table-actions-col">
                  <div className="app-table-menu-wrap">
                    <button
                      className="app-table-menu-btn"
                      onClick={() => setOpenMenuId((prev) => (prev === app.id ? null : app.id))}
                      aria-label={`Actions for ${app.company} — ${app.role}`}
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === app.id}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === app.id && (
                      <div className="app-table-menu" role="menu">
                        <button
                          role="menuitem"
                          onClick={() => {
                            onView(app);
                            setOpenMenuId(null);
                          }}
                        >
                          <Eye size={14} /> View
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => {
                            onEdit(app);
                            setOpenMenuId(null);
                          }}
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          role="menuitem"
                          className="app-table-menu-danger"
                          onClick={() => {
                            onDelete(app);
                            setOpenMenuId(null);
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && <EmptyState message="No applications match your current filters." />}
    </div>
  );
}
