import React, { useState } from "react";
import { Modal, Button, Input } from "../../../../components/common";
import "./EventModal.css";

export default function EventModal({
  open,
  onClose,
  onSave,
  selectedDate
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const handleSave = () => {
    if (!title.trim()) return;

    // Match colors dynamically by category
    let backgroundColor = "#2563EB"; // Default Blue
    const cat = category.toLowerCase().trim();
    if (cat === "health") {
      backgroundColor = "#10B981"; // Green
    } else if (cat === "work") {
      backgroundColor = "#EF4444"; // Red
    } else if (cat === "personal") {
      backgroundColor = "#D97706"; // Amber
    } else if (cat === "study") {
      backgroundColor = "#8B5CF6"; // Violet
    }

    onSave({
      id: String(Date.now()),
      title,
      start: time ? `${selectedDate}T${time}:00` : selectedDate,
      category,
      backgroundColor
    });

    setTitle("");
    setCategory("");
    setTime("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="event-modal">
        <h2>Add Event</h2>

        <Input
          label="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Project Sync"
          required
        />

        <Input
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Work, Health, Personal, Study"
        />

        <div className="time-input-group">
          <label>Time</label>
          <input
            className="time-input-el"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="actions">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim()}
          >
            Save Event
          </Button>
        </div>
      </div>
    </Modal>
  );
}
