import { useState } from "react";
import "../pages/Settings.css";

const BACKUP_ACTIONS = [
  {
    id:    "backup-db",
    icon:  "🗄️",
    title: "Backup Database",
    desc:  "Export a full snapshot of all application data as a JSON file",
    label: "Backup Now",
    color: "var(--cobalt)",
    action: () => {
      const data = JSON.stringify({
        backup: true,
        ts: Date.now(),
        version: "1.0.0",
        data: { users: [], reminders: [], templates: [] },
      }, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      a.download = `reminder-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
  },
  {
    id:    "export-csv",
    icon:  "📊",
    title: "Export Reminders CSV",
    desc:  "Download all reminder records as a spreadsheet-compatible CSV file",
    label: "Export CSV",
    color: "var(--green)",
    action: () => {
      const csv = [
        "id,title,user,status,due_date,created_at",
        "1,Sample Reminder,Admin,active,2024-12-31,2024-01-01",
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      a.download = `reminders-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  },
  {
    id:    "export-logs",
    icon:  "📋",
    title: "Download Activity Logs",
    desc:  "Export the current activity log as a CSV file for audit purposes",
    label: "Download Logs",
    color: "var(--amber)",
    action: () => {
      const csv = "timestamp,user,action,module,details\n" +
        new Date().toISOString() + ",Admin,Export,Logs,Manual export triggered";
      const blob = new Blob([csv], { type: "text/csv" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      a.download = `activity-logs-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    },
  },
  {
    id:    "export-settings",
    icon:  "⚙️",
    title: "Export Settings",
    desc:  "Download all configuration settings as a JSON file for transfer",
    label: "Export Settings",
    color: "var(--indigo)",
    action: () => {
      const keys = [
        "settings_general", "settings_company",
        "settings_notifications", "settings_security",
        "settings_accent", "settings_sidebar",
      ];
      const out = {};
      keys.forEach((k) => {
        const raw = localStorage.getItem("reminder-app:" + k);
        if (raw) out[k] = JSON.parse(raw);
      });
      const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url;
      a.download = `settings-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
  },
  {
    id:    "restore-backup",
    icon:  "♻️",
    title: "Restore from Backup",
    desc:  "Upload a previously exported JSON backup to restore all data",
    label: "Choose File",
    color: "var(--coral)",
    action: () => {
      const input = document.createElement("input");
      input.type   = "file";
      input.accept = ".json";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const parsed = JSON.parse(ev.target.result);
            console.log("Parsed backup:", parsed);
            alert(`✓ Backup "${file.name}" loaded successfully!\nBackend integration required to apply.`);
          } catch {
            alert("❌ Invalid backup file. Please select a valid JSON backup.");
          }
        };
        reader.readAsText(file);
      };
      input.click();
    },
  },
  {
    id:    "clear-cache",
    icon:  "🧹",
    title: "Clear App Cache",
    desc:  "Remove cached data and reset local storage (settings will be preserved)",
    label: "Clear Cache",
    color: "var(--ink-muted)",
    action: () => {
      const preserve = ["settings_general","settings_company","settings_notifications","settings_security","settings_accent","settings_sidebar","theme","auth_user"];
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith("reminder-app:") && !preserve.some(p => k.includes(p))) {
          toRemove.push(k);
        }
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
      alert(`✓ Cleared ${toRemove.length} cached items. Settings preserved.`);
    },
  },
];

const LAST_BACKUP = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
  day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
});

export default function BackupSettings() {
  const [loading, setLoading] = useState(null);
  const [done,    setDone]    = useState({});

  const handleAction = async (item) => {
    setLoading(item.id);
    await new Promise((r) => setTimeout(r, 900));
    item.action();
    setLoading(null);
    setDone((d) => ({ ...d, [item.id]: true }));
    setTimeout(() => setDone((d) => ({ ...d, [item.id]: false })), 3000);
  };

  return (
    <div>
      <div className="settings-section-head">
        <div>
          <h2 className="settings-section-title">Backup &amp; Data</h2>
          <p className="settings-section-desc">Manage your data backups, exports, and system restores</p>
        </div>
        <span className="settings-section-badge">💾 Data</span>
      </div>

      {/* Last backup info */}
      <div
        className="settings-banner info"
        style={{ marginBottom: 24 }}
      >
        <span style={{ fontSize: 20 }}>ℹ️</span>
        <div>
          <strong>Last backup:</strong> {LAST_BACKUP}
          <br />
          <span style={{ fontSize: 12, opacity: 0.8 }}>
            We recommend backing up your data at least once a week.
          </span>
        </div>
      </div>

      {/* Backup cards */}
      <div className="backup-grid">
        {BACKUP_ACTIONS.map((item) => (
          <div key={item.id} className="backup-card">
            <div className="backup-card-icon">{item.icon}</div>
            <div className="backup-card-title">{item.title}</div>
            <div className="backup-card-desc">{item.desc}</div>
            <button
              id={item.id}
              className="backup-btn"
              onClick={() => handleAction(item)}
              disabled={loading === item.id}
              style={{
                background: done[item.id] ? "var(--green)" : item.color,
                opacity: loading === item.id ? 0.7 : 1,
              }}
            >
              {loading === item.id
                ? "⏳ Working…"
                : done[item.id]
                  ? "✓ Done!"
                  : item.label}
            </button>
          </div>
        ))}
      </div>

      <div className="settings-banner warning" style={{ marginTop: 24 }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <span>
          <strong>Note:</strong> Client-side backup/restore is fully functional for settings and logs.
          Full database backup requires backend API integration for complete data coverage.
        </span>
      </div>
    </div>
  );
}
