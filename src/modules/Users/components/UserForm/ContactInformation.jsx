import Input    from "../../../../components/common/Input";
import FormField from "./FormField";
import "./UserForm.css";

export default function ContactInformation({ formData, handleChange, handleBlur, errors }) {
  return (
    <FormField title="Contact Information">

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="e.g. john@example.com"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        required
      />

      <Input
        label="Phone"
        name="phone"
        type="text"
        placeholder="e.g. 9876543210"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone}
        required
      />

    </FormField>
  );
}
