import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";
import DeleteModal from "../../../../components/common/DeleteModal";
import { deleteTemplate } from "../../services/templateService";
import "./TemplateTable.css";

export default function TemplateTable({ templates, onView, onEdit, loadTemplates }) {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTemplate(selectedTemplate.id);
      setDeleteOpen(false);
      alert("Template Deleted Successfully");
      loadTemplates();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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
                      <Button
                        size="sm"
                        onClick={() => navigate(`/templates/view/${item.id}`)}
                      >
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
                        onClick={() => {
                          setSelectedTemplate(item);
                          setDeleteOpen(true);
                        }}
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

      <DeleteModal
        open={deleteOpen}
        title="Delete Template"
        message={`Are you sure you want to delete "${selectedTemplate?.name}" ?`}
        loading={loading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </Card>
  );
}
