import { useState } from "react";

const initialState = {
  title: "",
  description: "",
  category: "",
  priority: "Medium",
  status: "Active",

  reminderDate: "",
  reminderTime: "",
  repeat: "Once",
  timezone: "Asia/Kolkata",

  pushNotification: true,
  emailNotification: false,
  smsNotification: false,
  soundNotification: true,

  assignedUser: "",
  reminderOwner: "",

  notes: "",

  attachment: null,
};

export default function useReminderForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    handleChange,
    resetForm,
  };
}
