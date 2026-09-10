import { Link, useLocation, useNavigate } from "react-router-dom";
import { Settings, HelpCircle, LogOut, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { navGroups } from "../data/navigationData.js";
import studentData from "../data/studentData.js";
import "./Sidebar.css";

/**
 * Dashboard sidebar. Rendered by DashboardLayout on every dashboard/
 * placeholder page, so navigation and the active-page highlight stay
 * consistent everywhere.
 *
 * Props:
 * - isOpen:  whether the mobile drawer is open (ignored on desktop, where
 *            the sidebar is always visible via CSS)
 * - onClose: called when a link is clicked or the drawer should close
 */
export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    onClose?.();
    // Mocked logout — no real session to clear yet.
    navigate("/");
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <Link to="/dashboard" onClick={onClose}>
          <Logo />
        </Link>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard">
        {navGroups.map((group) => (
          <div className="sidebar-group" key={group.title}>
            <span className="sidebar-group-title">{group.title}</span>
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-link ${active ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <Link to="/settings" onClick={onClose} className={`sidebar-link ${pathname === "/settings" ? "active" : ""}`}>
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        <Link to="/help" onClick={onClose} className={`sidebar-link ${pathname === "/help" ? "active" : ""}`}>
          <HelpCircle size={18} />
          <span>Help</span>
        </Link>
        <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">{studentData.name.charAt(0)}</div>
          <div className="sidebar-profile-text">
            <span className="sidebar-profile-name">{studentData.name}</span>
            <span className="sidebar-profile-meta">
              {studentData.branch} · {studentData.year}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
