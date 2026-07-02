import React from "react";
import Checkbox from "../../../../components/common/Checkbox";
import { FormRow, Select } from "../../../../components/common/Form";
import "./ReminderNotification.css";

export default function ReminderNotification({ formData, handleChange, handleBlur, errors }) {
  return (
    <div className="form-section-card reminder-notification-section">
      <h3 className="form-section-heading">Notification</h3>
      
      <div className="notification-channels" style={{ marginBottom: "20px" }}>
        <label className="form-label" style={{ marginBottom: "12px", display: "block" }}>Notification Channels</label>
        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          <Checkbox
            label="Push Notification"
            name="pushNotification"
            checked={formData.pushNotification}
            onChange={handleChange}
          />
          <Checkbox
            label="Email Notification"
            name="emailNotification"
            checked={formData.emailNotification}
            onChange={handleChange}
          />
          <Checkbox
            label="Sound"
            name="soundNotification"
            checked={formData.soundNotification}
            onChange={handleChange}
          />
        </div>
      </div>

      <FormRow className="cols-1">
        <Select
          label="Notification Before"
          name="notificationBefore"
          value={formData.notificationBefore}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.notificationBefore}
          options={[
            { value: "At time", label: "At time of event" },
            { value: "5 Min", label: "5 Minutes before" },
            { value: "15 Min", label: "15 Minutes before" },
            { value: "1 Hour", label: "1 Hour before" },
            { value: "1 Day", label: "1 Day before" }
          ]}
        />
      </FormRow>
    </div>
  );
}
