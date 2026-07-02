import Card from "../../../../components/common/Card";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import "./TemplateFilters.css";

export default function TemplateFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onReset
}) {
  return (
    <Card>
      <div className="template-filters">
        <Input
          placeholder="Search Template"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">Category: All</option>
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
          <option value="Shopping">Shopping</option>
        </select>
        <select
          className="filter-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <Button variant="secondary" onClick={onReset}>Reset</Button>
      </div>
    </Card>
  );
}

