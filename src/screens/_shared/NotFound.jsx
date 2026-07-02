import { Link } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState/EmptyState.jsx";
import Button from "../../components/common/Button/Button.jsx";

export default function NotFound() {
  return (
    <div className="screen fade-in">
      <EmptyState
        icon="🧭"
        title="Page not found"
        description="That screen doesn't exist in the navigation structure."
        action={
          <Link to="/">
            <Button variant="secondary">Back to home</Button>
          </Link>
        }
      />
    </div>
  );
}
