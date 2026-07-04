import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

import { PageHeader, Toast, DeleteModal, Button } from "../../../../components/common";
import TemplateStats from "../../components/TemplateStats";
import TemplateFilters from "../../components/TemplateFilters";
import TemplateTable from "../../components/TemplateTable";
import useTemplates from "../../hooks/useTemplates";

import "./TemplateList.css";

export default function TemplateList() {
  const navigate = useNavigate();
  const {
    filteredTemplates,
    templatesList,
    stats,
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    deleteTemplates,
    fetchTemplates,
    loading
  } = useTemplates();

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentTemplates = filteredTemplates.slice(start, end);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, status]);

  // Deletion Modal state for bulk operations
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargets, setDeleteTargets] = useState([]);

  // Toast state
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  // Open modal for deleting
  const handleOpenDeleteModal = (ids) => {
    setDeleteTargets(ids);
    setDeleteModalOpen(true);
  };

  // Execute deletion
  const handleConfirmDelete = () => {
    deleteTemplates(deleteTargets);
    setDeleteModalOpen(false);
    setDeleteTargets([]);
    showToast(`Successfully deleted ${deleteTargets.length} template(s).`, "success");
  };

  // Export CSV
  const exportCSV = () => {
    const csv = [
      ["Name", "Category", "Priority", "Repeat", "Status"],
      ...filteredTemplates.map((item) => [
        `"${item.name.replace(/"/g, '""')}"`,
        `"${item.category.replace(/"/g, '""')}"`,
        `"${item.priority.replace(/"/g, '""')}"`,
        `"${item.repeat.replace(/"/g, '""')}"`,
        `"${item.status.replace(/"/g, '""')}"`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "templates.csv");
    showToast("Templates exported to CSV successfully.");
  };

  return (
    <div className="template-page">
      <PageHeader
        title="Templates"
        subtitle="Manage reminder templates"
        buttonText="Add Template"
        onButtonClick={() => navigate("/templates/add")}
      />

      <TemplateStats stats={stats} />

      <div style={{ marginBottom: "24px" }}>
        <TemplateFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          onReset={handleResetFilters}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <Button onClick={exportCSV} variant="secondary">
          Export CSV
        </Button>
      </div>

      <TemplateTable
        templates={currentTemplates}
        onView={(id) => navigate(`/templates/view/${id}`)}
        onEdit={(id) => navigate(`/templates/edit/${id}`)}
        loadTemplates={fetchTemplates}
      />

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
        <span style={{ color: "#64748b", fontSize: "14px" }}>
          Showing {filteredTemplates.length > 0 ? start + 1 : 0} to {Math.min(end, filteredTemplates.length)} of {filteredTemplates.length} templates
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="secondary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPage(page + 1)}
            disabled={end >= filteredTemplates.length}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal for Bulk Ops if needed */}
      <DeleteModal
        open={deleteModalOpen}
        title="Delete Template"
        message={
          deleteTargets.length === 1
            ? `Are you sure you want to delete "${templatesList.find((t) => t.id === deleteTargets[0])?.name}"?`
            : `Are you sure you want to delete these ${deleteTargets.length} templates?`
        }
        loading={loading}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
