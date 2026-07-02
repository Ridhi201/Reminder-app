import { Link, useParams } from "react-router-dom";
import { findModule } from "../../constants/navigationStructure.js";
import PageHeader from "../../components/common/PageHeader/PageHeader.jsx";
import Card from "../../components/common/Card/Card.jsx";
import EmptyState from "../../components/common/EmptyState/EmptyState.jsx";
import "./ModuleOverview.css";

export default function ModuleOverview() {
  const { moduleSlug } = useParams();
  const module = findModule(moduleSlug);

  if (!module) {
    return (
      <div className="screen">
        <EmptyState icon="🔍" title="Module not found" description="Check the URL and try again." />
      </div>
    );
  }

  return (
    <div className="screen fade-in">
      <PageHeader module={module.label} title={`${module.icon} ${module.label}`} />
      <p className="module-overview__subtitle">
        {module.screens.length} screens scaffolded in this module.
      </p>
      <div className="module-overview__grid">
        {module.screens.map((screen) => (
          <Link key={screen.key} to={`/${module.slug}/${screen.slug}`} className="module-overview__link">
            <Card className="module-overview__card">
              <span className="module-overview__card-title">{screen.label}</span>
              <span className="module-overview__card-arrow">→</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
