import { Sparkles } from "lucide-react";
import "./SuggestedQuestions.css";

/**
 * Clickable starter questions for the AI Career Mentor. Clicking one
 * sends it as a user message, so these are real <button>s rather than
 * decorative chips.
 *
 * Props:
 * - questions: string[]
 * - onSelect:  called with the question text
 * - disabled:  true while the mentor is "typing", so a click can't queue
 *              a second reply mid-response
 * - title:     optional heading above the chips
 */
export default function SuggestedQuestions({ questions, onSelect, disabled = false, title }) {
  if (!questions?.length) return null;

  return (
    <div className="suggested-questions">
      {title && (
        <div className="suggested-questions-title">
          <Sparkles size={14} />
          <span>{title}</span>
        </div>
      )}

      <div className="suggested-questions-list">
        {questions.map((q) => (
          <button
            key={q}
            type="button"
            className="suggested-question-chip"
            onClick={() => onSelect(q)}
            disabled={disabled}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
