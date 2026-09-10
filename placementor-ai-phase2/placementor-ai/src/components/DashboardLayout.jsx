import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import DashboardNavbar from "./DashboardNavbar.jsx";
import "./DashboardLayout.css";

/**
 * Shared shell used by the Student Dashboard and every placeholder route:
 * sticky top navbar + sidebar (fixed on desktop, slide-out drawer on
 * tablet/mobile) + a scrollable main content area.
 *
 * Usage: <DashboardLayout pageTitle="Dashboard"> ...page content... </DashboardLayout>
 */
export default function DashboardLayout({ pageTitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dash-shell">
      <DashboardNavbar pageTitle={pageTitle} onMenuClick={() => setSidebarOpen(true)} />

      <div className="dash-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && <div className="dash-sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        <main className="dash-main">{children}</main>
      </div>
    </div>
  );
}
