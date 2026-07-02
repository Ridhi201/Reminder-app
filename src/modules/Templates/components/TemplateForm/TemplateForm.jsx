import React from "react";
import Card from "../../../../components/common/Card";
import Input from "../../../../components/common/Input";
import Checkbox from "../../../../components/common/Checkbox";
import { FormRow, Select, TextArea, TimePicker } from "../../../../components/common/Form";
import "./TemplateForm.css";

export default function TemplateForm({ formData, handleChange, errors }) {
  return (
    <div className="template-form">
      <Card>
        <h3>Template Information</h3>
        <FormRow className="cols-2">
          <Input
            label="Template Name *"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="e.g. Morning Workout"
            required
            error={errors.name}
          />

          <Select
            label="Category *"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            error={errors.category}
            options={[
              { value: "", label: "Select Category" },
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
            value={formData.priority || "Medium"}
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
            label="Repeat *"
            name="repeat"
            value={formData.repeat || "Once"}
            onChange={handleChange}
            error={errors.repeat}
            options={[
              { value: "Once", label: "Once" },
              { value: "Daily", label: "Daily" },
              { value: "Weekly", label: "Weekly" },
              { value: "Monthly", label: "Monthly" },
              { value: "Yearly", label: "Yearly" }
            ]}
          />
        </FormRow>

        <FormRow className="cols-1">
          <TextArea
            label="Description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Describe what this template is for..."
            rows="5"
          />
        </FormRow>
      </Card>

      <Card>
        <h3>Notification Settings</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <Checkbox
            label="Push Notification"
            name="pushNotification"
            checked={!!formData.pushNotification}
            onChange={handleChange}
          />
          <Checkbox
            label="Email Notification"
            name="emailNotification"
            checked={!!formData.emailNotification}
            onChange={handleChange}
          />
          <Checkbox
            label="SMS Notification"
            name="smsNotification"
            checked={!!formData.smsNotification}
            onChange={handleChange}
          />
          <Checkbox
            label="Sound Notification"
            name="soundNotification"
            checked={!!formData.soundNotification}
            onChange={handleChange}
          />
        </div>
      </Card>

      <Card>
        <h3>Default Reminder Time</h3>
        <FormRow className="cols-2">
          <TimePicker
            label="Default Time *"
            name="reminderTime"
            value={formData.reminderTime || ""}
            onChange={handleChange}
            error={errors.reminderTime}
            required
          />
        </FormRow>
      </Card>

      <Card>
        <h3>Default Notes</h3>
        <FormRow className="cols-1">
          <TextArea
            label="Default Notes"
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            placeholder="Write default notes..."
            rows="4"
          />
        </FormRow>
      </Card>
    </div>
  );
}
