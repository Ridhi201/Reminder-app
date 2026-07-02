import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader, Toast, DeleteModal } from "../../../../components/common";
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

  // Deletion Modal state
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

      <TemplateTable
        templates={filteredTemplates}
        onView={(id) => navigate(`/templates/view/${id}`)}
        onEdit={(id) => navigate(`/templates/edit/${id}`)}
        onDelete={handleOpenDeleteModal}
      />

      {/* Delete Confirmation Modal */}
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

