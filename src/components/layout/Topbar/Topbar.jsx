import styles from "./Topbar.module.css";
import { MdMenu, MdDarkMode, MdSettings } from "react-icons/md";

export default function Topbar() {
  return (
    <header className={styles.topbar}>

      <button className={styles.iconButton}>
        <MdMenu size={24} />
      </button>

      <div className={styles.right}>

        <button className={styles.iconButton}>
          <MdDarkMode size={22} />
        </button>

        <button className={styles.iconButton}>
          <MdSettings size={22} />
        </button>

        <div className={styles.profile}>

          <img
            src="https://i.pravatar.cc/150?img=5"
            alt="profile"
          />

          <div>

            <h4>Admin</h4>

            <p>Super Admin</p>

          </div>

        </div>

      </div>

    </header>
  );
}
