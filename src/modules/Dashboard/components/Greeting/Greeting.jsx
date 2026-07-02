import styles from "./Greeting.module.css";

export default function Greeting() {
  const today = new Date();
  const hour = today.getHours();

  let greetingText = "🌅 Good Morning";
  if (hour >= 12 && hour < 17) {
    greetingText = "☀️ Good Afternoon";
  } else if (hour >= 17 || hour < 5) {
    greetingText = "🌙 Good Evening";
  }

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.greeting}>

      <div>

        <h1>{greetingText}</h1>

        <p>Welcome back, Admin</p>

      </div>

      <span>{date}</span>

    </div>

  );

}
