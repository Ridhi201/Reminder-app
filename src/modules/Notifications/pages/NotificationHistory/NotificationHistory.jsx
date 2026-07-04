import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import Input from "../../../../components/common/Input";
import StatusBadge from "../../../../components/common/StatusBadge";
import DataTable from "../../../../components/common/DataTable/DataTable";
import useNotifications from "../../hooks/useNotifications";
import { FaPrint } from "react-icons/fa";

import "./NotificationHistory.css";

export default function NotificationHistory() {
  const navigate = useNavigate();
  const {
    filteredNotifications,
    fetchNotifications,
    search,
    setSearch,
    type,
    setType,
    status,
    setStatus,
    loading
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleResetFilters = () => {
    setSearch("");
    setType("All");
    setStatus("All");
  };

  const handlePrint = () => {
    window.print();
  };

  // Augment history data to include columns: Delivered, Opened, Failed, Created By
  const historyData = useMemo(() => {
    return filteredNotifications.map((n) => {
      // Map base size based on type or id
      const totalRecipients = n.users || (n.recipient === "John Doe" ? 1 : 1250);
      const isFailed = n.status === "Failed";
      const isPending = n.status === "Pending";

      let delivered = 0;
      let opened = 0;
      let failed = 0;

      if (!isPending) {
        if (isFailed) {
          failed = totalRecipients;
        } else {
          // Success rates: 95-99% delivery, 80-90% open rate
          delivered = Math.round(totalRecipients * (0.95 + (n.id % 5) * 0.01));
          opened = Math.round(delivered * (0.80 + (n.id % 10) * 0.01));
          failed = totalRecipients - delivered;
        }
      }

      return {
        ...n,
        recipient: n.recipient || `${totalRecipients} Users`,
        delivered,
        opened,
        failed,
        createdBy: n.createdBy || "Admin",
        sentTime: n.sentTime || "10:00 AM"
      };
    });
  }, [filteredNotifications]);

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true
    },
    {
      key: "recipient",
      label: "Recipient",
      sortable: true
    },
    {
      key: "type",
      label: "Type",
      sortable: true
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />
    },
    {
      key: "sentTime",
      label: "Sent Time",
      sortable: true
    },
    {
      key: "delivered",
      label: "Delivered",
      sortable: true,
      render: (item) => <span className="stat-count success">{item.delivered}</span>
    },
    {
      key: "opened",
      label: "Opened",
      sortable: true,
      render: (item) => <span className="stat-count info">{item.opened}</span>
    },
    {
      key: "failed",
      label: "Failed",
      sortable: true,
      render: (item) => (
        <span className={`stat-count ${item.failed > 0 ? "danger" : "muted"}`}>
          {item.failed}
        </span>
      )
    },
    {
      key: "createdBy",
      label: "Created By",
      sortable: true
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <Button
          size="sm"
          onClick={() => navigate(`/notifications/view/${item.id}`)}
        >
          View
        </Button>
      )
    }
  ];

  return (
    <div className="notification-history-page">
      <div className="history-header">
        <PageHeader
          title="Notification History"
          subtitle="View and export historical notification delivery analytics"
          showButton={false}
        />
        <Button
          className="print-btn"
          onClick={handlePrint}
          variant="secondary"
        >
          <FaPrint style={{ marginRight: "8px" }} /> Print Report
        </Button>
      </div>

      <div className="module-tabs">
        <button 
          className="tab-btn" 
          onClick={() => navigate("/notifications")}
        >
          Overview
        </button>
        <button 
          className="tab-btn active" 
          onClick={() => navigate("/notifications/history")}
        >
          History
        </button>
        <button 
          className="tab-btn" 
          onClick={() => navigate("/notifications/analytics")}
        >
          Analytics
        </button>
      </div>

      <Card>
        <div className="history-filters">
          <Input
            placeholder="Search by Title or Recipient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-select"
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
            className="filter-select"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Sent">Sent</option>
            <option value="Failed">Failed</option>
          </select>

          <Button
            variant="secondary"
            onClick={handleResetFilters}
          >
            Reset
          </Button>
        </div>
      </Card>

      <div className="history-table-container">
        {loading ? (
          <div className="loading-placeholder">Loading notification history...</div>
        ) : (
          <DataTable
            data={historyData}
            columns={columns}
            keyField="id"
            selectable={true}
            initialRowsPerPage={10}
            initialSortField="sentTime"
            initialSortDirection="desc"
          />
        )}
      </div>
    </div>
  );
}
