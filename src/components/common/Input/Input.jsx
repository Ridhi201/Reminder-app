import "./Input.css";

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  icon,
}) {
  return (
    <div className="input-group">

      {label && (
        <label className="input-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className="input-wrapper">

        {icon && (
          <div className="input-icon">
            {icon}
          </div>
        )}

        <input
          className={`input ${error ? "input-error" : ""}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
        />

      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

    </div>
  );
}
