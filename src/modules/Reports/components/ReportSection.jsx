import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { getReportData, getSummaryStats } from "../data/reportsMockData";
import "./Reports.css";

const PERIODS = ["daily", "weekly", "monthly", "yearly"];

function StatCard({ label, value, delta, up }) {
  return (
    <div className="report-stat-card">
      <div className="report-stat-value">{value}</div>
      <div className="report-stat-label">{label}</div>
      <div className={`report-stat-delta ${up ? "up" : "down"}`}>
        {up ? "↑" : "↓"} {delta}
      </div>
    </div>
  );
}

export default function ReportSection({ module, color }) {
  const [period, setPeriod] = useState("monthly");
  const data  = getReportData(module, period);
  const stats = getSummaryStats(module);

  const gradientId = `grad-${module}`;

  return (
    <div className="report-section">
      {/* Summary stats */}
      <div className="report-stats-grid">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Period filter */}
      <div className="report-filter-bar">
        <span className="report-filter-label">Period:</span>
        {PERIODS.map((p) => (
          <button
            key={p}
            id={`period-${p}`}
            className={`report-period-btn ${period === p ? "active" : ""}`}
            onClick={() => setPeriod(p)}
            style={period === p ? { background: color, borderColor: color } : {}}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Area chart */}
      <div className="report-chart-card">
        <h3 className="report-chart-title">
          {module.charAt(0).toUpperCase() + module.slice(1)} — Trend ({period})
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--ink-muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--ink-muted)" }} />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart */}
      <div className="report-chart-card">
        <h3 className="report-chart-title">
          {module.charAt(0).toUpperCase() + module.slice(1)} — Breakdown ({period})
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--ink-muted)" }} />
            <YAxis tick={{ fontSize: 12, fill: "var(--ink-muted)" }} />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
