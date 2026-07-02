import React from "react";
import Button from "../../../../components/common/Button";
import "./ReminderActions.css";

export default function ReminderActions({ onCancel, onSave, saving }) {
  return (
    <div className="reminder-actions-container">
      <Button
        variant="secondary"
        onClick={onCancel}
        disabled={saving}
        type="button"
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={onSave}
        loading={saving}
        disabled={saving}
        type="button"
      >
        Save Reminder
      </Button>
    </div>
  );
}
