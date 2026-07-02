import "./Form.css";

/**
 * Select — styled dropdown component.
 *
 * Props:
 *   options — [{ value: "Admin", label: "Admin" }, ...]
 *
 * Usage:
 *   <Select
 *     label="Role"
 *     name="role"
 *     value={formData.role}
 *     onChange={handleChange}
 *     options={[
 *       { value: "Admin",   label: "Admin"   },
 *       { value: "Manager", label: "Manager" },
 *       { value: "User",    label: "User"    },
 *     ]}
 *   />
 */
export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required  = false,
  error,
  disabled  = false,
  placeholder,
}) {
  return (
    <div className="form-select-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}

      <div className={`form-select-wrapper ${error ? "form-select-error" : ""}`}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="form-select-el"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="form-error-text">{error}</p>}
    </div>
  );
}
