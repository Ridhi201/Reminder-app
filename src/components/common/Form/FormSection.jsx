import "./Form.css";

/**
 * FormSection — white card wrapper with a section heading.
 *
 * Usage:
 *   <FormSection title="Personal Information">
 *     <FormRow>
 *       <Input label="First Name" ... />
 *       <Input label="Last Name"  ... />
 *     </FormRow>
 *   </FormSection>
 */
export default function FormSection({ title, children }) {
  return (
    <div className="form-section-card">
      {title && <h3 className="form-section-heading">{title}</h3>}
      {children}
    </div>
  );
}
