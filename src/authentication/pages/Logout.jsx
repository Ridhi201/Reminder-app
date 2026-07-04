import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import DeleteModal from "../../components/common/DeleteModal/DeleteModal";

/**
 * Logout page — shows confirmation modal, clears auth on confirm.
 * Renders nothing visible (modal only).
 */
export default function Logout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleConfirm = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    setOpen(false);
    navigate(-1); // Go back to where user was
  };

  return (
    <DeleteModal
      open={open}
      title="Logout"
      message="Are you sure you want to logout? You will need to sign in again."
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
