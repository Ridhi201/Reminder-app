import styles from "./PageHeader.module.css";
import Button from "../Button";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonVariant = "primary",
  onButtonClick,
  showButton = true,
}) {
  return (
    <div className={styles.container}>

      <div>

        <h1 className={styles.title}>
          {title}
        </h1>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}

      </div>

      {showButton && buttonText && (
        <Button
          variant={buttonVariant}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}

    </div>
  );
}
