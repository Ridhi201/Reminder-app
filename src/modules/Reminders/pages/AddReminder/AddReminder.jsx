import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { PageHeader, Toast, FormActions } from "../../../../components/common";
import ReminderForm from "../../components/ReminderForm";
import useReminderForm from "../../hooks/useReminderForm";
import useReminders from "../../hooks/useReminders";
import validateReminder from "../../validation/reminderValidation";
import { createReminder } from "../../../../services/reminderService";

import "./AddReminder.css";

export default function AddReminder() {
  const navigate = useNavigate();
  const { addReminder } = useReminders();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    loading,
    setLoading,
    resetForm,
  } = useReminderForm();

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  const handleSubmit = async () => {
    const validationErrors = validateReminder(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      requestAnimationFrame(() => {
        const firstError = document.querySelector(".input-error, .form-select-error");
        if (firstError) firstError.focus();
      });
      return;
    }

    setLoading(true);

    try {
      await createReminder(formData);
      addReminder(formData);
      showToast("✓ Reminder created successfully!", "success");
      setTimeout(() => navigate("/reminders"), 1400);
    } catch (error) {
      console.error("API error:", error);
      // Fallback
      addReminder(formData);
      showToast("✓ Reminder created successfully! (Local)", "success");
      setTimeout(() => navigate("/reminders"), 1400);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/reminders");
  };

  return (
    <div className="add-reminder-page">
      <Link to="/reminders" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="Add Reminder"
        subtitle="Create a new reminder"
        showButton={false}
      />

      <ReminderForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        errors={errors}
      />

      <div style={{ marginTop: "15px", maxWidth: "800px" }}>
        <FormActions
          onCancel={handleCancel}
          onSave={handleSubmit}
          loading={loading}
          saveLabel="Save Reminder"
        />
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
