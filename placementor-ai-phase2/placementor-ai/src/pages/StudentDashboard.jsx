import { useEffect, useState } from "react";
import { Target, Briefcase, Video, UserCheck } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import ReadinessScore from "../components/ReadinessScore.jsx";
import ProbabilityCard from "../components/ProbabilityCard.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import InsightCard from "../components/InsightCard.jsx";
import ActivityList from "../components/ActivityList.jsx";
import TaskList from "../components/TaskList.jsx";
import ProfileCompletion from "../components/ProfileCompletion.jsx";
import { readinessCategories } from "../data/readinessData.js";
import {
  getStudentDashboard,
  getReadinessScore,
  getPlacementProbability,
  getRecentActivity,
  getUpcomingTasks,
  getCareerInsight,
} from "../services/api.js";
import "./StudentDashboard.css";

// The full Phase 2 dashboard. Every widget gets its data through
// src/services/api.js (mock functions today, real API calls later) —
// see that file's comments for how the swap will work.
export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [readiness, setReadiness] = useState(null);
  const [probability, setProbability] = useState(null);
  const [activity, setActivity] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    getStudentDashboard().then(setStudent);
    getReadinessScore().then(setReadiness);
    getPlacementProbability().then(setProbability);
    getRecentActivity().then(setActivity);
    getUpcomingTasks().then(setTasks);
    getCareerInsight().then(setInsight);
  }, []);

  const loading = !student || !readiness || !probability || !insight;

  return (
    <DashboardLayout pageTitle="Dashboard">
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="dashboard-content">
          <PageHeader student={student} />

          <div className="dashboard-stats">
            <StatCard
              icon={Target}
              value={`${student.skillsMatched}/${student.totalSkills}`}
              label="Skills Matched"
              trend="+2 this month"
            />
            <StatCard
              icon={Briefcase}
              value={String(student.applications).padStart(2, "0")}
              label="Applications"
              trend={`${student.activeApplications} active`}
            />
            <StatCard
              icon={Video}
              value={String(student.interviews).padStart(2, "0")}
              label="Interviews"
              trend={`${student.upcomingInterviews} upcoming`}
            />
            <StatCard
              icon={UserCheck}
              value={`${student.profileCompletion}%`}
              label="Profile Completion"
              trend="+5% this week"
            />
          </div>

          <div className="dashboard-main-grid">
            <ReadinessScore
              score={readiness.score}
              categories={readiness.categories}
              breakdown={readiness.breakdown}
              insight={readiness.insight}
            />
            <ProbabilityCard
              current={probability.current}
              changePercent={probability.changePercent}
              note={probability.note}
              trend={probability.trend}
            />
          </div>

          <section className="card breakdown-card">
            <div className="card-title-row">
              <h3>Readiness Breakdown</h3>
            </div>
            <div className="breakdown-grid">
              {readinessCategories.map((cat) => (
                <div className="breakdown-item" key={cat.key}>
                  <ProgressBar label={cat.label} value={student.readinessBreakdown[cat.key]} />
                </div>
              ))}
            </div>
          </section>

          <div className="dashboard-secondary-grid">
            <InsightCard text={insight.text} to="/roadmap" />
            <ProfileCompletion percent={student.profileCompletion} missingItems={student.missingProfileItems} />
          </div>

          <div className="dashboard-secondary-grid">
            <ActivityList items={activity} />
            <TaskList items={tasks} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function DashboardSkeleton() {
  return (
    <div className="dashboard-skeleton" aria-label="Loading dashboard" role="status">
      <div className="skeleton-block skeleton-header" />
      <div className="dashboard-stats">
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton-block skeleton-stat" key={i} />
        ))}
      </div>
      <div className="dashboard-main-grid">
        <div className="skeleton-block skeleton-card-lg" />
        <div className="skeleton-block skeleton-card-lg" />
      </div>
    </div>
  );
}
