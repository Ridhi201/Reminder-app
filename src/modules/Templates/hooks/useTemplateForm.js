import { useState } from "react";

const initialState = {
  name: "",
  category: "",
  priority: "Medium",
  repeat: "Once",
  description: "",
  pushNotification: true,
  emailNotification: false,
  smsNotification: false,
  soundNotification: true,
  reminderTime: "08:00",
  notes: "",
  status: "Active"
};

export default function useTemplateForm(initialData) {
  const [formData, setFormData] = useState(initialData || initialState);
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
    setFormData(initialData || initialState);
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
