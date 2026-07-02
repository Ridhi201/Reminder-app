import {
  MdDashboard,
  MdPeople,
  MdAlarm,
  MdCalendarMonth,
  MdDescription,
  MdNotifications,
  MdSettings,
  MdLogout,
} from "react-icons/md";

const SidebarMenu = [
  {
    title: "Dashboard",
    icon: MdDashboard,
    path: "/dashboard",
  },
  {
    title: "Users",
    icon: MdPeople,
    path: "/users",
  },
  {
    title: "Reminders",
    icon: MdAlarm,
    path: "/reminders",
  },
  {
    title: "Calendar",
    icon: MdCalendarMonth,
    path: "/calendar",
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
  {
    title: "Settings",
    icon: MdSettings,
    path: "/settings",
  },
  {
    title: "Logout",
    icon: MdLogout,
    path: "/logout",
  },
];

export default SidebarMenu;
