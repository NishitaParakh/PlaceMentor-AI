import "./PageHeader.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

/**
 * Greeting header at the top of the Student Dashboard.
 *
 * Props: student — an object shaped like src/data/studentData.js
 */
export default function PageHeader({ student }) {
  const firstName = student.name.split(" ")[0];

  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1>
          {getGreeting()}, {firstName} 👋
        </h1>
        <p>Here's your placement readiness overview.</p>
      </div>

      <div className="page-header-meta">
        <span className="page-header-meta-item">{student.branch}</span>
        <span className="page-header-dot">·</span>
        <span className="page-header-meta-item">{student.year}</span>
        <span className="page-header-dot">·</span>
        <span className="page-header-meta-item">CGPA {student.cgpa}</span>

        <span className="badge badge-neutral page-header-badge">
          Placement Season {student.placementSeason}
        </span>
        <span className="badge badge-success page-header-badge">{student.preparationStatus}</span>
      </div>
    </div>
  );
}
