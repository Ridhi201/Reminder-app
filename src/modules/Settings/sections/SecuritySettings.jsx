import { useState } from "react";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const DEFAULTS = {
  twoFactor:        false,
  loginAlerts:      true,
  ipWhitelist:      false,
  sessionTimeout:   "30",
  passwordExpiry:   "90",
  maxLoginAttempts: "5",
  requireUppercase: true,
  requireNumbers:   true,
  requireSpecial:   false,
  minPasswordLen:   "8",
};

function Toggle({ checked, onChange, id }) {
  return (
    <label className="toggle" htmlFor={id}>
      <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      <span className="toggle-slider" />
    </label>
  );
}

const SECURITY_TOGGLES = [
  {
    key:  "twoFactor",
    icon: "🔐",
    label: "Two-Factor Authentication (2FA)",
    desc:  "Require OTP via email/SMS on every login",
    critical: true,
  },
  {
    key:  "loginAlerts",
    icon: "🚨",
    label: "Login Alerts",
    desc:  "Email admin when a new login is detected from an unknown device",
    critical: false,
  },
  {
    key:  "ipWhitelist",
    icon: "🌐",
    label: "IP Whitelist Enforcement",
    desc:  "Restrict login to specific IP addresses only",
    critical: true,
  },
];

const PASSWORD_TOGGLES = [
  { key: "requireUppercase", label: "Require uppercase letters (A–Z)" },
  { key: "requireNumbers",   label: "Require numbers (0–9)" },
  { key: "requireSpecial",   label: "Require special characters (!@#$)" },
];

export default function SecuritySettings() {
  const [form, setForm] = useState(() =>
    storageService.get("settings_security", DEFAULTS)
  );
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    storageService.set("settings_security", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const securityScore = (() => {
    let score = 0;
    if (form.twoFactor)        score += 30;
    if (form.loginAlerts)      score += 15;
    if (form.ipWhitelist)      score += 20;
    if (form.requireUppercase) score += 10;
    if (form.requireNumbers)   score += 10;
    if (form.requireSpecial)   score += 15;
    return Math.min(score, 100);
  })();

  const scoreColor =
    securityScore >= 70 ? "var(--green)" :
    securityScore >= 40 ? "var(--amber)" : "var(--coral)";

  const scoreLabel =
    securityScore >= 70 ? "Strong" :
    securityScore >= 40 ? "Moderate" : "Weak";

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Security Settings</h2>
          <p className="settings-section-desc">Control authentication, access policies, and password requirements</p>
        </div>
        <span className="settings-section-badge">🔒 Security</span>
      </div>

      {/* Security score */}
      <div
        style={{
          padding: "16px 20px",
          background: "var(--surface-muted)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-md)",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: `conic-gradient(${scoreColor} ${securityScore}%, var(--border) 0)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "var(--surface-muted)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 13, color: scoreColor,
          }}>
            {securityScore}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>
            Security Score: <span style={{ color: scoreColor }}>{scoreLabel}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>
            {securityScore < 70
              ? "Enable more security features to improve your score"
              : "Your account has strong security settings enabled"}
          </div>
        </div>
      </div>

      {/* Authentication toggles */}
      <div className="settings-toggle-group" style={{ marginBottom: 28 }}>
        {SECURITY_TOGGLES.map((t) => (
          <div
            key={t.key}
            className="settings-toggle-row"
            onClick={() => set(t.key, !form[t.key])}
            style={t.critical && form[t.key] ? { borderColor: "var(--cobalt)" } : undefined}
          >
            <div className="settings-toggle-info">
              <div className="settings-toggle-icon">{t.icon}</div>
              <div className="settings-toggle-text">
                <span className="settings-toggle-label">
                  {t.label}
                  {t.critical && (
                    <span style={{
                      marginLeft: 8, fontSize: 10, fontWeight: 700, padding: "2px 6px",
                      borderRadius: 4, background: "rgba(226,92,92,0.12)", color: "var(--coral)",
                    }}>
                      Recommended
                    </span>
                  )}
                </span>
                <span className="settings-toggle-desc">{t.desc}</span>
              </div>
            </div>
            <Toggle
              id={`security-${t.key}`}
              checked={form[t.key]}
              onChange={(e) => { e.stopPropagation(); set(t.key, e.target.checked); }}
            />
          </div>
        ))}
      </div>

      <hr className="settings-divider" />

      {/* Session & login */}
      <div className="settings-form" style={{ marginBottom: 28 }}>
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Session Timeout</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Auto-logout after inactivity
            </p>
            <select className="settings-select" value={form.sessionTimeout}
              onChange={(e) => set("sessionTimeout", e.target.value)}
              id="security-session-timeout">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="480">8 hours</option>
              <option value="0">Never (not recommended)</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Password Expiry</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Force password change after this period
            </p>
            <select className="settings-select" value={form.passwordExpiry}
              onChange={(e) => set("passwordExpiry", e.target.value)}
              id="security-password-expiry">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="0">Never expire</option>
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Max Login Attempts</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Account locked after N failed logins
            </p>
            <select className="settings-select" value={form.maxLoginAttempts}
              onChange={(e) => set("maxLoginAttempts", e.target.value)}
              id="security-max-attempts">
              <option value="3">3 attempts</option>
              <option value="5">5 attempts</option>
              <option value="10">10 attempts</option>
              <option value="0">Unlimited</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Minimum Password Length</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Minimum characters required for passwords
            </p>
            <select className="settings-select" value={form.minPasswordLen}
              onChange={(e) => set("minPasswordLen", e.target.value)}
              id="security-min-password-len">
              <option value="6">6 characters</option>
              <option value="8">8 characters</option>
              <option value="10">10 characters</option>
              <option value="12">12 characters</option>
              <option value="16">16 characters</option>
            </select>
          </div>
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Password policy */}
      <div style={{ marginBottom: 24 }}>
        <label className="settings-label" style={{ marginBottom: 14, display: "block" }}>
          Password Complexity Requirements
        </label>
        <div className="settings-toggle-group">
          {PASSWORD_TOGGLES.map((t) => (
            <div
              key={t.key}
              className="settings-toggle-row"
              style={{ padding: "12px 16px" }}
              onClick={() => set(t.key, !form[t.key])}
            >
              <div className="settings-toggle-info">
                <div className="settings-toggle-text">
                  <span className="settings-toggle-label">{t.label}</span>
                </div>
              </div>
              <Toggle
                id={`security-pwd-${t.key}`}
                checked={form[t.key]}
                onChange={(e) => { e.stopPropagation(); set(t.key, e.target.checked); }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="settings-banner danger" style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span>
          <strong>Note:</strong> Changing security settings affects all admin users.
          Changes to 2FA and IP whitelist take effect on the next login.
        </span>
      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="security-save-btn"
        >
          {saved ? "✓ Saved!" : "Save Security Settings"}
        </button>
        {saved && <span className="settings-save-msg">✓ Security policies updated</span>}
      </div>
    </div>
  );
}
