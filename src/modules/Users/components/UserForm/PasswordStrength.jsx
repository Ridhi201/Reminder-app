/* ── Password strength logic ── */
function getStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;
  if (password.length >= 8)           score++;  // length
  if (/[A-Z]/.test(password))         score++;  // uppercase
  if (/[0-9]/.test(password))         score++;  // number
  if (/[^A-Za-z0-9]/.test(password)) score++;  // symbol

  const levels = [
    { label: "Too Short",   color: "#ef4444" },
    { label: "Weak",        color: "#f97316" },
    { label: "Fair",        color: "#eab308" },
    { label: "Strong",      color: "#22c55e" },
    { label: "Very Strong", color: "#16a34a" },
  ];

  return { score, ...levels[score] };
}

export default function PasswordStrength({ password }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="strength-meter">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="strength-bar"
            style={{ background: i <= score ? color : "#e2e8f0" }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
