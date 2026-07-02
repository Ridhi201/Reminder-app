import Input    from "../../../../components/common/Input";
import FormField from "./FormField";
import "./UserForm.css";

export default function AddressInformation({ formData, handleChange }) {
  return (
    <FormField title="Address">

      {/* Full-width street address textarea */}
      <div className="full-width">
        <label className="field-label">Street Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Enter street address"
          className="form-textarea"
        />
      </div>

      <Input
        label="City"
        name="city"
        placeholder="Enter city"
        value={formData.city}
        onChange={handleChange}
      />

      <Input
        label="State"
        name="state"
        placeholder="Enter state"
        value={formData.state}
        onChange={handleChange}
      />

      <Input
        label="Country"
        name="country"
        placeholder="Enter country"
        value={formData.country}
        onChange={handleChange}
      />

      <Input
        label="Zip Code"
        name="zipCode"
        placeholder="Enter zip code"
        value={formData.zipCode}
        onChange={handleChange}
      />

    </FormField>
  );
}
