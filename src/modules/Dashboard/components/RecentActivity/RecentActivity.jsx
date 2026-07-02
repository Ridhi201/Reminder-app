import styles from "./RecentActivity.module.css";

import activityData from "./ActivityData";
import ActivityCard from "./ActivityCard";

export default function RecentActivity() {
  return (
    <div className={styles.container}>

      <div className={styles.header}>

        <h2>Recent Activity</h2>

        <button>View All</button>

      </div>

      {activityData.map((activity) => (
        <ActivityCard
          key={activity.id}
          {...activity}
        />
      ))}

    </div>
  );
}
