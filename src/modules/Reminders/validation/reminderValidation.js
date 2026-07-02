export default function validateReminder(data) {
  const errors = {};

  if (!data.title || !data.title.trim()) {
    errors.title = "Reminder title is required.";
  }

  if (!data.category || !data.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!data.reminderDate) {
    errors.reminderDate = "Date is required.";
  }

  if (!data.reminderTime) {
    errors.reminderTime = "Time is required.";
  }

  return errors;
}
