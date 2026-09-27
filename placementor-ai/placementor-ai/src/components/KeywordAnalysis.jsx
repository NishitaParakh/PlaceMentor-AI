import { Check, X, Plus, Wrench, Users } from "lucide-react";
import "./KeywordAnalysis.css";

// Each group carries its own icon and badge tone, so the meaning of a tag
// is never communicated by colour alone — the group heading states it.
const GROUPS = [
  {
    key: "matched",
    title: "Matched Keywords",
    hint: "Found in your resume and relevant to your target roles.",
    icon: Check,
    tone: "badge-success",
  },
  {
    key: "missing",
    title: "Missing Keywords",
    hint: "Commonly screened for, but not detected in this sample.",
    icon: X,
    tone: "badge-high",
  },
  {
    key: "recommended",
    title: "Recommended Keywords",
    hint: "Worth adding if you genuinely have the experience.",
    icon: Plus,
    tone: "badge-medium",
  },
  {
    key: "technical",
    title: "Technical Skills",
    hint: "Technical terms picked up in the sample report.",
    icon: Wrench,
    tone: "badge-neutral",
  },
  {
    key: "soft",
    title: "Soft Skills",
    hint: "Non-technical strengths detected in the sample report.",
    icon: Users,
    tone: "badge-low",
  },
];

/**
 * Keyword breakdown of the sample resume report.
 *
 * Props:
 * - keywords: the keywordAnalysis object from resumeData.js, keyed by
 *   matched / missing / recommended / technical / soft
 */
export default function KeywordAnalysis({ keywords }) {
  return (
    <section className="card keyword-analysis">
      <div className="card-title-row">
        <h3>Keyword Analysis</h3>
        <span className="demo-tag">Sample Keywords</span>
      </div>

      <div className="keyword-groups">
        {GROUPS.map((group) => {
          const items = keywords[group.key] ?? [];
          const Icon = group.icon;

          return (
            <div className="keyword-group" key={group.key}>
              <div className="keyword-group-head">
                <h4>
                  <Icon size={14} /> {group.title}
                </h4>
                <span className="keyword-group-count">{items.length}</span>
              </div>
              <p className="keyword-group-hint">{group.hint}</p>

              {items.length > 0 ? (
                <div className="keyword-tags">
                  {items.map((word) => (
                    <span className={`badge ${group.tone}`} key={word}>
                      {word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="keyword-group-empty">Nothing in this group.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
