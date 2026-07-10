import { dashboardStats } from "../../data/dashboardStats";
import styles from "./Stats.module.css";
import StatCard from "./StatCard";

export default function Stats() {
  return (
    <div className={styles.grid}>

      {dashboardStats.map((stat, i) => (

        <StatCard
          key={stat.title}
          index={i}
          title={stat.title}
          value={stat.value}
          percentage={stat.percentage}
          color={stat.color}
          icon={<stat.icon />}
          path={stat.path}
        />

      ))}

    </div>

  );

}
