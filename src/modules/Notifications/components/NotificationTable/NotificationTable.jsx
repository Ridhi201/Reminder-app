import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";
import DeleteModal from "../../../../components/common/DeleteModal";

import {
    deleteNotification
} from "../../../../services/notificationService";

import "./NotificationTable.css";

export default function NotificationTable({ notifications = [], loadNotifications = () => {} }){
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteNotification(selectedNotification.id);
      setDeleteOpen(false);
      loadNotifications();
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <table className="notification-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Recipients</th>
              <th>Status</th>
              <th>Date</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.type}</td>
                <td>{item.users || item.recipient || "—"}</td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td>{item.date || item.sentTime || "—"}</td>
                <td>{item.createdBy || "Admin"}</td>
                <td>
                  <div className="table-actions">
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/notifications/view/${item.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/notifications/edit/${item.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        setSelectedNotification(item);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <DeleteModal
        open={deleteOpen}
        title="Delete Notification"
        message={`Are you sure you want to delete "${selectedNotification?.title}" ?`}
        loading={loading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
