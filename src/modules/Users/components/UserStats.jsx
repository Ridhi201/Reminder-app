import "./UserStats.css";

import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaUserSlash,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "2,450",
    growth: "+12%",
    color: "blue",
    icon: <FaUsers />,
  },
  {
    title: "Active Users",
    value: "2,210",
    growth: "+8%",
    color: "green",
    icon: <FaUserCheck />,
  },
  {
    title: "Pending Users",
    value: "180",
    growth: "+5%",
    color: "orange",
    icon: <FaUserClock />,
  },
  {
    title: "Blocked Users",
    value: "60",
    growth: "-2%",
    color: "red",
    icon: <FaUserSlash />,
  },
];

export default function UserStats() {
  return (
    <div className="user-stats">

      {stats.map((item) => (

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
