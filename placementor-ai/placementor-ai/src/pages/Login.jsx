import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Logo from "../components/Logo.jsx";
import DashboardPreview from "../components/DashboardPreview.jsx";
import "./Login.css";

// Authentication is mocked for this frontend-only build. Submitting the
// form (with any values) takes the student straight to the dashboard.
// Pallavi's backend will later replace handleSubmit with a real API call —
// see src/services/api.js for where that hook goes.
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <aside className="login-brand">
        <Link to="/" className="login-brand-logo">
          <Logo variant="light" />
        </Link>

        <div className="login-brand-copy">
          <h1>Your placement prep, finally in one place.</h1>
          <p>
            Track your readiness score, close skill gaps, and prepare for the companies
            you're actually targeting.
          </p>
        </div>

        <div className="login-brand-preview">
          <DashboardPreview />
        </div>
      </aside>

      <main className="login-form-panel">
        <div className="login-form-wrap">
          <Link to="/" className="login-form-logo-mobile">
            <Logo />
          </Link>

          <h2>Log in to your account</h2>
          <p className="login-subtitle">Enter your details to see your placement dashboard.</p>

          <button type="button" className="google-btn">
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="login-divider">
            <span>or log in with email</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="field">
              <span>College email</span>
              <input type="email" placeholder="you@college.edu" required defaultValue="priyanshi.verma@college.edu" />
            </label>

            <label className="field">
              <span>Password</span>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  defaultValue="demo-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            <div className="login-row">
              <label className="checkbox-field">
                <input type="checkbox" checked={remember} onChange={() => setRemember((v) => !v)} />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Log in
            </button>
          </form>

          <p className="signup-note">
            Don't have an account? <a href="#">Sign up through your placement cell</a>
          </p>

          <p className="login-demo-note">This login is a frontend demo — any details will work.</p>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.61Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.69A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.16.28-1.69V4.98H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.02l3-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.98l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
      />
    </svg>
  );
}
