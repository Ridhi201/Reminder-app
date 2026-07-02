import React from "react";
import Card from "../../../../components/common/Card";
import { FormRow, Select, DatePicker, TimePicker } from "../../../../components/common/Form";

export default function ReminderSchedule({ formData, handleChange, errors }) {
  return (
    <Card>
      <h3>Reminder Schedule</h3>
      
      <FormRow className="cols-2">
        <DatePicker
          label="Reminder Date *"
          name="reminderDate"
          value={formData.reminderDate}
          onChange={handleChange}
          error={errors.reminderDate}
          required
        />

        <TimePicker
          label="Reminder Time *"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
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
          error={errors.timezone}
          options={[
            { value: "Asia/Kolkata", label: "Asia/Kolkata" },
            { value: "UTC", label: "UTC" },
            { value: "EST", label: "EST" },
            { value: "GMT", label: "GMT" },
            { value: "PST", label: "PST" }
          ]}
        />
      </FormRow>
    </Card>
  );
}
