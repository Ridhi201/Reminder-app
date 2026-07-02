import { useState }      from "react";
import { useNavigate, Link } from "react-router-dom";
import PageHeader          from "../../../../components/common/PageHeader";
import Toast               from "../../../../components/common/Toast";
import UserPhotoUpload     from "../../components/UserPhotoUpload/UserPhotoUpload";
import UserForm            from "../../components/UserForm/UserForm";
import FormActions         from "../../components/FormActions/FormActions";
import useUserForm         from "../../hooks/useUserForm";
import useUsers            from "../../hooks/useUsers";
import validateUser        from "../../validation/userValidation";
import { createUser }      from "../../../../services/userService";
import "./AddUser.css";

export default function AddUser() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    image,
    setImage,
    loading,
    setLoading,
    resetForm,
  } = useUserForm();

  const { addUser } = useUsers();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  /* ── Submit ── */
  const handleSubmit = async () => {
    const validationErrors = validateUser(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      requestAnimationFrame(() => {
        const firstError = document.querySelector(".input-error");
        if (firstError) firstError.focus();
      });
      return;
    }

    setLoading(true);

    try {
      /* ── API path (when backend is ready) ── */
      await createUser({ ...formData, photo: image?.preview });

    } catch {
      /* ── Fallback: save to local state while backend is offline ── */
      addUser({
        name:   `${formData.firstName} ${formData.lastName}`,
        email:  formData.email,
        phone:  formData.phone,
        role:   formData.role,
        status: formData.status,
        photo:  image?.preview ?? null,
      });
    } finally {
      setLoading(false);
      showToast("✓ User created successfully!", "success");
      setTimeout(() => navigate("/users"), 1400);
    }
  };

  /* ── Cancel ── */
  const handleCancel = () => {
    resetForm();
    navigate("/users");
  };

  return (
    <div className="add-user-page">
      <Link to="/users" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="Add New User"
        subtitle="Create a new user account"
        showButton={false}
      />

      <UserPhotoUpload
        image={image}
        setImage={setImage}
      />

      <UserForm
        formData={formData}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errors={errors}
      />

      <FormActions
        onCancel={handleCancel}
        onSave={handleSubmit}
        saving={loading}
        buttonText="Save User"
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

    </div>
  );
}
