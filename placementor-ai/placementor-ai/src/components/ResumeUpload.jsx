import { useRef, useState } from "react";
import { UploadCloud, FileText, X, Search } from "lucide-react";
import { acceptedFormats, maxFileSizeMB } from "../data/resumeData.js";
import "./ResumeUpload.css";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Resume upload panel: drag-and-drop area, file input, selected-file
 * summary and the analyze/reset controls.
 *
 * The file is never read, uploaded or parsed — it stays in the browser
 * purely so the UI has a realistic filename and size to display. All
 * validation here is frontend-only.
 *
 * Props:
 * - file / onFileChange: the selected File object (or null)
 * - onAnalyze:  starts the simulated analysis
 * - onReset:    clears the file and any existing result
 * - isAnalyzing: disables controls while the demo analysis runs
 * - hasResult:  true once a report is on screen
 */
export default function ResumeUpload({ file, onFileChange, onAnalyze, onReset, isAnalyzing, hasResult }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  function validateAndSet(selected) {
    if (!selected) return;

    const name = selected.name.toLowerCase();
    const okFormat = acceptedFormats.some((ext) => name.endsWith(ext));
    if (!okFormat) {
      setError(`Unsupported file type. Please choose a ${acceptedFormats.join(", ")} file.`);
      return;
    }
    if (selected.size > maxFileSizeMB * 1024 * 1024) {
      setError(`That file is larger than ${maxFileSizeMB} MB. Please choose a smaller file.`);
      return;
    }

    setError("");
    onFileChange(selected);
  }

  function handleAnalyzeClick() {
    // Missing-file handling: prompt rather than silently doing nothing.
    if (!file) {
      setError("Please choose a resume file first.");
      return;
    }
    setError("");
    onAnalyze();
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files?.[0]);
  }

  function handleRemove() {
    setError("");
    if (inputRef.current) inputRef.current.value = "";
    onReset();
  }

  return (
    <section className="card resume-upload">
      <div className="card-title-row">
        <h3>Upload Your Resume</h3>
        <span className="demo-tag">Prototype Analyzer</span>
      </div>
      <p className="resume-upload-intro">
        Your file stays in your browser — it isn't uploaded, read or parsed. Choosing one simply lets the
        demo report render with a realistic file name.
      </p>

      {!file ? (
        <div
          className={isDragging ? "resume-dropzone resume-dropzone-active" : "resume-dropzone"}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="resume-dropzone-icon" aria-hidden="true">
            <UploadCloud size={24} />
          </div>
          <p className="resume-dropzone-title">Drag and drop your resume here</p>
          <p className="resume-dropzone-sub">or</p>

          <button type="button" className="btn btn-secondary btn-sm" onClick={() => inputRef.current?.click()}>
            Choose File
          </button>

          <p className="resume-dropzone-formats">
            Supported formats: {acceptedFormats.join(", ")} · Max {maxFileSizeMB} MB
          </p>

          <label htmlFor="resume-file-input" className="sr-only">
            Choose a resume file
          </label>
          <input
            id="resume-file-input"
            ref={inputRef}
            type="file"
            className="resume-file-input"
            accept={acceptedFormats.join(",")}
            onChange={(e) => validateAndSet(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div className="resume-selected">
          <div className="resume-selected-icon" aria-hidden="true">
            <FileText size={20} />
          </div>
          <div className="resume-selected-body">
            <span className="resume-selected-name">{file.name}</span>
            <span className="resume-selected-meta">{formatSize(file.size)}</span>
          </div>
          <button
            type="button"
            className="resume-selected-remove"
            onClick={handleRemove}
            aria-label={`Remove ${file.name}`}
            disabled={isAnalyzing}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <p className="resume-upload-error" role="alert">
          {error}
        </p>
      )}

      <div className="resume-upload-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAnalyzeClick}
          disabled={isAnalyzing}
        >
          <Search size={16} />
          {isAnalyzing ? "Analyzing…" : hasResult ? "Re-run Analysis" : "Analyze Resume"}
        </button>

        {(file || hasResult) && (
          <button type="button" className="btn btn-secondary" onClick={handleRemove} disabled={isAnalyzing}>
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
