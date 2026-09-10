import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, Settings, LogOut } from "lucide-react";
import studentData from "../data/studentData.js";
import "./DashboardNavbar.css";

/**
 * Sticky top bar shown above the sidebar on every dashboard/placeholder
 * page. Holds the mobile menu toggle, the current page title, and the
 * account menu.
 *
 * Props:
 * - pageTitle:   short title for the current page, shown next to the menu button
 * - onMenuClick: opens the mobile sidebar drawer
 */
export default function DashboardNavbar({ pageTitle, onMenuClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="dash-navbar">
      <div className="dash-navbar-left">
        <button className="dash-navbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <span className="dash-navbar-title">{pageTitle}</span>
      </div>

      <div className="dash-navbar-right">
        <div className="dash-search">
          <Search size={16} />
          <input type="text" placeholder="Search companies, skills, resources…" />
        </div>

        <button className="dash-icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="dash-notification-dot" />
        </button>

        <div className="dash-account">
          <button className="dash-account-btn" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
            <span className="dash-avatar">{studentData.name.charAt(0)}</span>
            <span className="dash-account-name">{studentData.name.split(" ")[0]}</span>
            <ChevronDown size={15} />
          </button>

          {menuOpen && (
            <>
              <div className="dash-account-backdrop" onClick={() => setMenuOpen(false)} />
              <div className="dash-account-menu">
                <Link to="/settings" className="dash-account-menu-item" onClick={() => setMenuOpen(false)}>
                  <Settings size={15} /> Settings
                </Link>
                <button className="dash-account-menu-item" onClick={handleLogout}>
                  <LogOut size={15} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
