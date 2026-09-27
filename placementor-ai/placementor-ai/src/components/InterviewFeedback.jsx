import { CheckCircle2, AlertCircle, Lightbulb, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar.jsx";
import "./InterviewFeedback.css";

// Score bands drive both the label and the tone, so the result never
// depends on colour alone to be understood.
function getBand(score) {
  if (score >= 75) return { label: "Strong answer", tone: "success", barTone: "success" };
  if (score >= 55) return { label: "Reasonable answer", tone: "medium", barTone: "primary" };
  return { label: "Needs more detail", tone: "high", barTone: "warning" };
}

/**
 * Step 3 of the mock interview: the simulated evaluation shown after an
 * answer is submitted.
 *
 * Nothing here is real assessment — the score comes from evaluateAnswer()
 * in src/data/interviewData.js, which counts expected keywords and answer
 * length. Every surface is labelled so that's clear to the user.
 *
 * Props:
 * - evaluation: { score, strengths, improvements, ... }
 * - question:   the question, for its model answer and tips
 * - isEvaluating: shows the simulated "evaluating" state instead
 */
export default function InterviewFeedback({ evaluation, question, isEvaluating = false }) {
  if (isEvaluating) {
    return (
      <section className="card interview-feedback" aria-live="polite">
        <div className="interview-evaluating">
          <Loader2 size={18} className="interview-evaluating-spinner" aria-hidden="true" />
          <span>Preparing sample feedback…</span>
        </div>
      </section>
    );
  }

  if (!evaluation) return null;

  const band = getBand(evaluation.score);

  return (
    <section className="card interview-feedback" aria-live="polite">
      <div className="card-title-row">
        <h3>Sample Feedback</h3>
        <span className="demo-tag">Demo Evaluation</span>
      </div>

      {/* ---- Score ---- */}
      <div className="interview-score">
        <div className="interview-score-value">
          <span className="interview-score-number">{evaluation.score}</span>
          <span className="interview-score-max">/ 100</span>
        </div>
        <div className="interview-score-bar">
          <ProgressBar value={evaluation.score} tone={band.barTone} />
          <span className={`badge badge-${band.tone}`}>{band.label}</span>
        </div>
      </div>

      <p className="interview-score-note">
        Prototype score based on answer length and expected keywords — not a real assessment.
      </p>

      {/* ---- Strengths / improvements ---- */}
      <div className="interview-feedback-grid">
        <div className="interview-feedback-block">
          <h4>
            <CheckCircle2 size={15} /> What went well
          </h4>
          <ul>
            {evaluation.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="interview-feedback-block">
          <h4>
            <AlertCircle size={15} /> What to improve
          </h4>
          <ul>
            {evaluation.improvements.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Model answer ---- */}
      <div className="interview-model-answer">
        <h4>
          <Lightbulb size={15} /> Sample model answer
        </h4>
        <p>{question.modelAnswer}</p>

        {question.tips?.length > 0 && (
          <ul className="interview-model-tips">
            {question.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
