import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import CompanySelector from "../components/CompanySelector.jsx";
import CompanyRequirementCard from "../components/CompanyRequirementCard.jsx";
import StudentEligibilityForm from "../components/StudentEligibilityForm.jsx";
import EligibilityResult from "../components/EligibilityResult.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import studentData from "../data/studentData.js";
import { companies, checkEligibility, getEligibilitySuggestions } from "../data/companyData.js";
import "./CompanyEligibility.css";

// Cosmetic pause so the "checking" state is visible — the comparison
// itself is instant and runs entirely in the browser.
const CHECK_DELAY = 700;

// Pre-fills what the app already knows about the student so they aren't
// asked to re-enter it; everything stays editable in the form itself.
const initialProfile = {
  name: studentData.name,
  cgpa: studentData.cgpa,
  branch: studentData.branch,
  graduationYear: "",
  backlogs: "",
  skills: [],
  hasExperience: false,
  preferredRole: "",
};

export default function CompanyEligibility() {
  const [selectedId, setSelectedId] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [outcome, setOutcome] = useState(null); // { profile, company, result, suggestions }
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const selectedCompany = companies.find((c) => c.id === selectedId) ?? null;

  function handleSelectCompany(id) {
    setSelectedId(id);
    setOutcome(null);
  }

  function handleCheck(profile) {
    if (!selectedCompany) return;
    setIsChecking(true);
    setOutcome(null);

    timerRef.current = setTimeout(() => {
      // Runs entirely client-side against the dummy rules in
      // src/data/companyData.js. Swap for checkCompanyEligibility() in
      // src/services/api.js once a real backend rule engine exists.
      const result = checkEligibility(profile, selectedCompany);
      const suggestions = getEligibilitySuggestions(result, selectedCompany);
      setOutcome({ profile, company: selectedCompany, result, suggestions });
      setIsChecking(false);
    }, CHECK_DELAY);
  }

  return (
    <DashboardLayout pageTitle="Company Eligibility Checker">
      <div className="eligibility-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">AI Demo</span>
            <span className="demo-tag">Sample Eligibility Data</span>
          </div>
          <h1>Company Eligibility Checker</h1>
          <p>
            Check your eligibility for sample placement opportunities based on simplified dummy criteria —
            not each company's real, current hiring policy.
          </p>
        </div>

        <StudentEligibilityForm initialValues={initialProfile} onSubmit={handleCheck} isChecking={isChecking} />

        <CompanySelector companies={companies} selectedId={selectedId} onSelect={handleSelectCompany} />

        {selectedCompany && <CompanyRequirementCard company={selectedCompany} />}

        {!selectedCompany && (
          <div className="card">
            <EmptyState message="Select a company above, then fill in your profile and check eligibility." />
          </div>
        )}

        {isChecking && (
          <div className="card">
            <LoadingState message="Comparing your profile against the sample requirements…" />
          </div>
        )}

        {!isChecking && outcome && (
          <EligibilityResult
            company={outcome.company}
            profile={outcome.profile}
            result={outcome.result}
            suggestions={outcome.suggestions}
          />
        )}

        <p className="eligibility-page-disclaimer">
          This is a frontend prototype. Companies, requirements and results shown here are simplified
          sample data — not real hiring criteria, and no AI model, database or external service is
          involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
