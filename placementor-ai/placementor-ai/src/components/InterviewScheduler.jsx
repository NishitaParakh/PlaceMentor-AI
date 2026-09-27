import { useEffect, useState } from "react";
import { CalendarClock, CheckCircle2, Video, MapPin, Shuffle } from "lucide-react";
import { interviewRounds, interviewModes } from "../data/recruiterData.js";
import EmptyState from "./EmptyState.jsx";
import "./InterviewScheduler.css";

const MODE_ICON = { Online: Video, Offline: MapPin, Hybrid: Shuffle };

const EMPTY_FORM = {
  candidateId: "",
  round: "",
  date: "",
  time: "",
  mode: "",
  interviewer: "",
};

/**
 * Interview scheduling form plus the resulting list of scheduled
 * interviews. Prefilled from a candidate when opened via "Schedule
 * Interview" elsewhere on the dashboard (via `presetCandidateId`), but the
 * candidate stays editable so a recruiter can also schedule from scratch.
 *
 * Props:
 * - candidates:        list, for the candidate dropdown
 * - interviews:        scheduled interviews so far
 * - presetCandidateId: candidate id to pre-select (or null)
 * - onSchedule:        called with the validated interview form
 */
export default function InterviewScheduler({ candidates, interviews, presetCandidateId, onSchedule }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Pre-select the candidate when the recruiter jumps here from a
  // "Schedule Interview" button elsewhere, without clobbering anything
  // they've already typed if it fires again for the same id.
  useEffect(() => {
    if (presetCandidateId) {
      setForm((f) => (f.candidateId === presetCandidateId ? f : { ...EMPTY_FORM, candidateId: presetCandidateId }));
    }
  }, [presetCandidateId]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSuccessMessage("");
  }

  function validate() {
    const next = {};
    if (!form.candidateId) next.candidateId = "Please select a candidate.";
    if (!form.round) next.round = "Please select an interview round.";
    if (!form.date) next.date = "Please choose an interview date.";
    if (!form.time) next.time = "Please choose an interview time.";
    if (!form.mode) next.mode = "Please select an interview mode.";
    if (!form.interviewer.trim()) next.interviewer = "Interviewer name is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const candidate = candidates.find((c) => c.id === form.candidateId);
    onSchedule({ ...form, candidateName: candidate?.name ?? "Unknown", role: candidate?.role ?? "" });

    setSuccessMessage(`Interview scheduled with ${candidate?.name ?? "the candidate"}.`);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <div className="interview-scheduler-grid">
      <section className="card interview-scheduler-form-card">
        <div className="card-title-row">
          <h3>Schedule Interview</h3>
        </div>

        <form className="app-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="app-modal-grid">
            <div className="app-field">
              <label htmlFor="sched-candidate">Candidate</label>
              <select
                id="sched-candidate"
                value={form.candidateId}
                onChange={(e) => update("candidateId", e.target.value)}
                aria-invalid={errors.candidateId ? "true" : "false"}
              >
                <option value="">Select candidate…</option>
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.role}
                  </option>
                ))}
              </select>
              {errors.candidateId && <span className="app-modal-error">{errors.candidateId}</span>}
            </div>

            <div className="app-field">
              <label htmlFor="sched-round">Interview Round</label>
              <select
                id="sched-round"
                value={form.round}
                onChange={(e) => update("round", e.target.value)}
                aria-invalid={errors.round ? "true" : "false"}
              >
                <option value="">Select round…</option>
                {interviewRounds.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.round && <span className="app-modal-error">{errors.round}</span>}
            </div>

            <div className="app-field">
              <label htmlFor="sched-date">Interview Date</label>
              <input
                id="sched-date"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                aria-invalid={errors.date ? "true" : "false"}
              />
              {errors.date && <span className="app-modal-error">{errors.date}</span>}
            </div>

            <div className="app-field">
              <label htmlFor="sched-time">Interview Time</label>
              <input
                id="sched-time"
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                aria-invalid={errors.time ? "true" : "false"}
              />
              {errors.time && <span className="app-modal-error">{errors.time}</span>}
            </div>

            <div className="app-field">
              <label htmlFor="sched-mode">Interview Mode</label>
              <select
                id="sched-mode"
                value={form.mode}
                onChange={(e) => update("mode", e.target.value)}
                aria-invalid={errors.mode ? "true" : "false"}
              >
                <option value="">Select mode…</option>
                {interviewModes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.mode && <span className="app-modal-error">{errors.mode}</span>}
            </div>

            <div className="app-field">
              <label htmlFor="sched-interviewer">Interviewer Name</label>
              <input
                id="sched-interviewer"
                type="text"
                value={form.interviewer}
                onChange={(e) => update("interviewer", e.target.value)}
                aria-invalid={errors.interviewer ? "true" : "false"}
              />
              {errors.interviewer && <span className="app-modal-error">{errors.interviewer}</span>}
            </div>
          </div>

          {successMessage && (
            <p className="interview-scheduler-success" role="status">
              <CheckCircle2 size={15} /> {successMessage}
            </p>
          )}

          <button type="submit" className="btn btn-primary interview-scheduler-submit">
            <CalendarClock size={16} /> Schedule Interview
          </button>
        </form>
      </section>

      <section className="card interview-scheduler-list-card">
        <div className="card-title-row">
          <h3>Scheduled Interviews</h3>
          <span className="badge badge-neutral">{interviews.length}</span>
        </div>

        {interviews.length === 0 ? (
          <EmptyState message="No interviews scheduled yet." />
        ) : (
          <ul className="interview-scheduler-list">
            {interviews.map((iv) => {
              const ModeIcon = MODE_ICON[iv.mode] ?? Video;
              return (
                <li key={iv.id}>
                  <div className="interview-scheduler-item-main">
                    <span className="interview-scheduler-candidate">{iv.candidateName}</span>
                    <span className="interview-scheduler-role">{iv.role}</span>
                  </div>
                  <div className="interview-scheduler-item-meta">
                    <span className="badge badge-neutral">{iv.round}</span>
                    <span>
                      {iv.date} · {iv.time}
                    </span>
                    <span className="interview-scheduler-mode">
                      <ModeIcon size={13} /> {iv.mode}
                    </span>
                  </div>
                  <span className="interview-scheduler-interviewer">Interviewer: {iv.interviewer}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
