import "./UserForm.css";
import PersonalInformation  from "./PersonalInformation";
import ContactInformation   from "./ContactInformation";
import SecurityInformation  from "./SecurityInformation";
import RoleInformation      from "./RoleInformation";
import AddressInformation   from "./AddressInformation";

export default function UserForm({ formData, handleChange, handleBlur, errors = {}, showSecurity = true }) {
  return (
    <div className="user-form">
      <PersonalInformation  formData={formData} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
      <ContactInformation   formData={formData} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
      {showSecurity && (
        <SecurityInformation  formData={formData} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
      )}
      <RoleInformation      formData={formData} handleChange={handleChange} />
      <AddressInformation   formData={formData} handleChange={handleChange} />
    </div>
  );
}


