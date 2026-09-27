import { useMemo, useState } from "react";
import { Plus, Briefcase, Activity, Users, Trophy, XCircle } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import ApplicationPipeline from "../components/ApplicationPipeline.jsx";
import ApplicationFilters from "../components/ApplicationFilters.jsx";
import ApplicationTable from "../components/ApplicationTable.jsx";
import ApplicationModal from "../components/ApplicationModal.jsx";
import ApplicationDetails from "../components/ApplicationDetails.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import DeadlineList from "../components/DeadlineList.jsx";
import AIInsight from "../components/AIInsight.jsx";
import EmptyState from "../components/EmptyState.jsx";
import applicationDataSeed, {
  PIPELINE_STAGES,
  computeApplicationStats,
  computePipelineCounts,
  buildApplicationInsight,
} from "../data/applicationData.js";
import "./ApplicationTracker.css";

function sortApplications(apps, sortBy) {
  const sorted = [...apps];
  switch (sortBy) {
    case "company":
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    case "deadline":
      return sorted.sort((a, b) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    case "status":
      return sorted.sort((a, b) => a.status.localeCompare(b.status));
    case "recent":
    default:
      return sorted.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }
}

// Phase 4: Application Tracker. Applications live in local component
// state (seeded from src/data/applicationData.js) so add/edit/delete all
// work instantly for this session — see src/services/api.js for how a
// real backend call will replace the seed later without any component
// here needing to change.
export default function ApplicationTracker() {
  const [applications, setApplications] = useState(applicationDataSeed);

  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [viewingApp, setViewingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);

  const filteredApplications = useMemo(() => {
    let result = applications;

    if (status !== "All") {
      result = result.filter((a) => a.status === status);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (a) => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q) || a.status.toLowerCase().includes(q)
      );
    }

    return sortApplications(result, sortBy);
  }, [applications, status, search, sortBy]);

  const stats = useMemo(() => computeApplicationStats(applications), [applications]);
  const pipelineCounts = useMemo(() => computePipelineCounts(applications), [applications]);
  const insightText = useMemo(() => buildApplicationInsight(stats), [stats]);

  const upcomingDeadlines = useMemo(() => {
    return applications
      .filter((a) => a.deadline && !["Rejected", "Withdrawn", "Offer"].includes(a.status))
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 5);
  }, [applications]);

  function openAddModal() {
    setEditingApp(null);
    setModalOpen(true);
  }

  function openEditModal(app) {
    setEditingApp(app);
    setModalOpen(true);
    setViewingApp(null);
  }

  function handleSubmit(form) {
    if (editingApp) {
      setApplications((prev) => prev.map((a) => (a.id === editingApp.id ? { ...a, ...form } : a)));
    } else {
      const stageIndex = PIPELINE_STAGES.indexOf(form.status);
      const newApp = {
        ...form,
        id: Date.now(),
        stageReached: stageIndex >= 0 ? stageIndex : 0,
        timeline: [{ date: form.appliedDate, event: "Application submitted" }],
      };
      setApplications((prev) => [newApp, ...prev]);
    }
    setModalOpen(false);
    setEditingApp(null);
  }

  function handleDeleteConfirmed() {
    setApplications((prev) => prev.filter((a) => a.id !== deletingApp.id));
    setDeletingApp(null);
  }

  return (
    <DashboardLayout pageTitle="Application Tracker">
      <div className="tracker-content">
        <div className="tracker-header">
          <div className="page-intro">
            <div className="page-intro-badges">
              <span className="badge badge-neutral">2026–27 Placement Season</span>
              <span className="badge badge-success">Actively Applying</span>
            </div>
            <h1>Application Tracker</h1>
            <p>Track your placement applications, interview progress and upcoming recruitment activities in one place.</p>
          </div>
          <button className="btn btn-primary tracker-add-btn" onClick={openAddModal}>
            <Plus size={16} /> Add Application
          </button>
        </div>

        <div className="tracker-stats">
          <StatCard icon={Briefcase} value={stats.total} label="Total Applications" />
          <StatCard icon={Activity} value={stats.active} label="Active Applications" />
          <StatCard icon={Users} value={stats.interviews} label="Interviews" />
          <StatCard icon={Trophy} value={stats.offers} label="Offers" />
          <StatCard icon={XCircle} value={stats.rejected} label="Rejected" />
        </div>

        <ApplicationPipeline counts={pipelineCounts} />

        {applications.length === 0 ? (
          <div className="card">
            <EmptyState
              icon={Briefcase}
              title="No applications yet"
              message="Start tracking your placement applications to monitor your progress."
              actionLabel="+ Add Application"
              onAction={openAddModal}
              compact={false}
            />
          </div>
        ) : (
          <section className="card tracker-list-section">
            <div className="card-title-row">
              <h3>All Applications</h3>
              <span className="tracker-count">
                {filteredApplications.length} of {applications.length}
              </span>
            </div>

            <ApplicationFilters
              status={status}
              onStatusChange={setStatus}
              search={search}
              onSearchChange={setSearch}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            <ApplicationTable
              applications={filteredApplications}
              onView={setViewingApp}
              onEdit={openEditModal}
              onDelete={setDeletingApp}
            />
          </section>
        )}

        <div className="tracker-secondary-grid">
          <DeadlineList items={upcomingDeadlines} />

          <div className="card tracker-progress-card">
            <div className="card-title-row">
              <h3>Application Progress</h3>
              <span className="demo-tag">Demo Analytics</span>
            </div>
            <div className="tracker-progress-grid">
              <div className="tracker-progress-item">
                <strong>{stats.successRate}%</strong>
                <span>Application Success Rate</span>
              </div>
              <div className="tracker-progress-item">
                <strong>{stats.interviewRate}%</strong>
                <span>Interviews per Application</span>
              </div>
              <div className="tracker-progress-item">
                <strong>{stats.offerConversion}%</strong>
                <span>Offer Conversion</span>
              </div>
            </div>
          </div>
        </div>

        <AIInsight title="AI Application Insight" text={insightText} demoLabel="Demo AI Insight" />
      </div>

      <ApplicationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingApp}
      />

      <ApplicationDetails
        isOpen={!!viewingApp}
        onClose={() => setViewingApp(null)}
        application={viewingApp}
        onEdit={openEditModal}
      />

      <ConfirmDialog
        isOpen={!!deletingApp}
        onClose={() => setDeletingApp(null)}
        onConfirm={handleDeleteConfirmed}
        title="Remove application?"
        message={
          deletingApp ? `Are you sure you want to remove your ${deletingApp.role} application at ${deletingApp.company}?` : ""
        }
        confirmLabel="Delete"
      />
    </DashboardLayout>
  );
}
