import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import InterviewSetup from "../components/InterviewSetup.jsx";
import InterviewQuestion from "../components/InterviewQuestion.jsx";
import InterviewFeedback from "../components/InterviewFeedback.jsx";
import InterviewSummary from "../components/InterviewSummary.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { getInterviewQuestions, evaluateAnswer, buildInterviewSummary } from "../data/interviewData.js";
import "./MockInterview.css";

// Brief pause before feedback appears, so the "evaluating" state is
// visible. Cosmetic only — the scoring itself is instant and local.
const EVALUATION_DELAY = 700;

const QUESTION_COUNT = 5;

export default function MockInterview() {
  // "setup" -> "interview" -> "summary"
  const [stage, setStage] = useState("setup");
  const [settings, setSettings] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);

  // One entry per question, aligned by index:
  //   { text, submitted, skipped, evaluation }
  const [answers, setAnswers] = useState([]);
  const [draft, setDraft] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [noQuestions, setNoQuestions] = useState(false);
  const [summary, setSummary] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleStart(chosen) {
    const picked = getInterviewQuestions(chosen, QUESTION_COUNT);

    // Guard the "no questions available" case rather than starting an
    // interview with an empty question list.
    if (picked.length === 0) {
      setNoQuestions(true);
      return;
    }

    setNoQuestions(false);
    setSettings(chosen);
    setQuestions(picked);
    setAnswers(picked.map(() => ({ text: "", submitted: false, skipped: false, evaluation: null })));
    setCurrent(0);
    setDraft("");
    setSummary(null);
    setStage("interview");
  }

  function handleSubmitAnswer() {
    if (!draft.trim() || isEvaluating) return;
    setIsEvaluating(true);

    timerRef.current = setTimeout(() => {
      const evaluation = evaluateAnswer(questions[current], draft);
      setAnswers((prev) => {
        const next = [...prev];
        next[current] = { text: draft, submitted: true, skipped: false, evaluation };
        return next;
      });
      setIsEvaluating(false);
    }, EVALUATION_DELAY);
  }

  function handleSkip() {
    const next = [...answers];
    next[current] = { text: "", submitted: false, skipped: true, evaluation: null };
    setAnswers(next);

    // Pass `next` through explicitly: if this was the last question we go
    // straight to the summary, and reading `answers` there would still hold
    // the pre-skip value (state updates aren't applied until the next render).
    goTo(current + 1, next);
  }

  function goTo(index, answersOverride) {
    clearTimeout(timerRef.current);
    setIsEvaluating(false);

    const source = answersOverride ?? answers;

    if (index >= questions.length) {
      finishInterview(source);
      return;
    }
    if (index < 0) return;

    setCurrent(index);
    setDraft(source[index]?.text ?? "");
  }

  function handleNext() {
    goTo(current + 1);
  }

  function handlePrevious() {
    goTo(current - 1);
  }

  function finishInterview(answersOverride) {
    clearTimeout(timerRef.current);
    setIsEvaluating(false);
    setSummary(buildInterviewSummary(questions, answersOverride ?? answers));
    setStage("summary");
  }

  function handleRestart() {
    clearTimeout(timerRef.current);
    setIsEvaluating(false);
    setStage("setup");
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setDraft("");
    setSummary(null);
  }

  const currentAnswer = answers[current];
  const isSubmitted = Boolean(currentAnswer?.submitted);

  return (
    <DashboardLayout pageTitle="AI Mock Interview">
      <div className="interview-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">AI Demo</span>
            <span className="demo-tag">Simulated Evaluation</span>
          </div>
          <h1>AI Mock Interview</h1>
          <p>Practice placement interview questions and evaluate your preparation.</p>
        </div>

        {/* ---- Step 1: setup ---- */}
        {stage === "setup" && (
          <InterviewSetup onStart={handleStart} initialSettings={settings} noQuestions={noQuestions} />
        )}

        {/* ---- Step 2–4: question, answer, feedback ---- */}
        {stage === "interview" && questions.length > 0 && (
          <>
            <InterviewQuestion
              question={questions[current]}
              index={current}
              total={questions.length}
              answer={draft}
              onAnswerChange={setDraft}
              onSubmit={handleSubmitAnswer}
              onSkip={handleSkip}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onEnd={() => finishInterview()}
              isSubmitted={isSubmitted}
              canGoPrevious={current > 0}
              canGoNext={current < questions.length - 1}
              settings={settings}
            />

            {(isEvaluating || isSubmitted) && (
              <InterviewFeedback
                evaluation={currentAnswer?.evaluation}
                question={questions[current]}
                isEvaluating={isEvaluating}
              />
            )}
          </>
        )}

        {/* Defensive: an interview stage with no questions shouldn't be
            reachable (handleStart guards it), but this keeps the page
            usable rather than blank if it ever happens. */}
        {stage === "interview" && questions.length === 0 && (
          <div className="card">
            <EmptyState
              title="No questions available"
              message="No sample questions matched that interview setup. Try a different combination."
              actionLabel="Back to Setup"
              onAction={handleRestart}
              compact={false}
            />
          </div>
        )}

        {/* ---- Step 5: summary ---- */}
        {stage === "summary" && summary && (
          <InterviewSummary summary={summary} settings={settings} onRestart={handleRestart} />
        )}

        <p className="interview-disclaimer">
          This is a frontend prototype. Questions come from a fixed sample set and scores are calculated
          locally from answer length and expected keywords — no AI model, database or external service
          is involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
