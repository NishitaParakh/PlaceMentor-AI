import { useMemo, useState } from "react";
import { Calculator, Code2, MessagesSquare, Route as RouteIcon } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import CompanySelector from "../components/CompanySelector.jsx";
import PreparationOverview from "../components/PreparationOverview.jsx";
import PreparationChecklist from "../components/PreparationChecklist.jsx";
import PreparationProgress from "../components/PreparationProgress.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { companies } from "../data/companyData.js";
import {
  companyPreparationPlans,
  aptitudeTopics,
  technicalTopics,
  hrTopics,
  defaultChecklist,
} from "../data/companyPreparationData.js";
import "./CompanyPreparation.css";

export default function CompanyPreparation() {
  // Default to the first company so the page shows a full plan immediately
  // rather than an empty state on first load.
  const [selectedId, setSelectedId] = useState(companies[0].id);
  const [completed, setCompleted] = useState(() => new Set());

  const selectedCompany = companies.find((c) => c.id === selectedId) ?? null;
  const plan = selectedId ? companyPreparationPlans[selectedId] : null;

  const nextTask = useMemo(
    () => defaultChecklist.find((item) => !completed.has(item.id)) ?? null,
    [completed]
  );

  function toggleTask(id) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <DashboardLayout pageTitle="Company-Specific Preparation">
      <div className="prep-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">Prototype Career Guidance</span>
            <span className="demo-tag">Sample Preparation Plan</span>
          </div>
          <h1>Company-Specific Preparation</h1>
          <p>
            Pick a company to see a sample preparation plan — aptitude, technical topics, coding practice
            and a checklist to track your progress.
          </p>
        </div>

        <CompanySelector companies={companies} selectedId={selectedId} onSelect={setSelectedId} />

        {!selectedCompany || !plan ? (
          <div className="card">
            <EmptyState message="Select a company above to see its sample preparation plan." />
          </div>
        ) : (
          <>
            <PreparationOverview company={selectedCompany} plan={plan} />

            <div className="prep-topics-grid">
              {/* ---- Aptitude ---- */}
              <section className="card prep-topic-card">
                <div className="card-title-row">
                  <h3>
                    <Calculator size={15} /> Aptitude Preparation
                  </h3>
                </div>
                <ul className="prep-topic-list">
                  {aptitudeTopics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>

              {/* ---- Technical ---- */}
              <section className="card prep-topic-card">
                <div className="card-title-row">
                  <h3>
                    <Code2 size={15} /> Technical Preparation
                  </h3>
                </div>
                <ul className="prep-topic-list">
                  {technicalTopics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>

              {/* ---- HR & Communication ---- */}
              <section className="card prep-topic-card">
                <div className="card-title-row">
                  <h3>
                    <MessagesSquare size={15} /> HR &amp; Communication
                  </h3>
                </div>
                <ul className="prep-topic-list">
                  {hrTopics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ---- Coding practice ---- */}
            <section className="card prep-coding-card">
              <div className="card-title-row">
                <h3>Coding Practice</h3>
                <span className="badge badge-medium">{plan.codingPractice.difficulty}</span>
              </div>

              <div className="prep-coding-grid">
                <div className="prep-coding-block">
                  <span className="prep-coding-label">Suggested Topics</span>
                  <div className="prep-coding-tags">
                    {plan.codingPractice.topics.map((t) => (
                      <span className="badge badge-low" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="prep-coding-block">
                  <span className="prep-coding-label">Recommended Platforms</span>
                  <div className="prep-coding-tags">
                    {plan.codingPractice.platforms.map((p) => (
                      <span className="badge badge-neutral" key={p}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="prep-coding-goal">
                <strong>Practice goal:</strong> {plan.codingPractice.goal}
              </p>
            </section>

            {/* ---- Interview rounds ---- */}
            <section className="card prep-rounds-card">
              <div className="card-title-row">
                <h3>
                  <RouteIcon size={15} /> Interview Rounds
                </h3>
                <span className="demo-tag">Sample Interview Flow</span>
              </div>

              <ol className="prep-rounds-list">
                {plan.interviewRounds.map((round, i) => (
                  <li key={round.stage}>
                    <span className="prep-rounds-number" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <span className="prep-rounds-stage">{round.stage}</span>
                      <p>{round.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ---- Checklist + progress ---- */}
            <div className="prep-bottom-grid">
              <PreparationChecklist items={defaultChecklist} completed={completed} onToggle={toggleTask} />
              <PreparationProgress
                total={defaultChecklist.length}
                completedCount={completed.size}
                nextTask={nextTask}
              />
            </div>
          </>
        )}

        <p className="prep-page-disclaimer">
          This is a frontend prototype. Hiring stages, topics and requirements shown here are simplified
          samples for demonstration — not verified, current company policy, and no AI model, database or
          external service is involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
