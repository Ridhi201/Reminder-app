import styles from "./SectionHeader.module.css";

export default function SectionHeader({
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div className={styles.header}>

      <div>

        <h2>{title}</h2>

        {subtitle && (
          <p>{subtitle}</p>
        )}

      </div>

      {action && (
        <button
          onClick={onAction}
          className={styles.button}
        >
          {action}
        </button>
      )}

    </div>
  );
}
