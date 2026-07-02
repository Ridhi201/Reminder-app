import { NavLink } from "react-router-dom";
import styles from "./SidebarItem.module.css";

export default function SidebarItem({
  icon: Icon,
  title,
  to,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ""}`
      }
    >
      <Icon size={22} />

      <span>{title}</span>
    </NavLink>
  );
}
