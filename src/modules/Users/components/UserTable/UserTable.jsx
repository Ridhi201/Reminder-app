import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/common/DataTable";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./UserTable.css";

export default function UserTable({
  users = [],
  onBulkDelete,
  onBulkStatusUpdate
}) {
  const navigate = useNavigate();
  const columns = [
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (user) => (
        <div className="user-info">
          <div className="avatar">
            {user.name.charAt(0)}
          </div>
          <span>{user.name}</span>
        </div>
      )
    },
    {
      key: "email",
      label: "Email",
      sortable: true
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (user) => (
        <span className="role">
          {user.role}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (user) => (
        <span className={`status ${user.status.toLowerCase()}`}>
          {user.status}
        </span>
      )
    },
    {
      key: "joined",
      label: "Joined",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <div className="actions">
          <button 
            type="button" 
            onClick={() => navigate(`/users/view/${user.id}`)}
            title="View User"
          >
            <FaEye />
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/users/edit/${user.id}`)}
            title="Edit User"
          >
            <FaEdit />
          </button>
          <button 
            type="button" 
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                onBulkDelete([user.id]);
              }
            }}
            title="Delete User"
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
      onClick: (ids) => {
        if (window.confirm(`Are you sure you want to delete ${ids.length} users?`)) {
          onBulkDelete(ids);
        }
      }
    },
    {
      label: "Set Active",
      className: "status",
      onClick: (ids) => onBulkStatusUpdate(ids, "Active")
    },
    {
      label: "Set Blocked",
      className: "status",
      onClick: (ids) => onBulkStatusUpdate(ids, "Blocked")
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      keyField="id"
      selectable={true}
      bulkActions={bulkActions}
      initialRowsPerPage={5}
      initialSortField="name"
      initialSortDirection="asc"
    />
  );
}
