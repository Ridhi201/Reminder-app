import { useState, useRef } from "react";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const DEFAULTS = {
  companyName:   "Acme Corp",
  legalName:     "",
  email:         "admin@acme.com",
  supportEmail:  "support@acme.com",
  phone:         "+91 98765 43210",
  address:       "123 Business Park, Mumbai, Maharashtra 400001",
  city:          "Mumbai",
  state:         "Maharashtra",
  country:       "India",
  pincode:       "400001",
  gst:           "27AABCU9603R1ZX",
  pan:           "",
  cin:           "",
  website:       "https://acme.com",
  logo:          null,
};

const INDUSTRIES = [
  "Technology", "Finance", "Healthcare", "Education", "Retail",
  "Manufacturing", "Consulting", "Real Estate", "Logistics", "Other",
];

export default function CompanySettings() {
  const [form, setForm]   = useState(() => storageService.get("settings_company", DEFAULTS));
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("logo", ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    storageService.set("settings_company", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Company Settings</h2>
          <p className="settings-section-desc">Your business identity, contact information, and legal details</p>
        </div>
        <span className="settings-section-badge">🏢 Business</span>
      </div>

      {/* Logo upload */}
      <div className="settings-field" style={{ marginBottom: 24 }}>
        <label className="settings-label">Company Logo</label>
        <div className="logo-upload-area" onClick={() => fileRef.current.click()}>
          {form.logo ? (
            <>
              <img src={form.logo} alt="Company Logo" className="logo-preview" />
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 8 }}>
                Click to change logo
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🏢</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>
                Upload Company Logo
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 4 }}>
                PNG, JPG or SVG — max 2 MB
              </div>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleLogoChange}
            id="company-logo-upload"
          />
        </div>
      </div>

      <div className="settings-form">

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Company Name</label>
            <input className="settings-input" value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              placeholder="Acme Corp" id="company-name" />
          </div>
          <div className="settings-field">
            <label className="settings-label">
              Legal Name <span className="settings-label-hint">(if different)</span>
            </label>
            <input className="settings-input" value={form.legalName}
              onChange={(e) => set("legalName", e.target.value)}
              placeholder="Acme Corporation Pvt Ltd" id="company-legal-name" />
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Business Email</label>
            <input className="settings-input" type="email" value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="admin@acme.com" id="company-email" />
          </div>
          <div className="settings-field">
            <label className="settings-label">Support Email</label>
            <input className="settings-input" type="email" value={form.supportEmail}
              onChange={(e) => set("supportEmail", e.target.value)}
              placeholder="support@acme.com" id="company-support-email" />
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Phone</label>
            <input className="settings-input" value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+91 98765 43210" id="company-phone" />
          </div>
          <div className="settings-field">
            <label className="settings-label">Website</label>
            <input className="settings-input" value={form.website}
              onChange={(e) => set("website", e.target.value)}
              placeholder="https://acme.com" id="company-website" />
          </div>
        </div>

        <hr className="settings-divider" />

        {/* Address */}
        <div className="settings-field">
          <label className="settings-label">Street Address</label>
          <textarea className="settings-input" value={form.address}
            onChange={(e) => set("address", e.target.value)}
            rows={2} style={{ resize: "vertical" }}
            placeholder="123 Business Park, Floor 4" id="company-address" />
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">City</label>
            <input className="settings-input" value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="Mumbai" id="company-city" />
          </div>
          <div className="settings-field">
            <label className="settings-label">State / Province</label>
            <input className="settings-input" value={form.state}
              onChange={(e) => set("state", e.target.value)}
              placeholder="Maharashtra" id="company-state" />
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">Country</label>
            <select className="settings-select" value={form.country}
              onChange={(e) => set("country", e.target.value)} id="company-country">
              <option value="India">🇮🇳 India</option>
              <option value="USA">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="UAE">🇦🇪 UAE</option>
              <option value="Singapore">🇸🇬 Singapore</option>
              <option value="Australia">🇦🇺 Australia</option>
            </select>
          </div>
          <div className="settings-field">
            <label className="settings-label">PIN / ZIP Code</label>
            <input className="settings-input" value={form.pincode}
              onChange={(e) => set("pincode", e.target.value)}
              placeholder="400001" id="company-pincode" />
          </div>
        </div>

        <hr className="settings-divider" />

        {/* Tax / Legal */}
        <div className="settings-row">
          <div className="settings-field">
            <label className="settings-label">GST Number</label>
            <input className="settings-input" value={form.gst}
              onChange={(e) => set("gst", e.target.value.toUpperCase())}
              placeholder="22AAAAA0000A1Z5" id="company-gst"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }} />
          </div>
          <div className="settings-field">
            <label className="settings-label">PAN Number</label>
            <input className="settings-input" value={form.pan}
              onChange={(e) => set("pan", e.target.value.toUpperCase())}
              placeholder="AAAPL1234C" id="company-pan"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }} />
          </div>
        </div>

        <div className="settings-field" style={{ maxWidth: 320 }}>
          <label className="settings-label">
            CIN <span className="settings-label-hint">(Company Identification Number)</span>
          </label>
          <input className="settings-input" value={form.cin}
            onChange={(e) => set("cin", e.target.value.toUpperCase())}
            placeholder="U72200MH2010PTC123456" id="company-cin"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }} />
        </div>

      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="company-save-btn"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        {saved && <span className="settings-save-msg">✓ Company profile updated</span>}
      </div>
    </div>
  );
}
