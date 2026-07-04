import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { PageHeader, Toast, FormActions } from "../../../../components/common";
import TemplateForm from "../../components/TemplateForm";
import useTemplateForm from "../../hooks/useTemplateForm";
import useTemplates from "../../hooks/useTemplates";
import validateTemplate from "../../validation/templateValidation";
import templateService from "../../services/templateService";

import "./EditTemplate.css";

export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templatesList, updateTemplate } = useTemplates();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    loading,
    setLoading,
  } = useTemplateForm();

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  useEffect(() => {
    loadTemplate();
  }, [id, templatesList]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const res = await templateService.getTemplateById(id);
      if (res && res.data) {
        setFormData(res.data);
      }
    } catch (err) {
      console.log("API load failed, trying local storage:", err);
      const localTemplate = templatesList.find((t) => String(t.id) === String(id));
      if (localTemplate) {
        setFormData(localTemplate);
      } else {
        showToast("Template not found", "error");
      }
    } finally {
      setLoading(false);
    }
  };

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
      await templateService.updateTemplate(id, formData);
      updateTemplate(id, formData);
      showToast("✓ Template updated successfully!", "success");
      setTimeout(() => navigate("/templates"), 1400);
    } catch (err) {
      console.log("API update failed, trying local storage:", err);
      updateTemplate(id, formData);
      showToast("✓ Template updated successfully! (Local)", "success");
      setTimeout(() => navigate("/templates"), 1400);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/templates");
  };

  return (
    <div className="edit-template-page">
      <Link to="/templates" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="Edit Template"
        subtitle="Update reminder template"
        showButton={false}
      />

      <TemplateForm
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />

      <div style={{ marginTop: "15px", maxWidth: "800px" }}>
        <FormActions
          onCancel={handleCancel}
          onSave={handleSubmit}
          loading={loading}
          saveLabel="Update Template"
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
