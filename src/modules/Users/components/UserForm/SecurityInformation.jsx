import PasswordInput   from "../../../../components/common/PasswordInput";
import FormField        from "./FormField";
import PasswordStrength from "./PasswordStrength";
import "./UserForm.css";

export default function SecurityInformation({ formData, handleChange, handleBlur, errors }) {
  return (
    <FormField title="Security">

      {/* Password field + live strength meter */}
      <div>
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Min 8 chars, uppercase & digit"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          required
        />
        <PasswordStrength password={formData.password} />
      </div>

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Re-enter password"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmPassword}
        required
      />

    </FormField>
  );
}
