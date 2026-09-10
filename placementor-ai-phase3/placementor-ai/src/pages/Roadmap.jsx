import { useMemo, useState } from "react";
import { Target, ListChecks } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AIInsight from "../components/AIInsight.jsx";
import RoadmapTimeline from "../components/RoadmapTimeline.jsx";
import roadmapDataSeed, {
  roadmapSummary,
  roadmapInsight,
  recommendedLearning,
  careerGoals,
  targetCompanies,
} from "../data/roadmapData.js";
import "./Roadmap.css";

function withComputedProgress(weeks) {
  return weeks.map((week) => {
    const total = week.tasks.length;
    const completed = week.tasks.filter((t) => t.completed).length;
    const progress = total ? Math.round((completed / total) * 100) : week.progress;
    const status = progress === 100 ? "completed" : progress > 0 ? "in-progress" : "upcoming";
    return { ...week, progress, status };
  });
}

export default function Roadmap() {
  const [weeks, setWeeks] = useState(() => withComputedProgress(roadmapDataSeed));
  const [expandedWeekId, setExpandedWeekId] = useState(
    () => roadmapDataSeed.find((w) => w.status === "in-progress")?.id ?? roadmapDataSeed[0].id
  );
  const [goal, setGoal] = useState(roadmapSummary.goal);
  const [company, setCompany] = useState("General Placement");

  function toggleTask(weekId, taskIndex) {
    setWeeks((prev) =>
      prev.map((week) => {
        if (week.id !== weekId) return week;
        const tasks = week.tasks.map((t, i) => (i === taskIndex ? { ...t, completed: !t.completed } : t));
        const completed = tasks.filter((t) => t.completed).length;
        const progress = Math.round((completed / tasks.length) * 100);
        const status = progress === 100 ? "completed" : progress > 0 ? "in-progress" : "upcoming";
        return { ...week, tasks, progress, status };
      })
    );
  }

  function toggleExpand(weekId) {
    setExpandedWeekId((prev) => (prev === weekId ? null : weekId));
  }

  function handleContinue() {
    const target = weeks.find((w) => w.status === "in-progress") ?? weeks.find((w) => w.status === "upcoming");
    if (!target) return;
    setExpandedWeekId(target.id);
    document.getElementById(`week-${target.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const counts = useMemo(() => {
    return weeks.reduce(
      (acc, w) => {
        if (w.status === "completed") acc.completed += 1;
        else if (w.status === "in-progress") acc.inProgress += 1;
        else acc.upcoming += 1;
        return acc;
      },
      { completed: 0, inProgress: 0, upcoming: 0 }
    );
  }, [weeks]);

  const overallProgress = useMemo(() => {
    const total = weeks.reduce((sum, w) => sum + w.tasks.length, 0);
    const completed = weeks.reduce((sum, w) => sum + w.tasks.filter((t) => t.completed).length, 0);
    return total ? Math.round((completed / total) * 100) : 0;
  }, [weeks]);

  return (
    <DashboardLayout pageTitle="Learning Roadmap">
      <div className="roadmap-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="demo-tag">Demo AI Analysis</span>
          </div>
          <h1>Personalized Learning Roadmap</h1>
          <p>Your AI-generated path to becoming placement ready.</p>
        </div>

        {/* ---- Overview: goal, targets, quick stats ---- */}
        <div className="card roadmap-overview">
          <div className="roadmap-overview-main">
            <div className="roadmap-overview-field">
              <span>Your Goal</span>
              <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                {careerGoals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="roadmap-overview-field">
              <span>Target Company</span>
              <select value={company} onChange={(e) => setCompany(e.target.value)}>
                {targetCompanies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary roadmap-continue-btn" onClick={handleContinue}>
              Continue Roadmap →
            </button>
          </div>

          <div className="roadmap-overview-message">
            <Target size={15} />
            <span>
              Roadmap optimized for {goal} preparation
              {company !== "General Placement" ? ` · adjusted for ${company}-style technical preparation` : ""}.
            </span>
          </div>

          <div className="roadmap-overview-stats">
            <div>
              <span className="roadmap-overview-stat-value">{roadmapSummary.currentReadiness}/100</span>
              <span className="roadmap-overview-stat-label">Current Readiness</span>
            </div>
            <div>
              <span className="roadmap-overview-stat-value">{overallProgress}%</span>
              <span className="roadmap-overview-stat-label">Roadmap Progress</span>
            </div>
            <div>
              <span className="roadmap-overview-stat-value">{roadmapSummary.estimatedWeeks} Weeks</span>
              <span className="roadmap-overview-stat-label">Estimated Completion</span>
            </div>
          </div>
        </div>

        {/* ---- Progress + AI insight ---- */}
        <div className="roadmap-mid-grid">
          <div className="card roadmap-progress-card">
            <div className="card-title-row">
              <h3>Overall Progress</h3>
            </div>
            <ProgressBar value={overallProgress} />
            <div className="roadmap-progress-counts">
              <div>
                <span className="roadmap-count-value">{counts.completed}</span>
                <span className="roadmap-count-label">Completed</span>
              </div>
              <div>
                <span className="roadmap-count-value">{counts.inProgress}</span>
                <span className="roadmap-count-label">In Progress</span>
              </div>
              <div>
                <span className="roadmap-count-value">{counts.upcoming}</span>
                <span className="roadmap-count-label">Upcoming</span>
              </div>
            </div>

            <span className="roadmap-weekly-label">Weekly Progress</span>
            <div className="roadmap-weekly-grid">
              {weeks.map((w) => (
                <div className="roadmap-weekly-item" key={w.id}>
                  <ProgressBar label={`Week ${w.week}`} value={w.progress} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <AIInsight
            title="AI Mentor Insight"
            text={roadmapInsight.text}
            reasons={roadmapInsight.reasons}
          />
        </div>

        {/* ---- Recommended learning ---- */}
        <section className="card recommended-learning-card">
          <div className="card-title-row">
            <h3>Recommended Learning</h3>
            <span className="demo-tag">Sample recommendation</span>
          </div>
          <div className="recommended-learning-grid">
            {recommendedLearning.map((item) => (
              <div className="recommended-learning-item" key={item.id}>
                <div className="recommended-learning-top">
                  <span className="recommended-learning-name">{item.skill}</span>
                  <span className={`badge badge-${item.priority.toLowerCase()}`}>{item.priority} Priority</span>
                </div>
                <span className="recommended-learning-hours">{item.hoursPerWeek} hours/week</span>
                <ProgressBar value={item.progress} size="sm" />
                <button className="btn btn-secondary btn-sm recommended-learning-btn" onClick={handleContinue}>
                  Continue →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Timeline ---- */}
        <section className="roadmap-timeline-section">
          <div className="roadmap-timeline-heading">
            <ListChecks size={18} />
            <h3>Learning Roadmap</h3>
          </div>
          <RoadmapTimeline
            weeks={weeks}
            expandedWeekId={expandedWeekId}
            onToggleExpand={toggleExpand}
            onToggleTask={toggleTask}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}
