import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/common/Card";
import Button from "../../../../components/common/Button";
import StatusBadge from "../../../../components/common/StatusBadge";

import useReminders from "../../hooks/useReminders";
import { getReminderById } from "../../../../services/reminderService";

import "./ViewReminder.css";

export default function ViewReminder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { remindersList } = useReminders();
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    loadReminder();
  }, []);

  const loadReminder = async () => {
    try {
      const res = await getReminderById(id);
      setReminder(res.data);
    } catch (err) {
      console.log("API load failed, trying local storage:", err);
      const localReminder = remindersList.find((r) => String(r.id) === String(id));
      if (localReminder) {
        setReminder(localReminder);
      }
    }
  };

  if (!reminder) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div className="view-reminder">
      <PageHeader
        title="View Reminder"
        subtitle="Reminder Details"
        showButton={false}
      />

      <Card>
        <div className="info-grid">
          <div>
            <label>Reminder Title</label>
            <p>{reminder.title}</p>
          </div>

          <div>
            <label>Category</label>
            <p>{reminder.category}</p>
          </div>

          <div>
            <label>Priority</label>
            <span className={`priority ${reminder.priority ? reminder.priority.toLowerCase() : "medium"}`}>
              {reminder.priority}
            </span>
          </div>

          <div>
            <label>Status</label>
            <StatusBadge status={reminder.status} />
          </div>

          <div>
            <label>Reminder Date</label>
            <p>{reminder.reminderDate}</p>
          </div>

          <div>
            <label>Reminder Time</label>
            <p>{reminder.reminderTime}</p>
          </div>

          <div>
            <label>Repeat</label>
            <p>{reminder.repeat}</p>
          </div>

          <div>
            <label>Assigned User</label>
            <p>{reminder.assignedUser}</p>
          </div>

          <div className="full-width">
            <label>Description</label>
            <p>{reminder.description}</p>
          </div>

          <div className="full-width">
            <label>Notes</label>
            <p>{reminder.notes || "-"}</p>
          </div>
        </div>
      </Card>

      <div className="actions">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button
          onClick={() => navigate(`/reminders/edit/${id}`)}
        >
          Edit Reminder
        </Button>
      </div>
    </div>
  );
}
