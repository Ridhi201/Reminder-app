import React from "react";
import { FaBell, FaCalendarCheck, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./ReminderStats.css";

export default function ReminderStats({ stats }) {
  const cards = [
    {
      title: "Total Reminder",
      value: stats?.total ?? 1450,
      growth: "+12%",
      color: "blue",
      icon: <FaBell />,
    },
    {
      title: "Active Reminder",
      value: stats?.active ?? 890,
      growth: "+5%",
      color: "green",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Completed Reminder",
      value: stats?.completed ?? 470,
      growth: "+9%",
      color: "indigo",
      icon: <FaCheckCircle />,
    },
    {
      title: "Overdue Reminder",
      value: stats?.overdue ?? 90,
      growth: "-3%",
      color: "red",
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="reminder-stats">
      {cards.map((item) => (
        <div className="stats-card" key={item.title}>
          <div className={`stats-icon ${item.color}`}>
            {item.icon}
          </div>
          <div className="stats-content">
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span className={item.growth.startsWith("+") ? "up" : "down"}>
              {item.growth} this month
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
