import { useState } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import { storageService } from "../../../services/storage.service";
import "../pages/Settings.css";

const ACCENT_COLORS = [
  { name: "Midnight",   value: "#0f172a" },  // Deep midnight navy — ultra premium
  { name: "Obsidian",   value: "#1e293b" },  // Charcoal obsidian — timeless dark
  { name: "Sapphire",   value: "#1d4ed8" },  // Rich sapphire blue — bold & elegant
  { name: "Burgundy",   value: "#9f1239" },  // Deep burgundy — classic luxury
  { name: "Champagne",  value: "#b45309" },  // Warm champagne gold — sophisticated
  { name: "Emerald",    value: "#065f46" },  // Deep emerald green — refined
  { name: "Plum",       value: "#581c87" },  // Royal plum — dramatic & classy
  { name: "Slate",      value: "#475569" },  // Cool slate — clean minimal
];

const SIDEBAR_STYLES = [
  { id: "Expanded", icon: "◀▶", desc: "Full sidebar with labels" },
  { id: "Compact",  icon: "•",  desc: "Icon-only minimalist sidebar" },
];

const FONT_SIZES = [
  { id: "sm",  label: "Small",   px: "13px" },
  { id: "md",  label: "Medium",  px: "14px" },
  { id: "lg",  label: "Large",   px: "15px" },
  { id: "xl",  label: "X-Large", px: "16px" },
];

const THEMES = [
  { id: "light",  icon: "☀️",  label: "Light",  desc: "Clean white interface" },
];


export default function AppearanceSettings() {
  const { theme, setTheme } = useThemeContext();

  const [accent,   setAccent]   = useState(() => storageService.get("settings_accent",  "#2e5aac"));
  const [sidebar,  setSidebar]  = useState(() => storageService.get("settings_sidebar", "Expanded"));
  const [fontSize, setFontSize] = useState(() => storageService.get("settings_fontsize","md"));
  const [saved,    setSaved]    = useState(false);

  const handleThemeClick = (t) => {
    setTheme(t.id);
  };

  const handleSave = () => {
    storageService.set("settings_accent",  accent);
    storageService.set("settings_sidebar", sidebar);
    storageService.set("settings_fontsize", fontSize);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Appearance</h2>
          <p className="settings-section-desc">Personalise the look, feel, and visual style of your admin panel</p>
        </div>
        <span className="settings-section-badge">🎨 Visual</span>
      </div>

      {/* Theme */}
      <div className="settings-field" style={{ marginBottom: 28 }}>
        <label className="settings-label" style={{ marginBottom: 12, display: "block" }}>
          Theme Mode
        </label>
        <div className="theme-cards">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-card ${theme === t.id || (t.id === "system" && false) ? "selected" : ""}`}
              onClick={() => handleThemeClick(t)}
              id={`theme-${t.id}`}
            >
              <span className="theme-card-icon">{t.icon}</span>
              <span className="theme-card-label">{t.label}</span>
              <span style={{ fontSize: 11, color: "var(--ink-faint)", textAlign: "center" }}>
                {t.desc}
              </span>
              <span className="theme-card-check">
                {(theme === t.id) ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Accent color */}
      <div className="settings-field" style={{ marginBottom: 28 }}>
        <label className="settings-label" style={{ marginBottom: 4, display: "block" }}>
          Primary / Accent Color
        </label>
        <p style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 14 }}>
          Sets the primary brand color throughout the panel
        </p>
        <div className="color-swatches">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.value}
              className={`color-swatch ${accent === c.value ? "selected" : ""}`}
              style={{ background: c.value }}
              onClick={() => setAccent(c.value)}
              title={c.name}
              aria-label={`Select ${c.name} accent`}
              id={`accent-${c.name.toLowerCase()}`}
            />
          ))}

          {/* Custom color picker */}
          <label
            title="Custom color"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              cursor: "pointer", border: "2px dashed var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "border-color 0.15s ease",
            }}
          >
            +
            <input
              type="color"
              hidden
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              id="accent-custom"
            />
          </label>
        </div>
        <div
          style={{
            marginTop: 14, padding: "10px 14px",
            background: "var(--surface-muted)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: accent, flexShrink: 0,
            border: "1px solid rgba(0,0,0,0.1)",
          }} />
          <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>
            Selected: <strong style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{accent}</strong>
          </span>
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Sidebar style */}
      <div className="settings-field" style={{ marginBottom: 28 }}>
        <label className="settings-label" style={{ marginBottom: 12, display: "block" }}>
          Sidebar Style
        </label>
        <div style={{ display: "flex", gap: 12 }}>
          {SIDEBAR_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSidebar(s.id)}
              id={`sidebar-${s.id.toLowerCase()}`}
              style={{
                padding: "14px 20px",
                borderRadius: "var(--radius-md)",
                border: `2px solid ${sidebar === s.id ? "var(--cobalt)" : "var(--border)"}`,
                background: sidebar === s.id ? "rgba(46,90,172,0.08)" : "var(--surface-muted)",
                color: sidebar === s.id ? "var(--cobalt)" : "var(--ink-muted)",
                fontWeight: sidebar === s.id ? 700 : 500,
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "var(--font-body)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                transition: "all 0.15s ease",
                minWidth: 120,
              }}
            >
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span>{s.id}</span>
              <span style={{ fontSize: 11, opacity: 0.7 }}>{s.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="settings-divider" />

      {/* Font size */}
      <div className="settings-field" style={{ marginBottom: 4 }}>
        <label className="settings-label" style={{ marginBottom: 12, display: "block" }}>
          Font Size
        </label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {FONT_SIZES.map((f) => (
            <button
              key={f.id}
              onClick={() => setFontSize(f.id)}
              id={`font-size-${f.id}`}
              style={{
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                border: `2px solid ${fontSize === f.id ? "var(--cobalt)" : "var(--border)"}`,
                background: fontSize === f.id ? "rgba(46,90,172,0.08)" : "var(--surface-muted)",
                color: fontSize === f.id ? "var(--cobalt)" : "var(--ink-muted)",
                fontWeight: fontSize === f.id ? 700 : 500,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: f.px,
                transition: "all 0.15s ease",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 10 }}>
          Font size changes apply after saving and refreshing the page.
        </p>
      </div>

      <div className="settings-actions">
        <button
          className={`settings-save-btn${saved ? " saved" : ""}`}
          onClick={handleSave}
          id="appearance-save-btn"
        >
          {saved ? "✓ Saved!" : "Save Preferences"}
        </button>
        {saved && <span className="settings-save-msg">✓ Appearance preferences saved</span>}
      </div>
    </div>
  );
}
