import {
  MdPersonAdd,
  MdDescription,
  MdSettings,
} from "react-icons/md";

const quickActions = [
  {
    title: "Add User",
    icon: MdPersonAdd,
    bg:     "#1d4ed8",                   // Sapphire Blue
    shadow: "rgba(29,78,216,0.35)",
  },
  {
    title: "Templates",
    icon: MdDescription,
    bg:     "#7c3aed",                   // Royal Violet
    shadow: "rgba(124,58,237,0.35)",
  },
  {
    title: "Settings",
    icon: MdSettings,
    bg:     "#065f46",                   // Deep Emerald
    shadow: "rgba(6,95,70,0.35)",
  },
];

export default quickActions;
