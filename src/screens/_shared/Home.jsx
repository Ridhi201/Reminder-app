import { Link } from "react-router-dom";
import { NAVIGATION_STRUCTURE } from "../../constants/navigationStructure.js";
import Card from "../../components/common/Card/Card.jsx";
import Chip from "../../components/common/Chip/Chip.jsx";
import "./Home.css";

const GROUPS = [
  { label: "Core", keys: ["Dashboard", "Reminder", "Calendar", "Templates"] },
  { label: "Smart features", keys: ["AIAssistant", "VoiceAssistant", "LocationReminder"] },
  { label: "Growth", keys: ["HabitTracker", "GoalTracker", "Pomodoro", "Notes", "Groups"] },
  { label: "Engagement", keys: ["Notifications", "Badges", "XPLevels", "Streak", "Analytics"] },
  { label: "Account & support", keys: ["Premium", "Profile", "Settings", "HelpCenter", "Legal", "Authentication"] },
];

export default function Home() {
  const totalScreens = NAVIGATION_STRUCTURE.reduce((sum, m) => sum + m.screens.length, 0);

  return (
    <div className="screen fade-in home">
      <div className="home__hero">
        <p className="eyebrow">Enterprise architecture · feature-based</p>
        <h1>Every module of the Reminder app, mapped and wired up.</h1>
        <p className="home__hero-sub">
          {NAVIGATION_STRUCTURE.length} modules, {totalScreens} screens — each one routed,
          navigable, and ready for real implementation.
        </p>
      </div>

      {GROUPS.map((group) => {
        const modules = NAVIGATION_STRUCTURE.filter((m) => group.keys.includes(m.key));
        if (!modules.length) return null;
        return (
          <section key={group.label} className="home__section">
            <h2 className="home__section-title">{group.label}</h2>
            <div className="home__grid">
              {modules.map((module) => (
                <Link key={module.key} to={`/${module.slug}`} className="home__link">
                  <Card className="home__card">
                    <div className="home__card-top">
                      <span className="home__card-icon">{module.icon}</span>
                      <Chip tone="neutral">{module.screens.length} screens</Chip>
                    </div>
                    <span className="home__card-title">{module.label}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
