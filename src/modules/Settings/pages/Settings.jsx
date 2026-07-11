import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdTune, MdBusiness, MdNotifications,
  MdSecurity, MdBackup, MdChevronRight, MdCode
} from "react-icons/md";
import GeneralSettings      from "../sections/GeneralSettings";
import CompanySettings      from "../sections/CompanySettings";
import NotificationSettings from "../sections/NotificationSettings";
import SecuritySettings     from "../sections/SecuritySettings";
import BackupSettings       from "../sections/BackupSettings";
import "./Settings.css";

const TABS = [
  { id: "general",       label: "General",        icon: MdTune,          desc: "App preferences",         component: GeneralSettings },
  { id: "company",       label: "Company",         icon: MdBusiness,      desc: "Business identity",       component: CompanySettings },
  { id: "notifications", label: "Notifications",   icon: MdNotifications, desc: "Alerts & reminders",      component: NotificationSettings },
  { id: "security",      label: "Security",        icon: MdSecurity,      desc: "Auth & access policies",  component: SecuritySettings },
  { id: "backup",        label: "Backup & Data",   icon: MdBackup,        desc: "Export & restore",        component: BackupSettings },
];

export default function Settings() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeId = TABS.find((t) => t.id === tab)?.id ?? "general";
  const ActiveSection = TABS.find((t) => t.id === activeId).component;

  return (
    <div className="settings-screen screen">

      {/* Page Header */}
      <div className="settings-header">
        <div className="settings-header-text">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">Manage your application preferences and configuration</p>
        </div>
        <div className="settings-breadcrumb">
          <span>Settings</span>
          <MdChevronRight size={14} />
          <span className="settings-breadcrumb-active">
            {TABS.find((t) => t.id === activeId)?.label}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="settings-body">

        {/* Left nav */}
        <aside className="settings-nav">
          <div className="settings-nav-header">Navigation</div>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`settings-nav-item ${activeId === t.id ? "active" : ""}`}
              onClick={() => navigate(`/settings/${t.id}`)}
              id={`settings-tab-${t.id}`}
            >
              <span className="settings-nav-icon-wrap">
                <t.icon size={17} />
              </span>
              <div className="settings-nav-text">
                <span className="settings-nav-label">{t.label}</span>
                <span className="settings-nav-desc">{t.desc}</span>
              </div>
              {activeId === t.id && <MdChevronRight size={16} className="settings-nav-chevron" />}
            </button>
          ))}
        </aside>

        {/* Right panel */}
        <section className="settings-panel">
          <ActiveSection key={activeId} />
        </section>

      </div>
    </div>
  );
}
