import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { jobStatuses, jobTypes } from "../data/recruiterData.js";
import "./JobOpeningModal.css";

const EMPTY_FORM = {
  title: "",
  department: "",
  type: "Full-time",
  location: "",
  skills: "",
  minCgpa: "",
  deadline: "",
  status: "Draft",
};

/**
 * Add / Edit Job Opening dialog — mirrors ApplicationModal's pattern.
 * Pass initialData to edit an existing job, or omit it to add a new one.
 * Skills are entered as a comma-separated string and split on submit,
 * since a full multi-select isn't needed for this prototype.
 */
export default function JobOpeningModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(
        initialData
          ? { ...EMPTY_FORM, ...initialData, skills: (initialData.skills ?? []).join(", ") }
          : EMPTY_FORM
      );
      setErrors({});
    }
  }, [isOpen, initialData]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = "Job title is required.";
    if (!form.department.trim()) next.department = "Department is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (form.minCgpa === "" || Number.isNaN(Number(form.minCgpa))) {
      next.minCgpa = "Enter a valid minimum CGPA.";
    } else if (Number(form.minCgpa) < 0 || Number(form.minCgpa) > 10) {
      next.minCgpa = "CGPA must be between 0 and 10.";
    }
    if (!form.deadline) next.deadline = "Application deadline is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      minCgpa: Number(form.minCgpa),
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Job Opening" : "Add New Job"} maxWidth={580}>
      <form className="app-modal-form" onSubmit={handleSubmit} noValidate>
        <div className="app-modal-grid">
          <div className="app-field">
            <label htmlFor="job-title">Job Title</label>
            <input
              id="job-title"
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              aria-invalid={errors.title ? "true" : "false"}
            />
            {errors.title && <span className="app-modal-error">{errors.title}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="job-department">Department</label>
            <input
              id="job-department"
              type="text"
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              aria-invalid={errors.department ? "true" : "false"}
            />
            {errors.department && <span className="app-modal-error">{errors.department}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="job-type">Job Type</label>
            <select id="job-type" value={form.type} onChange={(e) => update("type", e.target.value)}>
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="app-field">
            <label htmlFor="job-location">Location / Work Mode</label>
            <input
              id="job-location"
              type="text"
              placeholder="e.g. Bengaluru (Hybrid)"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              aria-invalid={errors.location ? "true" : "false"}
            />
            {errors.location && <span className="app-modal-error">{errors.location}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="job-cgpa">Minimum Sample CGPA</label>
            <input
              id="job-cgpa"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={form.minCgpa}
              onChange={(e) => update("minCgpa", e.target.value)}
              aria-invalid={errors.minCgpa ? "true" : "false"}
            />
            {errors.minCgpa && <span className="app-modal-error">{errors.minCgpa}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="job-deadline">Application Deadline</label>
            <input
              id="job-deadline"
              type="date"
              value={form.deadline}
              onChange={(e) => update("deadline", e.target.value)}
              aria-invalid={errors.deadline ? "true" : "false"}
            />
            {errors.deadline && <span className="app-modal-error">{errors.deadline}</span>}
          </div>

          <div className="app-field">
            <label htmlFor="job-status">Status</label>
            <select id="job-status" value={form.status} onChange={(e) => update("status", e.target.value)}>
              {jobStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="app-field">
          <label htmlFor="job-skills">Required Skills (comma-separated)</label>
          <input
            id="job-skills"
            type="text"
            placeholder="e.g. React, JavaScript, SQL"
            value={form.skills}
            onChange={(e) => update("skills", e.target.value)}
          />
        </div>

        <div className="app-modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
