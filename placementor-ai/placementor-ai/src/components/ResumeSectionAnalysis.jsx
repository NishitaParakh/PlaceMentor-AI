import { CheckCircle2, AlertTriangle, XCircle, PlusCircle, Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react";
import "./ResumeSectionAnalysis.css";

// Status drives icon + badge tone + wording together, so a section's
// verdict is readable without relying on colour.
const STATUS_META = {
  Good: { tone: "badge-success", icon: CheckCircle2 },
  "Needs Improvement": { tone: "badge-medium", icon: AlertTriangle },
  Missing: { tone: "badge-high", icon: XCircle },
  Recommended: { tone: "badge-neutral", icon: PlusCircle },
};

/**
 * The lower half of the resume report: section-by-section review,
 * strengths and weaknesses, and the improvement suggestions list.
 *
 * Props:
 * - sections:    [{ section, status, detail }]
 * - strengths:   string[]
 * - weaknesses:  string[]
 * - suggestions: string[]
 */
export default function ResumeSectionAnalysis({ sections, strengths, weaknesses, suggestions }) {
  return (
    <>
      <section className="card resume-sections">
        <div className="card-title-row">
          <h3>Section Analysis</h3>
          <span className="demo-tag">Sample Review</span>
        </div>

        <ul className="resume-section-list">
          {sections.map((item) => {
            const meta = STATUS_META[item.status] ?? STATUS_META.Recommended;
            const Icon = meta.icon;

            return (
              <li className="resume-section-item" key={item.section}>
                <div className="resume-section-icon" aria-hidden="true">
                  <Icon size={17} />
                </div>
                <div className="resume-section-body">
                  <div className="resume-section-head">
                    <span className="resume-section-name">{item.section}</span>
                    <span className={`badge ${meta.tone}`}>{item.status}</span>
                  </div>
                  <p>{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="resume-swot-grid">
        <section className="card resume-swot">
          <div className="card-title-row">
            <h3>
              <ThumbsUp size={15} /> Sample Strengths
            </h3>
          </div>
          <ul className="resume-bullet-list resume-bullet-success">
            {strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="card resume-swot">
          <div className="card-title-row">
            <h3>
              <ThumbsDown size={15} /> Sample Weaknesses
            </h3>
          </div>
          <ul className="resume-bullet-list resume-bullet-warning">
            {weaknesses.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card resume-suggestions">
        <div className="card-title-row">
          <h3>
            <Lightbulb size={15} /> Sample Recommendations
          </h3>
          <span className="demo-tag">Demo Suggestions</span>
        </div>

        <ol className="resume-suggestion-list">
          {suggestions.map((s, i) => (
            <li key={s}>
              <span className="resume-suggestion-number" aria-hidden="true">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
