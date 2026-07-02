import {
  MdPeople,
  MdAlarm,
  MdCheckCircle,
  MdPending,
} from "react-icons/md";

export const dashboardStats = [
  {
    title: "Users",
    value: "2,450",
    percentage: "+12%",
    color: "#22C55E",
    icon: MdPeople,
  },
  {
    title: "Reminders",
    value: "12,580",
    percentage: "+18%",
    color: "#22C55E",
    icon: MdAlarm,
  },
  {
    title: "Completed",
    value: "245",
    percentage: "+8%",
    color: "#22C55E",
    icon: MdCheckCircle,
  },
  {
    title: "Pending",
    value: "18",
    percentage: "-2%",
    color: "#EF4444",
    icon: MdPending,
  },
];
