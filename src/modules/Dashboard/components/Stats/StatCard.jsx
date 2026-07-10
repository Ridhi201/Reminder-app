import { useNavigate } from "react-router-dom";
import styles from "./StatCard.module.css";

export default function StatCard({ title, value, percentage, color, icon, index = 0, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  const renderTrend = () => {
    if (!percentage) return null;
    if (percentage.startsWith("+") || percentage.startsWith("-") || percentage.includes("%")) {
      return `${percentage} this month`;
    }
    return percentage;
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.top}>
        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
        </div>
        <div className={styles.icon}>{icon}</div>
      </div>
      {percentage && (
        <p className={styles.trend}>
          {renderTrend()}
        </p>
      )}
    </div>
  );
}
