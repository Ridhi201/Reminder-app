import { dashboardStats } from "../../data/dashboardStats";
import styles from "./Stats.module.css";
import StatCard from "./StatCard";

export default function Stats() {
  return (
    <div className={styles.grid}>

      {dashboardStats.map((stat) => (

        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          percentage={stat.percentage}
          color={stat.color}
          icon={<stat.icon />}
        />

      ))}

    </div>

  );

}
