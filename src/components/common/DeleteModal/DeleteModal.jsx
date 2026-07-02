import Modal from "../Modal/Modal.jsx";
import Button from "../Button";
import "./DeleteModal.css";

export default function DeleteModal({
  open,
  title,
  message,
  loading,
  onCancel,
  onConfirm
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="delete-modal">
        <div className="delete-icon">🗑️</div>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="delete-actions">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
