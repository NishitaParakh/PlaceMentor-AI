import { useState } from "react";
import { Bot, ChevronDown } from "lucide-react";
import "./AIInsight.css";

/**
 * A prominent AI-styled insight card, with an optional "Why this
 * roadmap?" expand/collapse section listing what the (demo) recommendation
 * is based on.
 *
 * Props:
 * - title:       card heading, e.g. "AI Mentor Insight"
 * - text:        the main insight sentence
 * - demoLabel:   small disclosure tag, e.g. "Demo AI Analysis"
 * - reasons:     optional string[] shown when expanded
 * - expandLabel: text for the toggle button (defaults to "Why this roadmap?")
 */
export default function AIInsight({ title, text, demoLabel = "Demo AI Analysis", reasons, expandLabel = "Why this roadmap?" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card ai-insight-card">
      <div className="ai-insight-icon">
        <Bot size={20} />
      </div>

      <div className="ai-insight-body">
        <div className="card-title-row">
          <h3>{title}</h3>
          <span className="demo-tag">{demoLabel}</span>
        </div>
        <p>{text}</p>

        {reasons?.length > 0 && (
          <>
            <button className="ai-insight-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
              {expandLabel}
              <ChevronDown size={15} className={open ? "ai-insight-chevron open" : "ai-insight-chevron"} />
            </button>

            {open && (
              <ul className="ai-insight-reasons">
                {reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
