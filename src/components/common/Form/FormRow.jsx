import "./Form.css";

/**
 * FormRow — responsive column grid for form fields.
 *
 * Props:
 *   cols — 1 | 2 | 3  (default: 2)
 *
 * Usage:
 *   <FormRow cols={2}>
 *     <Input label="First Name" ... />
 *     <Input label="Last Name"  ... />
 *   </FormRow>
 *
 *   <FormRow cols={1}>
 *     <TextArea label="Address" ... />
 *   </FormRow>
 */
export default function FormRow({ children, cols = 2 }) {
  return (
    <div className={`form-row cols-${cols}`}>
      {children}
    </div>
  );
}
