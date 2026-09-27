import PlatformCard from "../components/PlatformCard.jsx";
import CodingProgress from "../components/CodingProgress.jsx";
import CodingRoadmap from "../components/CodingRoadmap.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import {
  platforms,
  codingProgress,
  topicProgress,
  weeklyActivity,
  codingRoadmap,
} from "../data/codingPlatformsData.js";
import "./CodingPlatforms.css";

export default function CodingPlatforms() {
  return (
    <DashboardLayout pageTitle="Coding Platforms">
      <div className="coding-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">Coding Profiles</span>
            <span className="demo-tag">Sample Activity</span>
          </div>
          <h1>GitHub &amp; Coding Profiles</h1>
          <p>
            The platforms that matter for placements, what each one builds, and a sample view of your
            problem-solving progress and preparation path.
          </p>
        </div>

        {/* ---- Progress dashboard ---- */}
        <CodingProgress progress={codingProgress} topics={topicProgress} weekly={weeklyActivity} />

        {/* ---- Platforms ---- */}
        <section className="coding-platforms-section">
          <div className="coding-section-head">
            <h2>Platforms to Know</h2>
            <p>Each serves a different purpose — use them together rather than picking just one.</p>
          </div>

          <div className="coding-platform-grid">
            {platforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </section>

        {/* ---- Roadmap ---- */}
        <CodingRoadmap stages={codingRoadmap} />

        <p className="coding-disclaimer">
          This is a frontend prototype. All statistics, streaks and progress shown here are sample data —
          no coding platform account is connected, and no external API, database or AI model is involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
