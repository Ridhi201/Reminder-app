import { useState } from "react";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const DEFAULTS = {
  appName:     "Reminder Admin",
  tagline:     "Your smart reminder management system",
  timezone:    "Asia/Kolkata",
  dateFormat:  "DD/MM/YYYY",
  timeFormat:  "12h",
  language:    "en",
  currency:    "INR",
  weekStart:   "monday",
  itemsPerPage:"25",
};

export default function GeneralSettings() {
  const [form, setForm] = useState(() =>
    storageService.get("settings_general", DEFAULTS)
  );
  const [saved, setSaved] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    storageService.set("settings_general", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setForm(DEFAULTS);
    storageService.set("settings_general", DEFAULTS);
  };

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">General Settings</h2>
          <p className="settings-section-desc">Basic application configuration and regional preferences</p>
        </div>
        <span className="settings-section-badge">⚙️ Core</span>
      </div>

      <div className="settings-form">

        {/* App Identity */}
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Application Name</label>
            <input
              className="settings-input"
              value={form.appName}
              onChange={(e) => set("appName", e.target.value)}
              placeholder="Reminder Admin"
              id="general-app-name"
            />
          </div>
          <div className="settings-field">
            <label className="settings-label">
              App Tagline <span className="settings-label-hint">(optional)</span>
            </label>
            <input
              className="settings-input"
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="Your smart reminder management system"
              id="general-tagline"
            />
          </div>
        </div>

        <hr className="settings-divider" />

        {/* Regional */}
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Timezone</label>
            <select
              className="settings-select"
              value={form.timezone}
              onChange={(e) => set("timezone", e.target.value)}
              id="general-timezone"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
              <option value="UTC">UTC (±00:00)</option>
              <option value="America/New_York">America/New_York (EST -5:00)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (PST -8:00)</option>
              <option value="Europe/London">Europe/London (GMT ±0)</option>
              <option value="Europe/Paris">Europe/Paris (CET +1)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST +4)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT +8)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEDT +11)</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Language</label>
            <select
              className="settings-select"
              value={form.language}
              onChange={(e) => set("language", e.target.value)}
              id="general-language"
            >
              <option value="en">🇺🇸 English</option>
              <option value="hi">🇮🇳 Hindi</option>
              <option value="ta">🇮🇳 Tamil</option>
              <option value="te">🇮🇳 Telugu</option>
              <option value="fr">🇫🇷 French</option>
              <option value="de">🇩🇪 German</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="ar">🇸🇦 Arabic</option>
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Date Format</label>
            <select
              className="settings-select"
              value={form.dateFormat}
              onChange={(e) => set("dateFormat", e.target.value)}
              id="general-date-format"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
              <option value="DD-MMM-YYYY">DD-MMM-YYYY (31-Dec-2024)</option>
              <option value="MMM DD, YYYY">MMM DD, YYYY (Dec 31, 2024)</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Time Format</label>
            <select
              className="settings-select"
              value={form.timeFormat}
              onChange={(e) => set("timeFormat", e.target.value)}
              id="general-time-format"
            >
              <option value="12h">12-hour (3:00 PM)</option>
              <option value="24h">24-hour (15:00)</option>
            </select>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Currency</label>
            <select
              className="settings-select"
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
              id="general-currency"
            >
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
              <option value="GBP">£ British Pound (GBP)</option>
              <option value="AED">د.إ UAE Dirham (AED)</option>
              <option value="SGD">S$ Singapore Dollar (SGD)</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">Week Starts On</label>
            <select
              className="settings-select"
              value={form.weekStart}
              onChange={(e) => set("weekStart", e.target.value)}
              id="general-week-start"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        </div>

        <div className="settings-field" style={{ maxWidth: 240 }}>
          <label className="settings-label">Items Per Page</label>
          <select
            className="settings-select"
            value={form.itemsPerPage}
            onChange={(e) => set("itemsPerPage", e.target.value)}
            id="general-items-per-page"
          >
            <option value="10">10 items</option>
            <option value="25">25 items</option>
            <option value="50">50 items</option>
            <option value="100">100 items</option>
          </select>
        </div>

      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="general-save-btn"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        <button
          className="settings-reset-btn"
          onClick={handleReset}
          id="general-reset-btn"
        >
          Reset to defaults
        </button>
        {saved && (
          <span className="settings-save-msg">
            ✓ Settings saved successfully
          </span>
        )}
      </div>
    </div>
  );
}
