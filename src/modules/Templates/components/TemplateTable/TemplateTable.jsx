import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";
import "./TemplateTable.css";

export default function TemplateTable({ templates, onView, onEdit, onDelete }) {
  return (
    <Card padded={false}>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Repeat</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates && templates.length > 0 ? (
              templates.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.priority}</td>
                  <td>{item.repeat}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <div className="table-actions">
                      <Button size="sm" onClick={() => onView && onView(item.id)}>
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onEdit && onEdit(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete && onDelete([item.id])}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "30px 15px", color: "#64748b" }}>
                  No templates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

