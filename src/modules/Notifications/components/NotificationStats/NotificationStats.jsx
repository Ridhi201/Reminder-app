import Card from "../../../../components/common/Card";

import "./NotificationStats.css";

export default function NotificationStats({ stats = {} }){
  const total = stats.total || 0;
  const pending = stats.pending || 0;
  const sent = stats.sent || 0;
  const failed = stats.failed || 0;

  const statItems = [
    {
      title: "Total",
      value: total,
      color: "#2563EB"
    },
    {
      title: "Pending",
      value: pending,
      color: "#F59E0B"
    },
    {
      title: "Sent",
      value: sent,
      color: "#10B981"
    },
    {
      title: "Failed",
      value: failed,
      color: "#EF4444"
    }
  ];

  return (
    <div className="notification-stats">
      {statItems.map((item, index) => (
        <Card key={index} className="card-blue">
          <div className="stat-card">
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <div
              className="stat-line"
              style={{
                background: item.color
              }}
            ></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

