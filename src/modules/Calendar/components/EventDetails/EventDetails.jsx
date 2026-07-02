import React from "react";
import { Modal, Button } from "../../../../components/common";
import "./EventDetails.css";

export default function EventDetails({
  open,
  event,
  onClose,
  onEdit,
  onDelete
}) {
  if (!open || !event) return null;

  const datePart = event.start?.split("T")[0] || "";
  const timePart = event.start?.split("T")[1]?.slice(0, 5) || "All Day";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="event-details">
        <h2>{event.title}</h2>

        <div className="detail-row">
          <span>Category</span>
          <strong>{event.category || "General"}</strong>
        </div>

        <div className="detail-row">
          <span>Date</span>
          <strong>{datePart}</strong>
        </div>

        <div className="detail-row">
          <span>Time</span>
          <strong>{timePart}</strong>
        </div>

        <div className="detail-row">
          <span>Priority</span>
          <strong>{event.priority || "Medium"}</strong>
        </div>

        <div className="detail-row">
          <span>Status</span>
          <strong>{event.status || "Active"}</strong>
        </div>

        <div className="detail-row">
          <span>Description</span>
          <p>{event.description || "No Description"}</p>
        </div>

        <div className="event-buttons">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={() => onEdit(event)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => onDelete(event)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
