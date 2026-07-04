import { useState } from "react";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const DEFAULTS = {
  email:                true,
  sms:                  false,
  push:                 true,
  sound:                true,
  inApp:                true,
  weeklyDigest:         true,
  reminderSummary:      false,
  defaultReminderTime:  "09:00",
  reminderLeadMinutes:  "15",
  notifFrequency:       "immediate",
};

const TOGGLES = [
  {
    key:  "email",
    icon: "📧",
    label: "Email Notifications",
    desc:  "Receive reminders and system alerts via email",
  },
  {
    key:  "sms",
    icon: "📱",
    label: "SMS Notifications",
    desc:  "Receive text messages for urgent reminders",
  },
  {
    key:  "push",
    icon: "🔔",
    label: "Push Notifications",
    desc:  "Browser push alerts for real-time updates",
  },
  {
    key:  "inApp",
    icon: "💬",
    label: "In-App Notifications",
    desc:  "Notification badge and dropdown inside the panel",
  },
  {
    key:  "sound",
    icon: "🔊",
    label: "Notification Sound",
    desc:  "Play audio alert when a notification arrives",
  },
  {
    key:  "weeklyDigest",
    icon: "📋",
    label: "Weekly Digest Email",
    desc:  "Receive a weekly summary of all reminders every Monday",
  },
  {
    key:  "reminderSummary",
    icon: "📅",
    label: "Daily Reminder Summary",
    desc:  "Morning email with today's scheduled reminders",
  },
];

function Toggle({ checked, onChange, id }) {
  return (
    <label className="toggle" htmlFor={id}>
      <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      <span className="toggle-slider" />
    </label>
  );
}

export default function NotificationSettings() {
  const [form, setForm] = useState(() =>
    storageService.get("settings_notifications", DEFAULTS)
  );
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    storageService.set("settings_notifications", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const activeCount = TOGGLES.filter((t) => form[t.key]).length;

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Notification Settings</h2>
          <p className="settings-section-desc">Control how, when, and where notifications are delivered</p>
        </div>
        <span className="settings-section-badge">
          🔔 {activeCount}/{TOGGLES.length} active
        </span>
      </div>

      {/* Toggles */}
      <div className="settings-toggle-group" style={{ marginBottom: 28 }}>
        {TOGGLES.map((t) => (
          <div
            key={t.key}
            className="settings-toggle-row"
            onClick={() => set(t.key, !form[t.key])}
          >
            <div className="settings-toggle-info">
              <div className="settings-toggle-icon">{t.icon}</div>
              <div className="settings-toggle-text">
                <span className="settings-toggle-label">{t.label}</span>
                <span className="settings-toggle-desc">{t.desc}</span>
              </div>
            </div>
            <Toggle
              id={`notif-${t.key}`}
              checked={form[t.key]}
              onChange={(e) => {
                e.stopPropagation();
                set(t.key, e.target.checked);
              }}
            />
          </div>
        ))}
      </div>

      <hr className="settings-divider" />

      {/* Timing settings */}
      <div className="settings-form">
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Default Reminder Time</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Used when creating reminders without a specific time
            </p>
            <input
              type="time"
              className="settings-input"
              value={form.defaultReminderTime}
              onChange={(e) => set("defaultReminderTime", e.target.value)}
              id="default-reminder-time"
              style={{ maxWidth: 160 }}
            />
          </div>
          <div className="settings-field">
            <label className="settings-label">Early Notification Lead Time</label>
            <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 6 }}>
              Notify this many minutes before the scheduled time
            </p>
            <select
              className="settings-select"
              value={form.reminderLeadMinutes}
              onChange={(e) => set("reminderLeadMinutes", e.target.value)}
              id="notif-lead-time"
            >
              <option value="0">At the exact time</option>
              <option value="5">5 minutes before</option>
              <option value="10">10 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
        </div>

        <div className="settings-field" style={{ maxWidth: 280 }}>
          <label className="settings-label">Notification Delivery Frequency</label>
          <select
            className="settings-select"
            value={form.notifFrequency}
            onChange={(e) => set("notifFrequency", e.target.value)}
            id="notif-frequency"
          >
            <option value="immediate">Immediate (real-time)</option>
            <option value="batched_5">Batched — every 5 minutes</option>
            <option value="batched_15">Batched — every 15 minutes</option>
            <option value="batched_30">Batched — every 30 minutes</option>
            <option value="hourly">Hourly digest</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="notif-save-btn"
        >
          {saved ? "✓ Saved!" : "Save Notification Settings"}
        </button>
        {saved && <span className="settings-save-msg">✓ Notification preferences updated</span>}
      </div>
    </div>
  );
}
