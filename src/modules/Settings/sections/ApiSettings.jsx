import { useState } from "react";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const DEFAULTS = {
  apiKey:         "rma_live_xK9mQ2vTpJLfNdRwYsHbGcAeUiOjMlZk",
  webhookUrl:     "",
  webhookSecret:  "",
  allowedOrigins: "https://yourdomain.com",
  rateLimitRpm:   "100",
  apiEnabled:     true,
  webhookEnabled: false,
  logRequests:    true,
};

const EVENTS = [
  { key: "reminder.created",   label: "Reminder Created",    icon: "➕" },
  { key: "reminder.triggered", label: "Reminder Triggered",  icon: "🔔" },
  { key: "reminder.completed", label: "Reminder Completed",  icon: "✅" },
  { key: "user.created",       label: "User Created",        icon: "👤" },
  { key: "notification.sent",  label: "Notification Sent",   icon: "📨" },
];

function Toggle({ checked, onChange, id }) {
  return (
    <label className="toggle" htmlFor={id}>
      <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      <span className="toggle-slider" />
    </label>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      className="api-key-copy-btn"
      onClick={handleCopy}
      title="Copy to clipboard"
      type="button"
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

export default function ApiSettings() {
  const [form, setForm]       = useState(() => storageService.get("settings_api", DEFAULTS));
  const [events, setEvents]   = useState(() => storageService.get("settings_api_events", ["reminder.triggered", "reminder.completed"]));
  const [saved, setSaved]     = useState(false);
  const [showKey, setShowKey] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleEvent = (key) => {
    setEvents((e) =>
      e.includes(key) ? e.filter((x) => x !== key) : [...e, key]
    );
  };

  const generateKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const key = "rma_live_" + Array.from({ length: 32 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
    set("apiKey", key);
  };

  const handleSave = () => {
    storageService.set("settings_api", form);
    storageService.set("settings_api_events", events);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const maskedKey = form.apiKey.slice(0, 12) + "•".repeat(20) + form.apiKey.slice(-4);

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">API Integration</h2>
          <p className="settings-section-desc">Manage API keys, webhooks, and external integrations</p>
        </div>
        <span className="settings-section-badge">🔌 API</span>
      </div>

      {/* Stats */}
      <div className="settings-stats-row" style={{ marginBottom: 24 }}>
        <div className="settings-stat-chip">
          <span className="settings-stat-value">1</span>
          <span className="settings-stat-label">Active API Keys</span>
        </div>
        <div className="settings-stat-chip">
          <span className="settings-stat-value">{events.length}</span>
          <span className="settings-stat-label">Webhook Events</span>
        </div>
        <div className="settings-stat-chip">
          <span className="settings-stat-value">{form.rateLimitRpm}</span>
          <span className="settings-stat-label">Req / Minute Limit</span>
        </div>
      </div>

      {/* API toggle */}
      <div className="settings-toggle-group" style={{ marginBottom: 24 }}>
        <div
          className="settings-toggle-row"
          onClick={() => set("apiEnabled", !form.apiEnabled)}
        >
          <div className="settings-toggle-info">
            <div className="settings-toggle-icon">🔌</div>
            <div className="settings-toggle-text">
              <span className="settings-toggle-label">Enable API Access</span>
              <span className="settings-toggle-desc">Allow external applications to connect via REST API</span>
            </div>
          </div>
          <Toggle id="api-enabled" checked={form.apiEnabled}
            onChange={(e) => { e.stopPropagation(); set("apiEnabled", e.target.checked); }} />
        </div>
        <div
          className="settings-toggle-row"
          onClick={() => set("logRequests", !form.logRequests)}
        >
          <div className="settings-toggle-info">
            <div className="settings-toggle-icon">📝</div>
            <div className="settings-toggle-text">
              <span className="settings-toggle-label">Log API Requests</span>
              <span className="settings-toggle-desc">Record all incoming API requests in the activity log</span>
            </div>
          </div>
          <Toggle id="api-log-requests" checked={form.logRequests}
            onChange={(e) => { e.stopPropagation(); set("logRequests", e.target.checked); }} />
        </div>
      </div>

      <hr className="settings-divider" />

      {/* API Key */}
      <div className="settings-field" style={{ marginBottom: 24 }}>
        <label className="settings-label">API Key</label>
        <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 8 }}>
          Use this key to authenticate API requests. Keep it secret.
        </p>
        <div className="api-key-wrap">
          <input
            className="settings-input api-key-input"
            type={showKey ? "text" : "password"}
            value={form.apiKey}
            readOnly
            id="api-key-field"
          />
          <CopyButton text={form.apiKey} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            onClick={() => setShowKey((s) => !s)}
            style={{
              padding: "7px 14px", fontSize: 12, borderRadius: 6,
              border: "1.5px solid var(--border)", background: "none",
              color: "var(--ink-muted)", cursor: "pointer", fontFamily: "var(--font-body)",
            }}
            type="button"
            id="api-toggle-visibility"
          >
            {showKey ? "🙈 Hide Key" : "👁 Show Key"}
          </button>
          <button
            onClick={generateKey}
            style={{
              padding: "7px 14px", fontSize: 12, borderRadius: 6,
              border: "1.5px solid var(--coral)", background: "rgba(226,92,92,0.06)",
              color: "var(--coral)", cursor: "pointer", fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
            type="button"
            id="api-regenerate-key"
          >
            ↻ Regenerate Key
          </button>
        </div>
        <div className="settings-banner warning" style={{ marginTop: 12 }}>
          <span>⚠️</span>
          <span style={{ fontSize: 12 }}>
            Regenerating will invalidate the existing key. All integrations using the old key will break.
          </span>
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Rate limit & CORS */}
      <div className="settings-form" style={{ marginBottom: 28 }}>
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Rate Limit (requests / minute)</label>
            <select className="settings-select" value={form.rateLimitRpm}
              onChange={(e) => set("rateLimitRpm", e.target.value)} id="api-rate-limit">
              <option value="50">50 req/min</option>
              <option value="100">100 req/min</option>
              <option value="200">200 req/min</option>
              <option value="500">500 req/min</option>
              <option value="0">Unlimited</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Allowed Origins (CORS)</label>
            <input className="settings-input" value={form.allowedOrigins}
              onChange={(e) => set("allowedOrigins", e.target.value)}
              placeholder="https://yourdomain.com" id="api-cors-origins"
              style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} />
            <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
              Separate multiple origins with commas
            </span>
          </div>
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Webhooks */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <label className="settings-label">Webhook Configuration</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 2 }}>
              Receive real-time POST requests when events occur
            </p>
          </div>
          <Toggle
            id="webhook-enabled"
            checked={form.webhookEnabled}
            onChange={(e) => set("webhookEnabled", e.target.checked)}
          />
        </div>

        {form.webhookEnabled && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="settings-field">
              <label className="settings-label">Webhook URL</label>
              <input className="settings-input" value={form.webhookUrl}
                onChange={(e) => set("webhookUrl", e.target.value)}
                placeholder="https://yourdomain.com/webhooks/reminder"
                id="webhook-url"
                style={{ fontFamily: "var(--font-mono)", fontSize: 13 }} />
            </div>
            <div className="settings-field">
              <label className="settings-label">
                Webhook Secret <span className="settings-label-hint">(for signature verification)</span>
              </label>
              <div className="api-key-wrap">
                <input className="settings-input api-key-input" type="password"
                  value={form.webhookSecret}
                  onChange={(e) => set("webhookSecret", e.target.value)}
                  placeholder="whsec_••••••••••••••••"
                  id="webhook-secret" />
                <CopyButton text={form.webhookSecret} />
              </div>
            </div>

            {/* Event subscriptions */}
            <div>
              <label className="settings-label" style={{ marginBottom: 12, display: "block" }}>
                Subscribe to Events
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {EVENTS.map((ev) => (
                  <label
                    key={ev.key}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px",
                      background: events.includes(ev.key) ? "rgba(46,90,172,0.06)" : "var(--surface-muted)",
                      border: `1.5px solid ${events.includes(ev.key) ? "rgba(46,90,172,0.25)" : "var(--border)"}`,
                      borderRadius: "var(--radius-md)", cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={events.includes(ev.key)}
                      onChange={() => toggleEvent(ev.key)}
                      id={`event-${ev.key}`}
                      style={{ accentColor: "var(--cobalt)", width: 16, height: 16 }}
                    />
                    <span style={{ fontSize: 17 }}>{ev.icon}</span>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                        {ev.label}
                      </span>
                      <br />
                      <span style={{ fontSize: 11, color: "var(--ink-faint)", fontFamily: "var(--font-mono)" }}>
                        {ev.key}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="api-save-btn"
        >
          {saved ? "✓ Saved!" : "Save API Settings"}
        </button>
        {saved && <span className="settings-save-msg">✓ API settings updated</span>}
      </div>
    </div>
  );
}
