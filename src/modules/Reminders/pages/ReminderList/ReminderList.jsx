import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader, Button, Toast, DeleteModal } from "../../../../components/common";
import ReminderStats from "../../components/ReminderStats";
import ReminderFilters from "../../components/ReminderFilters";
import ReminderTable from "../../components/ReminderTable";
import useReminders from "../../hooks/useReminders";

import "./ReminderList.css";

export default function ReminderList() {
  const navigate = useNavigate();
  const {
    filteredReminders,
    remindersList,
    stats,
    search,
    setSearch,
    category,
    setCategory,
    priority,
    setPriority,
    status,
    setStatus,
    repeat,
    setRepeat,
    deleteReminders,
    updateReminderStatus,
    fetchReminders,
    loading
  } = useReminders();

  useEffect(() => {
    fetchReminders();
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
    setPriority("All");
    setStatus("All");
    setRepeat("All");
  };

  // Open modal for deleting
  const handleOpenDeleteModal = (ids) => {
    setDeleteTargets(ids);
    setDeleteModalOpen(true);
  };

  // Execute deletion
  const handleConfirmDelete = () => {
    deleteReminders(deleteTargets);
    setDeleteModalOpen(false);
    setDeleteTargets([]);
    showToast(`Successfully deleted ${deleteTargets.length} reminder(s).`, "success");
  };

  // Execute status update (e.g. Completed, Active, Overdue)
  const handleStatusUpdate = (ids, newStatus) => {
    updateReminderStatus(ids, newStatus);
    showToast(`Successfully updated status to "${newStatus}" for ${ids.length} reminder(s).`, "success");
  };

  return (
    <div className="reminder-page-container">
      <PageHeader
        title="Reminders"
        subtitle="Manage all reminders"
        buttonText="Add Reminder"
        onButtonClick={() => navigate("/reminders/add")}
      />

      <ReminderStats stats={stats} />

      <div style={{ marginBottom: "24px" }}>
        <ReminderFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
          status={status}
          setStatus={setStatus}
          repeat={repeat}
          setRepeat={setRepeat}
          onReset={handleResetFilters}
        />
      </div>

      <ReminderTable
        reminders={filteredReminders}
        onView={(id) => navigate(`/reminders/view/${id}`)}
        onEdit={(id) => navigate(`/reminders/edit/${id}`)}
        onDelete={handleOpenDeleteModal}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={deleteModalOpen}
        title="Delete Reminder"
        message={
          deleteTargets.length === 1
            ? `Are you sure you want to delete "${remindersList.find((r) => r.id === deleteTargets[0])?.title}"?`
            : `Are you sure you want to delete these ${deleteTargets.length} reminders?`
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
