import React from "react";
import Card from "../../../../components/common/Card";
import { FormRow, Select } from "../../../../components/common/Form";

export default function ReminderAssignment({ formData, handleChange, errors }) {
  const getUserOptions = () => {
    try {
      const stored = localStorage.getItem("admin_users");
      if (stored) {
        const users = JSON.parse(stored);
        if (users && users.length > 0) {
          return users.map((u) => ({ value: u.name, label: u.name }));
        }
      }
    } catch (_) {}

    return [
      { value: "John Doe", label: "John Doe" },
      { value: "Sarah Wilson", label: "Sarah Wilson" },
      { value: "Alex Johnson", label: "Alex Johnson" },
      { value: "Emma Stone", label: "Emma Stone" }
    ];
  };

  const userOptions = getUserOptions();

  return (
    <Card>
      <h3>Assignment</h3>
      
      <FormRow className="cols-2">
        <Select
          label="Assign User"
          name="assignedUser"
          value={formData.assignedUser}
          onChange={handleChange}
          error={errors.assignedUser}
          options={userOptions}
        />

        <Select
          label="Reminder Owner"
          name="reminderOwner"
          value={formData.reminderOwner || formData.owner || ""}
          onChange={handleChange}
          error={errors.reminderOwner || errors.owner}
          options={userOptions}
        />
      </FormRow>
    </Card>
  );
}
