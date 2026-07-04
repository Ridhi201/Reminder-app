import Card from "../../../../components/common/Card";
import "./TemplateStats.css";

export default function TemplateStats({ stats }) {
  const statsData = [
    { title: "Total", value: stats?.total ?? 250 },
    { title: "Active", value: stats?.active ?? 210 },
    { title: "Popular", value: stats?.popular ?? 75 },
    { title: "Archived", value: stats?.archived ?? 40 }
  ];

  return (
    <div className="stats-grid">
      {statsData.map((item, index) => (
        <Card key={index} className="card-blue">
          <div className="stat-card-content">
            <h4>{item.title}</h4>
            <h2>{item.value}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
}

