import React from "react";
import Card from "../../../../components/common/Card";
import { FormRow, TextArea } from "../../../../components/common/Form";

export default function ReminderNotes({ formData, handleChange }) {
  return (
    <Card>
      <h3>Notes</h3>
      <FormRow className="cols-1">
        <TextArea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Internal Notes"
          rows="5"
        />
      </FormRow>
    </Card>
  );
}
