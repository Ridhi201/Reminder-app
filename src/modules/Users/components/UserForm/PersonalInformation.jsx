import Input     from "../../../../components/common/Input";
import FormField  from "./FormField";
import "./UserForm.css";

export default function PersonalInformation({ formData, handleChange, handleBlur, errors }) {
  return (
    <FormField title="Personal Information">

      <Input
        label="First Name"
        name="firstName"
        placeholder="Enter first name"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firstName}
        required
      />

      <Input
        label="Last Name"
        name="lastName"
        placeholder="Enter last name"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lastName}
        required
      />

      <div className="field-group">
        <label className="field-label">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleChange}
      />

    </FormField>
  );
}
