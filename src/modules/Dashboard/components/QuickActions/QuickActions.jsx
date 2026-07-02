import styles from "./QuickActions.module.css";
import quickActions from "./QuickActionsData";
import ActionCard from "./ActionCard";

export default function QuickActions() {
  return (
    <div>

      <h2 className={styles.heading}>
        Quick Actions
      </h2>

      <div className={styles.grid}>

        {quickActions.map((item) => (
          <ActionCard
            key={item.title}
            {...item}
          />
        ))}

      </div>

    </div>
  );
}
