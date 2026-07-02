import React from "react";
import DataTable from "../../../../components/common/DataTable";
import StatusBadge from "../../../../components/common/StatusBadge";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./ReminderTable.css";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  try {
    const [hours, minutes] = timeStr.split(":");
    if (!hours || !minutes) return timeStr;
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
}

export default function ReminderTable({
  reminders = [],
  onView,
  onEdit,
  onDelete,
  onStatusUpdate
}) {
  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (item) => (
        <div className="reminder-info">
          <span className="reminder-title">{item.title}</span>
          {item.description && (
            <span className="reminder-desc">{item.description}</span>
          )}
        </div>
      )
    },
    {
      key: "category",
      label: "Category",
      sortable: true
    },
    {
      key: "priority",
      label: "Priority",
      sortable: true,
      render: (item) => (
        <span className={`priority-tag ${item.priority?.toLowerCase()}`}>
          {item.priority}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />
    },
    {
      key: "reminderDate",
      label: "Reminder Date",
      sortable: true,
      render: (item) => <span>{formatDate(item.reminderDate)}</span>
    },
    {
      key: "reminderTime",
      label: "Reminder Time",
      sortable: true,
      render: (item) => <span>{formatTime(item.reminderTime)}</span>
    },
    {
      key: "repeat",
      label: "Repeat",
      sortable: true
    },
    {
      key: "owner",
      label: "Created By",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="actions">
          <button
            type="button"
            onClick={() => onView(item.id)}
            title="View Reminder"
            className="action-btn view"
          >
            <FaEye />
          </button>
          <button
            type="button"
            onClick={() => onEdit(item.id)}
            title="Edit Reminder"
            className="action-btn edit"
          >
            <FaEdit />
          </button>
          <button
            type="button"
            onClick={() => onDelete([item.id])}
            title="Delete Reminder"
            className="action-btn delete"
          >
            <FaTrash />
          </button>
        </div>
      )
    }
  ];

  const bulkActions = [
    {
      label: "Bulk Delete",
      className: "delete",
      onClick: (ids) => onDelete(ids)
    },
    {
      label: "Set Active",
      className: "status",
      onClick: (ids) => onStatusUpdate(ids, "Active")
    },
    {
      label: "Set Completed",
      className: "status",
      onClick: (ids) => onStatusUpdate(ids, "Completed")
    },
    {
      label: "Set Overdue",
      className: "status",
      onClick: (ids) => onStatusUpdate(ids, "Overdue")
    }
  ];

  return (
    <div className="reminder-table-container">
      <DataTable
        data={reminders}
        columns={columns}
        keyField="id"
        selectable={true}
        bulkActions={bulkActions}
        initialRowsPerPage={5}
        initialSortField="title"
        initialSortDirection="asc"
      />
    </div>
  );
}
