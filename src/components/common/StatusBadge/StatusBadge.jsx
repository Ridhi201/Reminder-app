import styles from "./StatusBadge.module.css";

export default function StatusBadge({
  status = "Active",
}) {

  const statusClass = status
    .toLowerCase()
    .replace(/\s+/g, "");

  return (
    <span
      className={`${styles.badge} ${styles[statusClass]}`}
    >
      {status}
    </span>
  );
}
