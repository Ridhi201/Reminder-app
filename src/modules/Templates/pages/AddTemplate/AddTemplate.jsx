import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { PageHeader, Toast, FormActions } from "../../../../components/common";
import TemplateForm from "../../components/TemplateForm";
import useTemplateForm from "../../hooks/useTemplateForm";
import useTemplates from "../../hooks/useTemplates";
import validateTemplate from "../../validation/templateValidation";
import templateService from "../../services/templateService";

import "./AddTemplate.css";

export default function AddTemplate() {
  const navigate = useNavigate();
  const { addTemplate } = useTemplates();
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
  } = useTemplateForm();

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  const handleSubmit = async () => {
    const validationErrors = validateTemplate(formData);

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
      await templateService.createTemplate(formData);
      addTemplate(formData);
      showToast("✓ Template created successfully!", "success");
      setTimeout(() => navigate("/templates"), 1400);
    } catch (error) {
      console.error("API error:", error);
      // Fallback
      addTemplate(formData);
      showToast("✓ Template created successfully! (Local)", "success");
      setTimeout(() => navigate("/templates"), 1400);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/templates");
  };

  return (
    <div className="add-template-page">
      <Link to="/templates" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="Add Template"
        subtitle="Create reminder template"
        showButton={false}
      />

      <TemplateForm
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
          saveLabel="Save Template"
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
