import React from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import "./ReminderFilters.css";

export default function ReminderFilters({
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
  onReset
}) {
  return (
    <div className="filter-container">
      {/* Search Input */}
      <div className="filter-search" style={{ position: "relative" }}>
        <FaSearch
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
            fontSize: "14px"
          }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reminders..."
          style={{
            width: "100%",
            height: "45px",
            padding: "0 15px 0 42px",
            border: "1px solid #dcdcdc",
            borderRadius: "10px",
            fontSize: "14px",
            outline: "none",
            background: "white",
            color: "#334155",
            transition: "all 0.2s"
          }}
        />
      </div>

      {/* Category Select */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">Category: All</option>
        <option value="Work">Work</option>
        <option value="Health">Health</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
        <option value="Shopping">Shopping</option>
      </select>

      {/* Priority Select */}
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="All">Priority: All</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status Select */}
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="All">Status: All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Overdue">Overdue</option>
      </select>

      {/* Repeat Select */}
      <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
        <option value="All">Repeat: All</option>
        <option value="Once">Once</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={onReset}
        style={{
          height: "45px",
          padding: "0 20px",
          border: "1px solid #dcdcdc",
          borderRadius: "10px",
          background: "white",
          color: "#475569",
          fontWeight: 600,
          fontSize: "14px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.2s"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = "#94a3b8";
          e.currentTarget.style.background = "#f8fafc";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = "#dcdcdc";
          e.currentTarget.style.background = "white";
        }}
      >
        <FaUndo style={{ fontSize: "12px", color: "#64748b" }} />
        Reset
      </button>
    </div>
  );
}
