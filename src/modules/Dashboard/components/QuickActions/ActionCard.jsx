import styles from "./ActionCard.module.css";

export default function ActionCard({ title, icon: Icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <Icon size={28} color="white" />
      </div>
      <h4>{title}</h4>
    </div>
  );
}
