import React from "react";
import Input from "../../../../components/common/Input";
import { FormRow, Select, DatePicker } from "../../../../components/common/Form";
import "./ReminderSchedule.css";

export default function ReminderSchedule({ formData, handleChange, handleBlur, errors }) {
  return (
    <div className="form-section-card reminder-schedule-section">
      <h3 className="form-section-heading">Schedule</h3>
      
      <FormRow className="cols-2">
        <DatePicker
          label="Reminder Date *"
          name="reminderDate"
          value={formData.reminderDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.reminderDate}
          required
        />

        <Input
          label="Reminder Time *"
          name="reminderTime"
          type="time"
          value={formData.reminderTime}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.reminderTime}
          required
        />
      </FormRow>

      <FormRow className="cols-2">
        <Select
          label="Repeat *"
          name="repeat"
          value={formData.repeat}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.repeat}
          options={[
            { value: "Once", label: "Once" },
            { value: "Daily", label: "Daily" },
            { value: "Weekly", label: "Weekly" },
            { value: "Monthly", label: "Monthly" },
            { value: "Yearly", label: "Yearly" },
            { value: "Custom", label: "Custom" }
          ]}
        />

        <Select
          label="Timezone *"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.timezone}
          options={[
            { value: "UTC", label: "UTC (Coordinated Universal Time)" },
            { value: "IST", label: "IST (Indian Standard Time)" },
            { value: "EST", label: "EST (Eastern Standard Time)" },
            { value: "GMT", label: "GMT (Greenwich Mean Time)" },
            { value: "PST", label: "PST (Pacific Standard Time)" }
          ]}
        />
      </FormRow>
    </div>
  );
}
