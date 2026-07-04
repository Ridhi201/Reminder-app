import Card from "../../../../components/common/Card";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";

import "./NotificationFilters.css";

export default function NotificationFilters({
  search = "",
  setSearch = () => {},
  type = "All",
  setType = () => {},
  status = "All",
  setStatus = () => {},
  onReset = () => {}
}) {
  return (
    <Card>
      <div className="notification-filters">
        <Input
          placeholder="Search Notification..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Push">Push</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          <option value="In-App">In-App</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Sent">Sent</option>
          <option value="Failed">Failed</option>
        </select>

        <Button
          variant="secondary"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}

