import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import "./Toast.css";

export default function Toast({ message, type = "success", visible, onClose }) {
  /* Auto-dismiss after 3.5 s */
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="polite">
      <span className="toast-icon">
        {type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">
        <FaTimes />
      </button>
    </div>
  );
}
