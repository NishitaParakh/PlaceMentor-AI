import { Check } from "lucide-react";
import "./PreparationChecklist.css";

/**
 * The preparation checklist — the same eight tasks regardless of which
 * company is selected. Completion state lives in CompanyPreparation.jsx
 * (not here) so it persists across a company switch within the session.
 *
 * Props:
 * - items:     defaultChecklist from companyPreparationData.js
 * - completed: Set of completed task ids
 * - onToggle:  called with a task id
 */
export default function PreparationChecklist({ items, completed, onToggle }) {
  return (
    <section className="card prep-checklist">
      <div className="card-title-row">
        <h3>Preparation Checklist</h3>
        <span className="demo-tag">Sample Checklist</span>
      </div>

      <ul className="prep-checklist-list">
        {items.map((item) => {
          const isDone = completed.has(item.id);
          return (
            <li key={item.id}>
              <label className={isDone ? "prep-checklist-item prep-checklist-item-done" : "prep-checklist-item"}>
                <span className="prep-checklist-box" aria-hidden="true">
                  {isDone && <Check size={13} />}
                </span>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggle(item.id)}
                  className="sr-only"
                />
                <span>{item.task}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
