import Modal from "./Modal.jsx";
import "./ConfirmDialog.css";

/**
 * Small confirm/cancel dialog, used for destructive actions like
 * deleting an application. Props: message — the confirmation question;
 * confirmLabel — text on the confirm button (defaults to "Delete").
 */
export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = "Are you sure?", message, confirmLabel = "Delete" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth={420}>
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
