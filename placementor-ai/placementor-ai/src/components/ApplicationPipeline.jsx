import { ChevronRight } from "lucide-react";
import { PIPELINE_STAGES } from "../data/applicationData.js";
import "./ApplicationPipeline.css";

/**
 * Visual funnel: Applied → Shortlisted → Assessment → Interview → Offer.
 * Horizontal on desktop, horizontally scrollable on mobile so it never
 * breaks the page layout.
 *
 * Props: counts — object from computePipelineCounts(applications)
 */
export default function ApplicationPipeline({ counts }) {
  return (
    <div className="card pipeline-card">
      <div className="card-title-row">
        <h3>Application Pipeline</h3>
      </div>
      <div className="pipeline-track">
        {PIPELINE_STAGES.map((stage, i) => (
          <div className="pipeline-step" key={stage}>
            <div className="pipeline-step-bubble">
              <span className="pipeline-step-count">{counts[stage] ?? 0}</span>
              <span className="pipeline-step-label">{stage}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && <ChevronRight className="pipeline-arrow" size={18} />}
          </div>
        ))}
      </div>
    </div>
  );
}
