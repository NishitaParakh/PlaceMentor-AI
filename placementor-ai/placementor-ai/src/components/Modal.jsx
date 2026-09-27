import { useEffect } from "react";
import { X } from "lucide-react";
import "./Modal.css";

/**
 * Generic overlay + dialog panel, shared by ApplicationModal,
 * ApplicationDetails and ConfirmDialog so every dialog on the site
 * behaves and looks the same (Escape to close, click-outside to close,
 * focus-safe close button).
 *
 * Props:
 * - isOpen:    whether the dialog is visible
 * - onClose:   called on Escape, backdrop click, or the close button
 * - title:     dialog heading (also used as aria-label)
 * - maxWidth:  optional max panel width in px (defaults to 520)
 * - children:  dialog body content
 */
export default function Modal({ isOpen, onClose, title, maxWidth = 520, children }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
