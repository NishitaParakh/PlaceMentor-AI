import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import RecruiterProfile from "../components/RecruiterProfile.jsx";
import RecruiterStats from "../components/RecruiterStats.jsx";
import JobOpeningCard from "../components/JobOpeningCard.jsx";
import JobOpeningModal from "../components/JobOpeningModal.jsx";
import CandidateTable from "../components/CandidateTable.jsx";
import CandidateDetails from "../components/CandidateDetails.jsx";
import InterviewScheduler from "../components/InterviewScheduler.jsx";
import RecruitmentAnalytics from "../components/RecruitmentAnalytics.jsx";
import ActivityTimeline from "../components/ActivityTimeline.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Modal from "../components/Modal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import {
  recruiterProfile,
  recruiterStats,
  jobOpenings as initialJobOpenings,
  candidates as initialCandidates,
  getCandidateTimeline,
  initialInterviews,
  recruitmentActivity,
  applicationsByRole,
  statusDistribution,
  applicationsOverTime,
  hiringFunnel,
  selectedByRole,
} from "../data/recruiterData.js";
import "./RecruiterDashboard.css";

let interviewIdCounter = initialInterviews.length;

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState(initialJobOpenings);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [interviews, setInterviews] = useState(initialInterviews);

  // Job openings modal state
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);

  // Candidate details + reject confirmation
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);

  // Pre-fills the scheduler when "Schedule Interview" is clicked elsewhere
  const [schedulePresetId, setSchedulePresetId] = useState(null);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) ?? null;
  const jobRoles = [...new Set(candidates.map((c) => c.role))];

  // ---- Job openings ----

  function openAddJob() {
    setEditingJob(null);
    setJobModalOpen(true);
  }

  function openEditJob(jobId) {
    setEditingJob(jobs.find((j) => j.id === jobId) ?? null);
    setJobModalOpen(true);
  }

  function handleJobSubmit(form) {
    if (editingJob) {
      setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? { ...j, ...form } : j)));
    } else {
      setJobs((prev) => [
        { ...form, id: `job-${Date.now()}`, applicants: 0 },
        ...prev,
      ]);
    }
    setJobModalOpen(false);
    setEditingJob(null);
  }

  function handleCloseJob(jobId) {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "Closed" } : j)));
  }

  // ---- Candidates ----

  function updateCandidateStatus(candidateId, status, extra = {}) {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, status, ...extra } : c)));
  }

  function handleShortlist(candidate) {
    updateCandidateStatus(candidate.id, "Shortlisted");
  }

  function handleMarkSelected(candidate) {
    updateCandidateStatus(candidate.id, "Selected");
  }

  function requestReject(candidate) {
    setRejectTarget(candidate);
  }

  function confirmReject() {
    if (rejectTarget) updateCandidateStatus(rejectTarget.id, "Rejected");
    setRejectTarget(null);
  }

  function handleOpenScheduler(candidate) {
    setSchedulePresetId(candidate.id);
    setSelectedCandidateId(null);
    document.getElementById("interview-scheduler-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleScheduleInterview(form) {
    interviewIdCounter += 1;
    const newInterview = { ...form, id: `int-${interviewIdCounter}` };
    setInterviews((prev) => [newInterview, ...prev]);
    updateCandidateStatus(form.candidateId, "Interview Scheduled", { interviewStatus: "Scheduled" });
    setSchedulePresetId(null);
  }

  return (
    <DashboardLayout pageTitle="Recruiter Dashboard">
      <div className="recruiter-content">
        {/* ---- Header ---- */}
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">Recruiter Demo</span>
            <span className="demo-tag">Sample Recruitment Data</span>
          </div>
          <h1>Recruiter Dashboard</h1>
          <p>
            Welcome back, {recruiterProfile.recruiterName.split(" ")[0]} — here's a snapshot of{" "}
            {recruiterProfile.companyName}'s {recruiterProfile.placementDrive.toLowerCase()}. Every figure
            on this page is sample data for demonstration.
          </p>
        </div>

        <RecruiterProfile profile={recruiterProfile} />

        {/* ---- Summary stats ---- */}
        <RecruiterStats stats={recruiterStats} />

        {/* ---- Job openings ---- */}
        <section className="recruiter-section">
          <div className="recruiter-section-head">
            <h2>Job Openings</h2>
            <button type="button" className="btn btn-primary btn-sm" onClick={openAddJob}>
              <Plus size={15} /> Add New Job
            </button>
          </div>

          {jobs.length === 0 ? (
            <div className="card">
              <EmptyState
                title="No job openings yet"
                message="Create your first job opening to start receiving applications."
                actionLabel="+ Add New Job"
                onAction={openAddJob}
                compact={false}
              />
            </div>
          ) : (
            <div className="recruiter-job-grid">
              {jobs.map((job) => (
                <JobOpeningCard
                  key={job.id}
                  job={job}
                  onViewDetails={() => setViewingJob(job)}
                  onEdit={openEditJob}
                  onCloseJob={handleCloseJob}
                />
              ))}
            </div>
          )}
        </section>

        {/* ---- Candidate management ---- */}
        <section className="recruiter-section">
          <div className="recruiter-section-head">
            <h2>Candidate Management</h2>
          </div>

          <CandidateTable
            candidates={candidates}
            roles={jobRoles}
            onView={(c) => setSelectedCandidateId(c.id)}
            onShortlist={handleShortlist}
            onReject={requestReject}
            onScheduleInterview={handleOpenScheduler}
          />
        </section>

        {/* ---- Interview scheduling ---- */}
        <section className="recruiter-section" id="interview-scheduler-section">
          <div className="recruiter-section-head">
            <h2>Interview Scheduling</h2>
          </div>

          <InterviewScheduler
            candidates={candidates}
            interviews={interviews}
            presetCandidateId={schedulePresetId}
            onSchedule={handleScheduleInterview}
          />
        </section>

        {/* ---- Analytics ---- */}
        <section className="recruiter-section">
          <div className="recruiter-section-head">
            <h2>Recruitment Analytics</h2>
            <span className="demo-tag">Sample Recruitment Analytics</span>
          </div>

          <RecruitmentAnalytics
            applicationsByRole={applicationsByRole}
            statusDistribution={statusDistribution}
            applicationsOverTime={applicationsOverTime}
            hiringFunnel={hiringFunnel}
            selectedByRole={selectedByRole}
          />
        </section>

        {/* ---- Activity ---- */}
        <ActivityTimeline items={recruitmentActivity} />

        <p className="recruiter-disclaimer">
          This is a frontend prototype. Recruiter, company, job and candidate data shown here are all
          fictional sample records — no real applicant data, database, or external service is involved.
        </p>
      </div>

      {/* ---- Modals ---- */}
      <JobOpeningModal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        onSubmit={handleJobSubmit}
        initialData={editingJob}
      />

      <Modal isOpen={Boolean(viewingJob)} onClose={() => setViewingJob(null)} title={viewingJob?.title ?? "Job Details"} maxWidth={520}>
        {viewingJob && (
          <div className="recruiter-job-view">
            <div className="recruiter-job-view-row">
              <span>Department</span>
              <strong>{viewingJob.department}</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Job Type</span>
              <strong>{viewingJob.type}</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Location</span>
              <strong>{viewingJob.location}</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Minimum CGPA</span>
              <strong>{viewingJob.minCgpa}+</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Applicants</span>
              <strong>{viewingJob.applicants}</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Deadline</span>
              <strong>{viewingJob.deadline}</strong>
            </div>
            <div className="recruiter-job-view-row">
              <span>Status</span>
              <strong>{viewingJob.status}</strong>
            </div>
            <div className="recruiter-job-view-skills">
              <span>Required Skills</span>
              <div>
                {viewingJob.skills.map((s) => (
                  <span className="badge badge-low" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setViewingJob(null);
              }}
            >
              <Eye size={14} /> Close
            </button>
          </div>
        )}
      </Modal>

      <CandidateDetails
        isOpen={Boolean(selectedCandidate)}
        onClose={() => setSelectedCandidateId(null)}
        candidate={selectedCandidate}
        timeline={selectedCandidate ? getCandidateTimeline(selectedCandidate.id) : []}
        onShortlist={(c) => {
          handleShortlist(c);
          setSelectedCandidateId(null);
        }}
        onReject={(c) => {
          setSelectedCandidateId(null);
          requestReject(c);
        }}
        onScheduleInterview={handleOpenScheduler}
        onMarkSelected={(c) => {
          handleMarkSelected(c);
          setSelectedCandidateId(null);
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
        title="Reject candidate?"
        message={
          rejectTarget
            ? `Are you sure you want to reject ${rejectTarget.name}'s application for ${rejectTarget.role}?`
            : ""
        }
        confirmLabel="Reject"
      />
    </DashboardLayout>
  );
}
