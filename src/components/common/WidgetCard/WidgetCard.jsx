import styles from "./WidgetCard.module.css";

export default function WidgetCard({ children, className = "" }) {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
}
