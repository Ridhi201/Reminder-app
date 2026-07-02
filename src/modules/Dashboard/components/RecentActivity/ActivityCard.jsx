import styles from "./ActivityCard.module.css";

export default function ActivityCard({
  icon: Icon,
  title,
  time,
  color,
}) {
  return (
    <div className={styles.card}>

      <div
        className={styles.icon}
        style={{ background: color }}
      >
        <Icon size={20} color="white" />
      </div>

      <div className={styles.info}>
        <h4>{title}</h4>
        <p>{time}</p>
      </div>

    </div>
  );
}
