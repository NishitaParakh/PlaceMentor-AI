import Logo from "./Logo.jsx";
import "./Footer.css";

const COLUMNS = [
  {
    title: "Platform",
    links: ["Readiness score", "Skill gap analysis", "Learning roadmap", "Mock interviews"],
  },
  {
    title: "Resources",
    links: ["Resume analyzer", "Company preparation", "Placement trends", "AI career mentor"],
  },
  {
    title: "Team",
    links: ["About the project", "For faculty & evaluators", "For recruiters", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Logo />
          <p>
            Know where you stand. Know what to improve. Get placement ready.
          </p>
        </div>

        <div className="footer-columns">
          {COLUMNS.map((col) => (
            <div key={col.title} className="footer-column">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 PlaceMentor AI. Built as a college capstone project.</span>
        <span className="footer-demo-note">All platform data shown is sample data for demonstration.</span>
      </div>
    </footer>
  );
}
