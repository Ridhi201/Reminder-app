import { FaCheck } from "react-icons/fa";
import "./Form.css";

/**
 * FormActions — reusable Cancel / Save bar (common version).
 *
 * Props:
 *   onCancel     — cancel handler
 *   onSave       — save handler
 *   loading      — shows "Saving…" and disables Save when true
 *   saveLabel    — override Save button text
 *   cancelLabel  — override Cancel button text
 *
 * Usage:
 *   <FormActions
 *     onCancel={() => navigate(-1)}
 *     onSave={handleSubmit}
 *     loading={loading}
 *     saveLabel="Create User"
 *   />
 */
export default function FormActions({
  onCancel,
  onSave,
  loading      = false,
  saveLabel    = "Save",
  cancelLabel  = "Cancel",
}) {
  return (
    <div className="form-section-card">
      <div className="form-actions-bar">

        <button
          type="button"
          className="form-btn-cancel"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelLabel}
        </button>

        <button
          type="button"
          className="form-btn-save"
          onClick={onSave}
          disabled={loading}
        >
          <FaCheck size={13} />
          {loading ? "Saving…" : saveLabel}
        </button>

      </div>
    </div>
  );
}
