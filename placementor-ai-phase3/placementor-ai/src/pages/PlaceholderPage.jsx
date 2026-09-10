import { Construction } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import "./PlaceholderPage.css";

/**
 * Generic "coming in a later phase" page. Used for every sidebar route
 * that isn't built out yet, so navigating never dead-ends in an error.
 *
 * Props: title, description — see src/data/navigationData.js for the copy
 */
export default function PlaceholderPage({ title, description }) {
  return (
    <DashboardLayout pageTitle={title}>
      <div className="placeholder-panel">
        <div className="placeholder-panel-icon">
          <Construction size={22} />
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        <span className="badge badge-neutral">Coming in a future phase</span>
      </div>
    </DashboardLayout>
  );
}
