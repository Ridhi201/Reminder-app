import { useState } from "react";
import "./PasswordInput.css";

export default function PasswordInput({
  label,
  name,
  placeholder = "Enter Password",
  value,
  onChange,
  onBlur,
  required = false,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-group">

      {label && (
        <label className="password-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className={`password-wrapper ${error ? "error" : ""}`}>

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="password-input"
        />

        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>

      </div>

      {error && (
        <p className="password-error">
          {error}
        </p>
      )}

    </div>
  );
}
