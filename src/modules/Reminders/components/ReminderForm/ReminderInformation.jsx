import React from "react";
import Card from "../../../../components/common/Card";
import Input from "../../../../components/common/Input";
import { FormRow, Select, TextArea } from "../../../../components/common/Form";

export default function ReminderInformation({ formData, handleChange, errors }) {
  return (
    <Card>
      <h3>Reminder Information</h3>
      
      <FormRow className="cols-2">
        <Input
          label="Reminder Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter reminder title"
          required
          error={errors.title}
        />

        <Select
          label="Category *"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          options={[
            { value: "Work", label: "Work" },
            { value: "Health", label: "Health" },
            { value: "Personal", label: "Personal" },
            { value: "Study", label: "Study" },
            { value: "Shopping", label: "Shopping" }
          ]}
        />
      </FormRow>

      <FormRow className="cols-2">
        <Select
          label="Priority *"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          error={errors.priority}
          options={[
            { value: "Low", label: "Low" },
            { value: "Medium", label: "Medium" },
            { value: "High", label: "High" },
            { value: "Critical", label: "Critical" }
          ]}
        />

        <Select
          label="Status *"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={errors.status}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "Active", label: "Active" },
            { value: "Completed", label: "Completed" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Overdue", label: "Overdue" }
          ]}
        />
      </FormRow>

      <FormRow className="cols-1">
        <TextArea
          label="Description *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          error={errors.description}
          rows="5"
        />
      </FormRow>
    </Card>
  );
}
