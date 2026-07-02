import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${
        fullWidth ? "btn-full" : ""
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
