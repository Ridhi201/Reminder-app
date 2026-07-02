import styles from "./DashboardGrid.module.css";

export default function DashboardGrid({ left, right }) {
  return (
    <div className={styles.grid}>

      <div className={styles.left}>
        {left}
      </div>

      <div className={styles.right}>
        {right}
      </div>

    </div>
  );
}
