import { useEffect, useRef, useState } from "react";
import { FileSearch } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ResumeUpload from "../components/ResumeUpload.jsx";
import ATSScoreCard from "../components/ATSScoreCard.jsx";
import KeywordAnalysis from "../components/KeywordAnalysis.jsx";
import ResumeSectionAnalysis from "../components/ResumeSectionAnalysis.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import sampleAnalysis from "../data/resumeData.js";
import "./ResumeAnalyzer.css";

// Cosmetic pause so the loading state is actually visible. The "analysis"
// itself is just returning a fixed object from src/data/resumeData.js.
const ANALYSIS_DELAY = 1400;

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);

  // Cancel a pending analysis if the user navigates away mid-run.
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleAnalyze() {
    setIsAnalyzing(true);
    setResult(null);

    timerRef.current = setTimeout(() => {
      // The file is never read — this returns the same sample report
      // regardless of what was selected. Swap for analyzeResume() from
      // src/services/api.js once the backend can really parse a resume.
      setResult(sampleAnalysis);
      setIsAnalyzing(false);
    }, ANALYSIS_DELAY);
  }

  function handleReset() {
    clearTimeout(timerRef.current);
    setIsAnalyzing(false);
    setFile(null);
    setResult(null);
  }

  return (
    <DashboardLayout pageTitle="ATS Resume Analyzer">
      <div className="resume-content">
        <div className="page-intro">
          <div className="page-intro-badges">
            <span className="badge badge-neutral">AI Demo</span>
            <span className="demo-tag">Sample ATS Analysis</span>
          </div>
          <h1>ATS Resume Analyzer</h1>
          <p>
            See how an applicant tracking system might read your resume — score, keyword coverage,
            section-by-section review and practical fixes.
          </p>
        </div>

        <ResumeUpload
          file={file}
          onFileChange={setFile}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          isAnalyzing={isAnalyzing}
          hasResult={Boolean(result)}
        />

        {/* ---- Loading ---- */}
        {isAnalyzing && (
          <div className="card">
            <LoadingState message="Preparing your sample ATS report…" />
          </div>
        )}

        {/* ---- Empty state, before any analysis ---- */}
        {!isAnalyzing && !result && (
          <div className="card">
            <EmptyState
              icon={FileSearch}
              title="No analysis yet"
              message="Choose a resume file above and run the analyzer to see a sample ATS report."
              compact={false}
            />
          </div>
        )}

        {/* ---- Results ---- */}
        {!isAnalyzing && result && (
          <>
            <ATSScoreCard score={result.atsScore} summary={result.resumeSummary} />
            <KeywordAnalysis keywords={result.keywordAnalysis} />
            <ResumeSectionAnalysis
              sections={result.sectionAnalysis}
              strengths={result.strengths}
              weaknesses={result.weaknesses}
              suggestions={result.improvementSuggestions}
            />
          </>
        )}

        <p className="resume-disclaimer">
          This is a frontend prototype. The report above is fixed sample data — your file is never read,
          uploaded or parsed, and no AI model, database or external service is involved.
        </p>
      </div>
    </DashboardLayout>
  );
}
