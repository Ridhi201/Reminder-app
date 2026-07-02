import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import Toast from "../../../../components/common/Toast";

import UserPhotoUpload from "../../components/UserPhotoUpload/UserPhotoUpload";
import UserForm from "../../components/UserForm/UserForm";
import FormActions from "../../components/FormActions/FormActions";

import useUserForm from "../../hooks/useUserForm";
import useUsers from "../../hooks/useUsers";
import validateUser from "../../validation/userValidation";

import { getUserById, updateUser as apiUpdateUser } from "../../../../services/userService";
import "./EditUser.css";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    image,
    setImage,
    loading,
    setLoading,
  } = useUserForm();

  const { usersList, updateUser } = useUsers();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  useEffect(() => {
    loadUser();
  }, [id, usersList]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await getUserById(id);
      if (res && res.data) {
        setFormData(res.data);
        if (res.data.photo) {
          setImage({ preview: res.data.photo });
        }
      }
    } catch (err) {
      // Fallback: search in local usersList
      const localUser = usersList.find((u) => String(u.id) === String(id));
      if (localUser) {
        // Map name to firstName and lastName safely
        const parts = (localUser.name || "").trim().split(/\s+/);
        const firstName = localUser.firstName || parts[0] || "";
        const lastName = localUser.lastName || parts.slice(1).join(" ") || "";

        setFormData({
          firstName,
          lastName,
          gender: localUser.gender || "Male",
          dob: localUser.dob || "",
          email: localUser.email || "",
          phone: localUser.phone || "",
          role: localUser.role || "User",
          status: localUser.status || "Active",
          address: localUser.address || "",
          city: localUser.city || "",
          state: localUser.state || "",
          country: localUser.country || "",
          zipCode: localUser.zipCode || "",
        });
        if (localUser.photo) {
          setImage({ preview: localUser.photo });
        }
      } else {
        showToast("User not found", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate with isEdit: true to skip password requirement
    const validationErrors = validateUser(formData, { isEdit: true });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      requestAnimationFrame(() => {
        const firstError = document.querySelector(".input-error");
        if (firstError) firstError.focus();
      });
      return;
    }

    setLoading(true);

    const updatedUserPayload = {
      ...formData,
      photo: image?.preview || null,
    };

    try {
      await apiUpdateUser(id, updatedUserPayload);
    } catch (err) {
      // Fallback: update local state
      updateUser(id, {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        photo: image?.preview || null,
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
      });
    } finally {
      setLoading(false);
      showToast("✓ User updated successfully!", "success");
      setTimeout(() => navigate("/users"), 1400);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="edit-user-page">
      <Link to="/users" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="Edit User"
        subtitle="Update user information"
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
        showSecurity={false}
      />

      <FormActions
        buttonText="Update User"
        onCancel={handleCancel}
        onSave={handleSubmit}
        saving={loading}
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
