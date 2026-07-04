import "./Form.css";

/**
 * TextArea — styled multi-line text input.
 *
 * Usage:
 *   <TextArea
 *     label="Street Address"
 *     name="address"
 *     value={formData.address}
 *     onChange={handleChange}
 *     placeholder="Enter address"
 *     rows={3}
 *   />
 */
export default function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows      = 3,
  required  = false,
  error,
  disabled  = false, 
}) {
  return (
    <div className="form-textarea-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`form-textarea-el ${error ? "form-textarea-error" : ""}`}
      />

      {error && <p className="form-error-text">{error}</p>}
    </div>
  );
}
