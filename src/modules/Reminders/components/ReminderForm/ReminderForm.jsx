import React from "react";
import ReminderInformation from "./ReminderInformation";
import ReminderSchedule from "./ReminderSchedule";
import ReminderNotification from "./ReminderNotification";
import ReminderAssignment from "./ReminderAssignment";
import ReminderAttachment from "./ReminderAttachment";
import ReminderNotes from "./ReminderNotes";
import "./ReminderForm.css";

export default function ReminderForm({
  formData,
  handleChange,
  errors,
  setFormData
}) {
  return (
    <div className="reminder-form">
      <ReminderInformation
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <ReminderSchedule
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <ReminderNotification
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <ReminderAssignment
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <ReminderAttachment
        formData={formData}
        setFormData={setFormData}
      />

      <ReminderNotes
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
}
