import {
  MdDashboard,
  MdPeople,
  MdAlarm,
  MdCalendarMonth,
  MdDescription,
  MdNotifications,
  MdSettings,
  MdLogout,
  MdPerson,
  MdBarChart,
  MdHistory,
} from "react-icons/md";

/**
 * item.divider = true  → renders a visual separator instead of a link
 * item.action  = true  → renders as a button (no NavLink), used for Logout
 */
const SidebarMenu = [
  // ── Core ──────────────────────────────────
  {
    title: "Dashboard",
    icon: MdDashboard,
    path: "/dashboard",
  },

  // ── Data Modules ──────────────────────────
  { divider: true, label: "Management" },
  {
    title: "Users",
    icon: MdPeople,
    path: "/users",
  },
  {
    title: "Templates",
    icon: MdDescription,
    path: "/templates",
  },
  {
    title: "Notifications",
    icon: MdNotifications,
    path: "/notifications",
  },

  // ── Analytics ─────────────────────────────
  { divider: true, label: "Analytics" },
  {
    title: "Reports",
    icon: MdBarChart,
    path: "/reports",
  },
  {
    title: "Activity Logs",
    icon: MdHistory,
    path: "/logs",
  },

  // ── Account ───────────────────────────────
  { divider: true, label: "Account" },
  {
    title: "Settings",
    icon: MdSettings,
    path: "/settings",
  },
  {
    title: "Profile",
    icon: MdPerson,
    path: "/profile",
  },
  {
    title: "Logout",
    icon: MdLogout,
    path: "/logout",
  },
];

export default SidebarMenu;
