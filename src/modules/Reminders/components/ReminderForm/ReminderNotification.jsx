import React from "react";
import Card from "../../../../components/common/Card";
import Checkbox from "../../../../components/common/Checkbox";
import { FormRow, Select } from "../../../../components/common/Form";

export default function ReminderNotification({ formData, handleChange, errors }) {
  return (
    <Card>
      <h3>Notification</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" }}>
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
          label="SMS Notification"
          name="smsNotification"
          checked={formData.smsNotification}
          onChange={handleChange}
        />
        <Checkbox
          label="Sound Notification"
          name="soundNotification"
          checked={formData.soundNotification}
          onChange={handleChange}
        />
      </div>

      <FormRow className="cols-1">
        <Select
          label="Notification Before"
          name="notificationBefore"
          value={formData.notificationBefore}
          onChange={handleChange}
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
    </Card>
  );
}
