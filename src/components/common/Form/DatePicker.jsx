import Input from "../Input";

/**
 * DatePicker — semantic wrapper around Input[type=date].
 * Accepts the same props as Input.
 *
 * Usage:
 *   <DatePicker
 *     label="Date of Birth"
 *     name="dob"
 *     value={formData.dob}
 *     onChange={handleChange}
 *   />
 */
export default function DatePicker(props) {
  return <Input type="date" {...props} />;
}
