import { CheckCircle2, CircleDot, Circle } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./CodingRoadmap.css";

// Status controls the icon, badge wording and tone together, so a stage's
// state is clear without relying on colour.
const STATUS_META = {
  completed: { label: "Completed", tone: "badge-success", icon: CheckCircle2 },
  "in-progress": { label: "In Progress", tone: "badge-medium", icon: CircleDot },
  upcoming: { label: "Upcoming", tone: "badge-low", icon: Circle },
};

/**
 * Eight-stage coding preparation path, rendered as a vertical timeline.
 *
 * Mirrors the visual language of the Phase 3 learning roadmap but stays a
 * separate component, since the data shape and stage semantics differ.
 *
 * Props:
 * - stages: the codingRoadmap array from codingPlatformsData.js
 */
export default function CodingRoadmap({ stages }) {
  const completed = stages.filter((s) => s.status === "completed").length;
  const overall = Math.round(stages.reduce((sum, s) => sum + s.progress, 0) / stages.length);

  return (
    <section className="card coding-roadmap">
      <div className="card-title-row">
        <h3>Coding Preparation Roadmap</h3>
        <span className="demo-tag">Sample Roadmap</span>
      </div>

      <div className="coding-roadmap-summary">
        <div className="coding-roadmap-summary-bar">
          <ProgressBar label="Overall roadmap progress" value={overall} />
        </div>
        <span className="coding-roadmap-summary-count">
          {completed} of {stages.length} stages completed
        </span>
      </div>

      <ol className="coding-roadmap-list">
        {stages.map((stage) => {
          const meta = STATUS_META[stage.status] ?? STATUS_META.upcoming;
          const Icon = meta.icon;

          return (
            <li className={`coding-stage coding-stage-${stage.status}`} key={stage.id}>
              <div className="coding-stage-marker" aria-hidden="true">
                <Icon size={17} />
              </div>

              <div className="coding-stage-body">
                <div className="coding-stage-head">
                  <span className="coding-stage-name">
                    {stage.id}. {stage.stage}
                  </span>
                  <span className={`badge ${meta.tone}`}>{meta.label}</span>
                </div>

                <p className="coding-stage-desc">{stage.description}</p>

                <div className="coding-stage-topics">
                  {stage.topics.map((t) => (
                    <span className="coding-stage-topic" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <ProgressBar value={stage.progress} size="sm" />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
