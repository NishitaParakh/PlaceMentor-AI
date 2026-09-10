import { CheckCircle2, Circle } from "lucide-react";
import "./RoadmapTask.css";

/**
 * One task row inside an expanded RoadmapCard.
 * Props: task — { title, completed }; onToggle — called with no args on click
 */
export default function RoadmapTask({ task, onToggle }) {
  return (
    <li className={`roadmap-task ${task.completed ? "done" : ""}`}>
      <button
        className="roadmap-task-toggle"
        onClick={onToggle}
        aria-pressed={task.completed}
        aria-label={task.completed ? `Mark "${task.title}" incomplete` : `Mark "${task.title}" complete`}
      >
        {task.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
        <span>{task.title}</span>
      </button>
    </li>
  );
}
