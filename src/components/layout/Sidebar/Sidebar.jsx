import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import SidebarMenu from "./SidebarMenu";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⚡</span>
        <span className={styles.logoText}>Reminder<span className={styles.logoAccent}>Admin</span></span>
      </div>

      {/* User chip */}
      {user && (
        <div className={styles.userChip}>
          <img src={user.avatar} alt={user.name} className={styles.userAvatar} />
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className={styles.menu}>
        {SidebarMenu.map((item, index) => {
          if (item.divider) {
            return (
              <div key={`divider-${index}`} className={styles.divider}>
                {item.label && <span className={styles.dividerLabel}>{item.label}</span>}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <item.icon size={20} className={styles.itemIcon} />
              <span className={styles.itemLabel}>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <span>v1.0.0</span>
      </div>
    </aside>
  );
}
