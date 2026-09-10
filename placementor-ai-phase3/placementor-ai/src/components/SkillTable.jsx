import "./SkillTable.css";

const PRIORITY_CLASS = { High: "badge-high", Medium: "badge-medium", Low: "badge-low" };

function getStatus(gap) {
  if (gap <= 5) return { label: "Strong", tone: "badge-success" };
  if (gap <= 15) return { label: "Improving", tone: "badge-neutral" };
  if (gap <= 30) return { label: "Needs Improvement", tone: "badge-medium" };
  return { label: "Critical", tone: "badge-high" };
}

/**
 * Skill comparison table — the "table view" alternative to the SkillCard
 * grid. Scrolls horizontally on small screens instead of breaking layout.
 * Props: skills — filtered/sorted array from src/data/skillData.js
 */
export default function SkillTable({ skills }) {
  return (
    <div className="card skill-table-card">
      <div className="skill-table-scroll">
        <table className="skill-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Current</th>
              <th>Target</th>
              <th>Gap</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => {
              const gap = Math.max(0, skill.target - skill.current);
              const status = getStatus(gap);
              return (
                <tr key={skill.id}>
                  <td>
                    <span className="skill-table-name">{skill.name}</span>
                    <span className="skill-table-category">{skill.category}</span>
                  </td>
                  <td>{skill.current}%</td>
                  <td>{skill.target}%</td>
                  <td className={gap > 20 ? "skill-table-gap-high" : ""}>{gap}%</td>
                  <td>
                    <span className={`badge ${PRIORITY_CLASS[skill.priority]}`}>{skill.priority}</span>
                  </td>
                  <td>
                    <span className={`badge ${status.tone}`}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {skills.length === 0 && (
        <p className="skill-table-empty">No skills match your current filters.</p>
      )}
    </div>
  );
}
