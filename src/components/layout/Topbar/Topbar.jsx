import { useNavigate } from "react-router-dom";
import { MdMenu, MdSettings, MdNotifications } from "react-icons/md";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "./Topbar.module.css";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className={styles.topbar}>
      {/* Menu toggle (hamburger) */}
      <button
        className={styles.menuButton}
        aria-label="Toggle sidebar"
        onClick={onMenuClick}
      >
        <MdMenu size={24} />
      </button>

      <div className={styles.right}>
        {/* Notifications bell */}
        <button
          className={styles.notifButton}
          aria-label="Notifications"
          title="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <MdNotifications size={22} />
        </button>

        {/* Settings */}
        <button
          className={styles.settingsButton}
          aria-label="Settings"
          title="Settings"
          onClick={() => navigate("/settings")}
        >
          <MdSettings size={22} />
        </button>

        {/* Profile chip */}
        <div
          className={styles.profile}
          onClick={() => navigate("/profile")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/profile")}
          aria-label="Go to profile"
          title="My Profile"
        >
          <img
            src={user?.avatar ?? "https://i.pravatar.cc/150?img=5"}
            alt={user?.name ?? "Profile"}
          />
          <div className={styles.profileText}>
            <h4>{user?.name ?? "Admin"}</h4>
            <p>{user?.email ?? "admin@acme.com"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
