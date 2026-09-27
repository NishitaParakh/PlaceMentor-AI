import RoadmapCard from "./RoadmapCard.jsx";
import "./RoadmapTimeline.css";

/**
 * Vertical timeline wrapper for the roadmap. Draws the connecting line
 * behind each week's marker and renders one RoadmapCard per week.
 *
 * Props:
 * - weeks:          array of roadmapData entries with live progress/status
 * - expandedWeekId: id of the currently expanded week (or null)
 * - onToggleExpand(weekId)
 * - onToggleTask(weekId, taskIndex)
 */
export default function RoadmapTimeline({ weeks, expandedWeekId, onToggleExpand, onToggleTask }) {
  return (
    <div className="roadmap-timeline">
      {weeks.map((week) => (
        <RoadmapCard
          key={week.id}
          week={week}
          expanded={expandedWeekId === week.id}
          onToggleExpand={() => onToggleExpand(week.id)}
          onToggleTask={(taskIndex) => onToggleTask(week.id, taskIndex)}
        />
      ))}
    </div>
  );
}
