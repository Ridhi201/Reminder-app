import "./Typography.css";

export default function Typography({
  children,
  variant = "body",
  weight = "regular",
  color = "primary",
  align = "left",
  className = "",
}) {
  return (
    <p
      className={`typography ${variant} ${weight} ${color} ${align} ${className}`}
    >
      {children}
    </p>
  );
}
