export default function validateTemplate(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = "Template name is required.";
  }

  if (!data.category || !data.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!data.reminderTime) {
    errors.reminderTime = "Default reminder time is required.";
  }

  return errors;
}
