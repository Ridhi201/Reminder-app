import "./FormField.css";

/**
 * FormField — reusable section card wrapper.
 *
 * Usage:
 *   <FormField title="Personal Information">
 *     <Input label="First Name" ... />
 *     <Input label="Last Name" ... />
 *   </FormField>
 *
 * Children are laid out in a responsive 2-column grid.
 * Wrap a child in <div className="full-width"> to span both columns.
 */
export default function FormField({ title, children }) {
  return (
    <div className="form-section">
      <h3 className="form-section-heading">{title}</h3>
      <div className="grid">
        {children}
      </div>
    </div>
  );
}
