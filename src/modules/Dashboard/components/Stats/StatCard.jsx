import styles from "./StatCard.module.css";

export default function StatCard({
  title,
  value,
  percentage,
  color,
  icon,
}) {
  return (
    <div className={styles.card}>

      <div className={styles.top}>

        <div>

          <h4>{title}</h4>

          <h2>{value}</h2>

        </div>

        <div className={styles.icon}>

          {icon}

        </div>

      </div>

      <p style={{ color }}>

        {percentage} this month

      </p>

    </div>

  );

}
