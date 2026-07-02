import "./Checkbox.css";

export default function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <label className={`checkbox-container ${disabled ? "disabled" : ""}`}>

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <span className="checkmark"></span>

      <span className="checkbox-label">
        {label}
      </span>

    </label>
  );
}
