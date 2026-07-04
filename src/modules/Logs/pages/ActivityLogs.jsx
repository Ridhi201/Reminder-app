import { useState, useMemo } from "react";
import { MOCK_LOGS } from "../data/logsMockData";
import "./ActivityLogs.css";

const ACTION_COLORS = {
  create:  { bg: "rgba(47,158,104,0.12)",  color: "#2f9e68" },
  update:  { bg: "rgba(46,90,172,0.12)",   color: "#2e5aac" },
  delete:  { bg: "rgba(226,92,92,0.12)",   color: "#e25c5c" },
  view:    { bg: "rgba(106,90,205,0.12)",  color: "#6a5acd" },
  export:  { bg: "rgba(242,163,61,0.12)",  color: "#f2a33d" },
  login:   { bg: "rgba(13,148,136,0.12)",  color: "#0d9488" },
  logout:  { bg: "rgba(139,147,161,0.12)", color: "#8b93a1" },
};

const ALL_MODULES = ["All", "Auth", "Users", "Reminders", "Templates", "Notifications", "Settings", "Reports"];
const ALL_ACTIONS = ["All", "Created", "Updated", "Deleted", "Viewed", "Exported", "Logged In", "Logged Out"];

const PAGE_SIZE = 15;

function ActionChip({ action, type }) {
  const style = ACTION_COLORS[type] || ACTION_COLORS.view;
  return (
    <span
      className="log-chip"
      style={{ background: style.bg, color: style.color }}
    >
      {action}
    </span>
  );
}

export default function ActivityLogs() {
  const [search,   setSearch]   = useState("");
  const [module,   setModule]   = useState("All");
  const [action,   setAction]   = useState("All");
  const [page,     setPage]     = useState(1);

  const filtered = useMemo(() => {
    return MOCK_LOGS.filter((l) => {
      const matchSearch = !search || [l.user, l.action, l.module, l.ip, l.device]
        .some((v) => v.toLowerCase().includes(search.toLowerCase()));
      const matchModule = module === "All" || l.module === module;
      const matchAction = action === "All" || l.action === action;
      return matchSearch && matchModule && matchAction;
    });
  }, [search, module, action]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (setter) => (val) => { setter(val); setPage(1); };

  return (
    <div className="logs-screen screen">
      {/* Header */}
      <div className="logs-header">
        <div>
          <h1 className="logs-title">Activity Logs</h1>
          <p className="logs-subtitle">Track every action performed in the system</p>
        </div>
        <div className="logs-total-badge">{filtered.length} entries</div>
      </div>

      {/* Filters */}
      <div className="logs-filters">
        <input
          type="search"
          className="logs-search"
          placeholder="Search user, action, module, IP…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          id="logs-search"
        />

        <select
          className="logs-select"
          value={module}
          onChange={(e) => handleFilter(setModule)(e.target.value)}
          id="logs-module-filter"
        >
          {ALL_MODULES.map((m) => <option key={m}>{m}</option>)}
        </select>

        <select
          className="logs-select"
          value={action}
          onChange={(e) => handleFilter(setAction)(e.target.value)}
          id="logs-action-filter"
        >
          {ALL_ACTIONS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="logs-table-wrap">
        <table className="logs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Time</th>
              <th>IP Address</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--ink-faint)" }}>
                  No logs found for the selected filters.
                </td>
              </tr>
            ) : paginated.map((log, i) => (
              <tr key={log.id} className="logs-row">
                <td className="logs-cell-num">{(page - 1) * PAGE_SIZE + i + 1}</td>
                <td>
                  <div className="logs-user">
                    <div className="logs-user-avatar">
                      {log.user.charAt(0)}
                    </div>
                    {log.user}
                  </div>
                </td>
                <td>
                  <ActionChip action={log.action} type={log.type} />
                </td>
                <td className="logs-module">{log.module}</td>
                <td className="logs-time">{log.timeStr}</td>
                <td className="logs-ip">{log.ip}</td>
                <td className="logs-device">{log.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="logs-pagination">
          <button
            className="logs-page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            id="logs-prev"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => Math.abs(p - page) <= 2)
            .map((p) => (
              <button
                key={p}
                id={`logs-page-${p}`}
                className={`logs-page-btn ${p === page ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

          <button
            className="logs-page-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            id="logs-next"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
