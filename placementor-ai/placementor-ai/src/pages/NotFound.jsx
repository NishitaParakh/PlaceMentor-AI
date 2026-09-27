import { Home, LayoutDashboard } from "lucide-react";
import Logo from "../components/Logo.jsx";
import Button from "../components/Button.jsx";
import "./NotFound.css";

/**
 * Catch-all 404 page — rendered for any route that doesn't match one of
 * the routes registered in App.jsx (real pages or PLACEHOLDER_ROUTES).
 * Kept as its own standalone page (not wrapped in DashboardLayout) since
 * an unmatched URL could come from anyone, logged in or not.
 */
export default function NotFound() {
  return (
    <div className="notfound-page">
      <Logo />

      <div className="notfound-code" aria-hidden="true">
        404
      </div>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>

      <div className="notfound-actions">
        <Button to="/dashboard" variant="primary" icon={<LayoutDashboard size={16} />}>
          Go to Dashboard
        </Button>
        <Button to="/" variant="secondary" icon={<Home size={16} />}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
