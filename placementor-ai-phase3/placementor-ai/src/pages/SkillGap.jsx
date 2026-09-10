import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import SkillProgress from "../components/SkillProgress.jsx";
import SkillFilters from "../components/SkillFilters.jsx";
import SkillCard from "../components/SkillCard.jsx";
import SkillTable from "../components/SkillTable.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import skillData, { skillCategories, skillSummary, recommendedFocus } from "../data/skillData.js";
import "./SkillGap.css";

const SORTERS = {
  priority: { High: 0, Medium: 1, Low: 2 },
};

function sortSkills(skills, sortBy) {
  const sorted = [...skills];
  switch (sortBy) {
    case "gap":
      return sorted.sort((a, b) => (b.target - b.current) - (a.target - a.current));
    case "current":
      return sorted.sort((a, b) => b.current - a.current);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "priority":
    default:
      return sorted.sort((a, b) => SORTERS.priority[a.priority] - SORTERS.priority[b.priority]);
  }
}

export default function SkillGap() {
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("priority");
  const [view, setView] = useState("grid");

  const filteredSkills = useMemo(() => {
    let result = skillData;

    if (category !== "All") {
      result = result.filter((s) => s.category === category);
    }
    if (priority !== "All") {
      result = result.filter((s) => s.priority === priority);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    return sortSkills(result, sortBy);
  }, [category, priority, search, sortBy]);

  const strengths = useMemo(
    () => [...skillData].sort((a, b) => b.current - a.current).slice(0, 4),
    []
  );

  const improvements = useMemo(
    () =>
      [...skillData]
        .sort((a, b) => (b.target - b.current) - (a.target - a.current))
        .slice(0, 4),
    []
  );

  return (
    <DashboardLayout pageTitle="Skill Gap Analysis">
      <div className="skillgap-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">
              <Sparkles size={12} /> AI-Powered Analysis
            </span>
            <span className="demo-tag">Demo Analysis</span>
          </div>
          <h1>Skill Gap Analysis</h1>
          <p>
            Understand where you stand, identify the skills you need, and focus on what will
            improve your placement readiness.
          </p>
        </div>

        <div className="skillgap-top-grid">
          <SkillProgress
            current={skillSummary.current}
            target={skillSummary.target}
            gap={skillSummary.gap}
            status={skillSummary.status}
            insight={skillSummary.insight}
          />

          <div className="card recommend-card">
            <div className="card-title-row">
              <h3>AI Recommended Focus Areas</h3>
              <span className="demo-tag">Sample recommendation</span>
            </div>
            <p className="recommend-lead">
              Based on your current skill profile, focus on these three areas:
            </p>

            <ol className="recommend-list">
              {recommendedFocus.map((item, i) => (
                <li key={item.skill}>
                  <span className="recommend-index">{i + 1}</span>
                  <div className="recommend-item-text">
                    <span className="recommend-item-name">{item.skill}</span>
                    <span className="recommend-item-meta">
                      Gap: {item.gap}% · Recommended: {item.hoursPerWeek} hrs/week
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <Link to="/roadmap" className="btn btn-primary btn-block recommend-btn">
              Build My Roadmap <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <section className="card skillgap-list-section">
          <div className="card-title-row">
            <h3>All Skills</h3>
            <span className="skillgap-count">{filteredSkills.length} of {skillData.length} skills</span>
          </div>

          <SkillFilters
            categories={skillCategories}
            category={category}
            onCategoryChange={setCategory}
            priority={priority}
            onPriorityChange={setPriority}
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
            view={view}
            onViewChange={setView}
          />

          {view === "grid" ? (
            <div className="skillgap-card-grid">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
              {filteredSkills.length === 0 && (
                <p className="skill-table-empty">No skills match your current filters.</p>
              )}
            </div>
          ) : (
            <SkillTable skills={filteredSkills} />
          )}
        </section>

        <div className="skillgap-secondary-grid">
          <div className="card strengths-card">
            <div className="card-title-row">
              <h3>Your Strengths</h3>
            </div>
            <ul className="strengths-list">
              {strengths.map((s) => (
                <li key={s.id}>
                  <ProgressBar label={s.name} value={s.current} tone="success" />
                </li>
              ))}
            </ul>
          </div>

          <div className="card improvements-card">
            <div className="card-title-row">
              <h3>Needs Improvement</h3>
            </div>
            <ul className="improvements-list">
              {improvements.map((s) => {
                const gap = s.target - s.current;
                const focus = recommendedFocus.find((f) => f.skill === s.name);
                return (
                  <li key={s.id}>
                    <div className="improvement-top">
                      <span className="improvement-name">{s.name}</span>
                      <span className="improvement-values">
                        {s.current}% <span className="improvement-target">→ {s.target}%</span>
                      </span>
                    </div>
                    <ProgressBar value={s.current} size="sm" tone="warning" />
                    <p className="improvement-action">
                      Gap of {gap}% ·{" "}
                      {focus
                        ? `recommended ${focus.hoursPerWeek} hrs/week focused practice`
                        : "prioritize consistent weekly practice"}
                      .
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
