import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import ReminderForm from "../../components/ReminderForm";
import Button from "../../../../components/common/Button";

import useReminderForm from "../../hooks/useReminderForm";
import useReminders from "../../hooks/useReminders";

import {
  getReminderById,
  updateReminder
} from "../../../../services/reminderService";

import validateReminder from "../../validation/reminderValidation";

export default function EditReminder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { remindersList, updateReminder: localUpdateReminder } = useReminders();

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    handleChange
  } = useReminderForm();

  useEffect(() => {
    loadReminder();
  }, []);

  const loadReminder = async () => {
    try {
      const res = await getReminderById(id);
      setFormData(res.data);
    } catch (err) {
      console.log("API load failed, trying local storage:", err);
      const localReminder = remindersList.find((r) => String(r.id) === String(id));
      if (localReminder) {
        setFormData(localReminder);
      }
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateReminder(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await updateReminder(id, formData);
      localUpdateReminder(id, formData);
      navigate("/reminders");
    } catch (err) {
      console.log("API update failed, trying local storage:", err);
      localUpdateReminder(id, formData);
      navigate("/reminders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Edit Reminder"
        subtitle="Update reminder information"
        showButton={false}
      />

      <ReminderForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        setFormData={setFormData}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "25px",
          gap: "15px"
        }}
      >
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Reminder"}
        </Button>
      </div>
    </>
  );
}
