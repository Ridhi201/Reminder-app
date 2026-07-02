import Button from "../../../../components/common/Button";
import "./FormActions.css";

export default function FormActions({
  buttonText = "Save User",
  onCancel,
  onSave,
  saving = false
}) {
  return (
    <div className="form-actions actions">
      <Button variant="secondary" onClick={onCancel} disabled={saving}>
        Cancel
      </Button>

      <Button onClick={onSave} disabled={saving}>
        {saving ? "Saving…" : buttonText}
      </Button>
    </div>
  );
}
