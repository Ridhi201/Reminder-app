import {
  MdPeople,
  MdDescription,
  MdNotifications,
  MdSettings,
} from "react-icons/md";

export const dashboardStats = [
  {
    title: "Users",
    value: "2,450",
    percentage: "+12%",
    color: "#22C55E",
    icon: MdPeople,
    path: "/users",
  },
  {
    title: "Templates",
    value: "42",
    percentage: "+5%",
    color: "#3B82F6",
    icon: MdDescription,
    path: "/templates",
  },
  {
    title: "Notifications",
    value: "1,850",
    percentage: "+24%",
    color: "#8B5CF6",
    icon: MdNotifications,
    path: "/notifications",
  },
  {
    title: "Settings",
    value: "System",
    percentage: "Configure",
    color: "#065F46",
    icon: MdSettings,
    path: "/settings",
  },
];
