import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useAuthContext } from "../../../context/AuthContext";
import SidebarMenu from "./SidebarMenu";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuthContext();
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (onClose) onClose();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        aria-label="Sidebar navigation"
      >
        {/* Mobile close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <MdClose size={22} />
        </button>

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
    </>
  );
}
