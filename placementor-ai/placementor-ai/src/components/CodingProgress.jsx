import { CheckCircle2, Flame, TrendingUp, Layers, ArrowRight } from "lucide-react";
import StatCard from "./StatCard.jsx";
import ProgressBar from "./ProgressBar.jsx";
import "./CodingProgress.css";

/**
 * Sample coding activity dashboard: headline stats, per-topic mastery
 * bars, and a seven-day activity strip.
 *
 * Every figure is dummy data from src/data/codingPlatformsData.js — no
 * coding platform is contacted.
 *
 * Props:
 * - progress: the codingProgress object
 * - topics:   topicProgress array
 * - weekly:   weeklyActivity array
 */
export default function CodingProgress({ progress, topics, weekly }) {
  // Scale the bars against the busiest day so the strip always fills.
  const peak = Math.max(...weekly.map((d) => d.problems), 1);
  const weeklyTotal = weekly.reduce((sum, d) => sum + d.problems, 0);

  return (
    <>
      <div className="coding-stats">
        <StatCard icon={CheckCircle2} value={progress.problemsSolved} label="Problems Solved" />
        <StatCard icon={Flame} value={`${progress.codingStreak} days`} label="Current Streak" />
        <StatCard icon={TrendingUp} value={progress.currentLevel} label="Current Level" />
        <StatCard
          icon={Layers}
          value={`${progress.topicsPracticed}/${progress.totalTopics}`}
          label="Topics Practiced"
        />
      </div>

      <div className="coding-progress-grid">
        {/* ---- Topic mastery ---- */}
        <section className="card coding-topics">
          <div className="card-title-row">
            <h3>Topics Practiced</h3>
            <span className="demo-tag">Sample Progress</span>
          </div>

          <div className="coding-topic-list">
            {topics.map((t) => (
              <div className="coding-topic" key={t.topic}>
                <ProgressBar label={t.topic} value={t.progress} size="sm" />
                <span className="coding-topic-count">
                  {t.solved} of {t.total} solved
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="coding-side">
          {/* ---- Weekly activity ---- */}
          <section className="card coding-weekly">
            <div className="card-title-row">
              <h3>Weekly Activity</h3>
            </div>
            <p className="coding-weekly-total">
              {weeklyTotal} problems in the last 7 days
            </p>

            <div className="coding-weekly-chart">
              {weekly.map((d) => (
                <div className="coding-weekly-col" key={d.day}>
                  <div className="coding-weekly-bar-track">
                    <div
                      className="coding-weekly-bar"
                      style={{ height: `${(d.problems / peak) * 100}%` }}
                      title={`${d.day}: ${d.problems} problems`}
                    />
                  </div>
                  <span className="coding-weekly-count">{d.problems}</span>
                  <span className="coding-weekly-day">{d.day}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ---- Suggested next topic ---- */}
          <section className="card coding-next">
            <div className="card-title-row">
              <h3>Suggested Next Topic</h3>
              <span className="demo-tag">Demo Suggestion</span>
            </div>
            <div className="coding-next-body">
              <ArrowRight size={18} />
              <div>
                <span className="coding-next-topic">{progress.suggestedNextTopic}</span>
                <p>Your lowest-coverage area — closing this gap will have the biggest effect.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
