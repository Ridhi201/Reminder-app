import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdPeople, MdAlarm, MdNotifications, MdDescription
} from "react-icons/md";
import ReportSection from "../components/ReportSection";
import "./Reports.css";

const TABS = [
  { id: "users",         label: "Users",          icon: MdPeople,        color: "#2e5aac" },
  { id: "reminders",     label: "Reminders",      icon: MdAlarm,         color: "#2f9e68" },
  { id: "notifications", label: "Notifications",  icon: MdNotifications, color: "#f2a33d" },
  { id: "templates",     label: "Templates",      icon: MdDescription,   color: "#6a5acd" },
];

export default function Reports() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeId = TABS.find((t) => t.id === tab)?.id ?? "users";
  const activeTab = TABS.find((t) => t.id === activeId);

  return (
    <div className="reports-screen screen">
      {/* Header */}
      <div className="reports-header">
        <h1 className="reports-title">Reports &amp; Analytics</h1>
        <p className="reports-subtitle">Visualise trends and performance across all modules</p>
      </div>

      {/* Tab bar */}
      <div className="reports-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`report-tab-${t.id}`}
            className={`reports-tab ${activeId === t.id ? "active" : ""}`}
            onClick={() => navigate(`/reports/${t.id}`)}
            style={activeId === t.id ? { borderColor: t.color, color: t.color } : {}}
          >
            <t.icon size={18} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <ReportSection module={activeId} color={activeTab.color} />
    </div>
  );
}
