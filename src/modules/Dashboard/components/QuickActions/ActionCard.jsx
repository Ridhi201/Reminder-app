import styles from "./ActionCard.module.css";

export default function ActionCard({
  title,
  icon: Icon,
  color,
}) {
  return (
    <div className={styles.card}>

      <div
        className={styles.icon}
        style={{ background: color }}
      >
        <Icon size={26} color="white" />
      </div>

      <h4>{title}</h4>

    </div>
  );
}
