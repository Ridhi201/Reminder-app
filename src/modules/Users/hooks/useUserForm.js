import { useState }  from "react";
import validateUser  from "../validation/userValidation";

const initialState = {
  firstName:       "",
  lastName:        "",
  gender:          "Male",
  dob:             "",
  email:           "",
  phone:           "",
  password:        "",
  confirmPassword: "",
  role:            "User",
  status:          "Active",
  address:         "",
  city:            "",
  state:           "",
  country:         "",
  zipCode:         "",
};

export default function useUserForm(initial = initialState) {
  const [formData, setFormData] = useState(initial);
  const [errors,   setErrors]   = useState({});
  const [image,    setImage]    = useState(null);

  /* ── Async / feedback state ── */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error,   setError]   = useState("");

  /* ── onChange — update field + clear its error ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /* ── onBlur — validate single field on leave ── */
  const handleBlur = (e) => {
    const { name } = e.target;
    setFormData((prev) => {
      const allErrors = validateUser({ ...prev });
      if (allErrors[name]) {
        setErrors((errs) => ({ ...errs, [name]: allErrors[name] }));
      }
      return prev;
    });
  };

  const resetForm = () => {
    setFormData(initial);
    setErrors({});
    setImage(null);
    setLoading(false);
    setSuccess("");
    setError("");
  };

  return {
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
    success,
    setSuccess,
    error,
    setError,
    resetForm,
  };
}
