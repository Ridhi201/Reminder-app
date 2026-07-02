import FormField from "./FormField";
import "./UserForm.css";

export default function RoleInformation({ formData, handleChange }) {
  return (
    <FormField title="Role & Status">

      <div className="field-group">
        <label className="field-label">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

    </FormField>
  );
}
