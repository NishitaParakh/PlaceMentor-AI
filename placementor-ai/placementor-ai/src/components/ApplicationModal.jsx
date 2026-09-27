import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { APPLICATION_STATUSES, JOB_TYPES, LOCATIONS } from "../data/applicationData.js";
import "./ApplicationModal.css";

const EMPTY_FORM = {
  company: "",
  role: "",
  appliedDate: "",
  deadline: "",
  status: "Applied",
  jobType: "Full-time",
  location: "Remote",
  notes: "",
};

/**
 * Add / Edit Application dialog. Reused for both flows: pass
 * initialData to pre-fill and edit an existing application, or omit it
 * to add a new one. Validates the required fields before calling
 * onSubmit — nothing here talks to a backend, it just hands a plain
 * form object back to ApplicationTracker.jsx.
 */
export default function ApplicationModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ? { ...EMPTY_FORM, ...initialData, deadline: initialData.deadline ?? "" } : EMPTY_FORM);
      setErrors({});
    }
  }, [isOpen, initialData]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.company.trim()) next.company = "Company name is required.";
    if (!form.role.trim()) next.role = "Job role is required.";
    if (!form.appliedDate) next.appliedDate = "Application date is required.";
    if (!form.status) next.status = "Status is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, deadline: form.deadline || null });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Application" : "Add Application"} maxWidth={580}>
      <form className="app-modal-form" onSubmit={handleSubmit} noValidate>
        <div className="app-modal-grid">
          <div className="app-field">
            <label htmlFor="app-company">Company Name</label>
            <input
              id="app-company"
              type="text"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="e.g. TCS"
              aria-invalid={!!errors.company}
            />
            {errors.company && <span className="app-modal-error">{errors.company}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="app-role">Job Role</label>
            <input
              id="app-role"
              type="text"
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
              placeholder="e.g. Software Engineer"
              aria-invalid={!!errors.role}
            />
            {errors.role && <span className="app-modal-error">{errors.role}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="app-applied-date">Application Date</label>
            <input
              id="app-applied-date"
              type="date"
              value={form.appliedDate}
              onChange={(e) => update("appliedDate", e.target.value)}
              aria-invalid={!!errors.appliedDate}
            />
            {errors.appliedDate && <span className="app-modal-error">{errors.appliedDate}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="app-deadline">Deadline</label>
            <input id="app-deadline" type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
          </div>

          <div className="app-field">
            <label htmlFor="app-status">Status</label>
            <select id="app-status" value={form.status} onChange={(e) => update("status", e.target.value)}>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && <span className="app-modal-error">{errors.status}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="app-job-type">Job Type</label>
            <select id="app-job-type" value={form.jobType} onChange={(e) => update("jobType", e.target.value)}>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="app-field">
            <label htmlFor="app-location">Location</label>
            <select id="app-location" value={form.location} onChange={(e) => update("location", e.target.value)}>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="app-field app-modal-notes">
          <label htmlFor="app-notes">Notes</label>
          <textarea
            id="app-notes"
            rows={3}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Any notes about this application…"
          />
        </div>

        <div className="app-modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
