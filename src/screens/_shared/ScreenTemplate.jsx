import PageHeader from "../../components/common/PageHeader/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState/EmptyState.jsx";

/**
 * Shared shell rendered by every generated placeholder screen.
 * Replace the EmptyState with real UI as each screen gets implemented —
 * the surrounding PageHeader / layout wiring stays the same.
 */
export default function ScreenTemplate({ module, moduleSlug, screen, icon }) {
  return (
    <div className="screen fade-in">
      <PageHeader module={module} moduleSlug={moduleSlug} title={screen} />
      <EmptyState
        icon={icon}
        title={screen}
        description="This screen is scaffolded and ready for your implementation."
      />
    </div>
  );
}
