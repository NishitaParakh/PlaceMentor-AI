import { ChevronLeft, ChevronRight, SkipForward, Send, Square } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./InterviewQuestion.css";

/**
 * Step 2 of the mock interview: shows the current question, the answer
 * textarea and the navigation controls.
 *
 * All state lives in MockInterview.jsx; this component only renders and
 * reports events upward.
 *
 * Props:
 * - question:     the current question object from interviewData.js
 * - index/total:  0-based position and question count (for "Question 2 of 5")
 * - answer:       current draft answer text
 * - onAnswerChange
 * - onSubmit / onSkip / onPrevious / onNext / onEnd
 * - isSubmitted:  true once this question has been answered (locks editing)
 * - canGoPrevious / canGoNext
 * - settings:     { type, difficulty, role } — shown as context chips
 */
export default function InterviewQuestion({
  question,
  index,
  total,
  answer,
  onAnswerChange,
  onSubmit,
  onSkip,
  onPrevious,
  onNext,
  onEnd,
  isSubmitted,
  canGoPrevious,
  canGoNext,
  settings,
}) {
  const progress = Math.round(((index + 1) / total) * 100);
  const hasAnswer = answer.trim().length > 0;

  return (
    <section className="card interview-question">
      {/* ---- Progress ---- */}
      <div className="interview-progress">
        <div className="interview-progress-top">
          <span className="interview-progress-count">
            Question {index + 1} of {total}
          </span>
          <div className="interview-context-chips">
            <span className="badge badge-neutral">{settings.type}</span>
            <span className="badge badge-low">{settings.difficulty}</span>
            <span className="badge badge-low">{settings.role}</span>
          </div>
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* ---- Question ---- */}
      <div className="interview-question-body">
        <span className="interview-question-type">{question.type} question</span>
        <h2 className="interview-question-text">{question.question}</h2>
      </div>

      {/* ---- Answer ---- */}
      <label className="interview-field interview-answer-field" htmlFor="interview-answer">
        Your Answer
        <textarea
          id="interview-answer"
          rows={7}
          placeholder="Type your answer here. Aim for 60–120 words so you can include an example…"
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          disabled={isSubmitted}
        />
      </label>

      <div className="interview-answer-meta">
        <span>
          {answer.trim().split(/\s+/).filter(Boolean).length} word
          {answer.trim().split(/\s+/).filter(Boolean).length === 1 ? "" : "s"}
        </span>
        {!hasAnswer && !isSubmitted && (
          <span className="interview-answer-hint">Write an answer to submit, or skip this question.</span>
        )}
      </div>

      {/* ---- Controls ---- */}
      <div className="interview-controls">
        <div className="interview-controls-left">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onPrevious}
            disabled={!canGoPrevious}
          >
            <ChevronLeft size={15} /> Previous
          </button>

          {!isSubmitted && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={onSkip}>
              <SkipForward size={15} /> Skip Question
            </button>
          )}
        </div>

        <div className="interview-controls-right">
          <button type="button" className="btn btn-ghost btn-sm interview-end-btn" onClick={onEnd}>
            <Square size={14} /> End Interview
          </button>

          {isSubmitted ? (
            <button type="button" className="btn btn-primary btn-sm" onClick={onNext}>
              {canGoNext ? "Next Question" : "Finish Interview"} <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onSubmit}
              disabled={!hasAnswer}
            >
              <Send size={15} /> Submit Answer
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
