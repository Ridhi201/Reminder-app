import {
  EMAIL_REGEX,
  PHONE_REGEX,
  PASSWORD_REGEX,
} from "../utils/validationRegex";

export default function validateUser(data, options = {}) {
  const errors = {};

  /* ── Personal ── */
  if (!data.firstName.trim())
    errors.firstName = "First name is required.";

  if (!data.lastName.trim())
    errors.lastName = "Last name is required.";

  /* ── Contact ── */
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  // Strip spaces / dashes before testing phone
  const rawPhone = (data.phone || "").replace(/[\s\-]/g, "");
  if (!rawPhone) {
    errors.phone = "Phone number is required.";
  } else if (!PHONE_REGEX.test(rawPhone)) {
    errors.phone = "Enter a valid 10-digit mobile number (starts with 6–9).";
  }

  /* ── Security ── */
  if (!options.isEdit) {
    if (!data.password) {
      errors.password = "Password is required.";
    } else if (!PASSWORD_REGEX.test(data.password)) {
      errors.password =
        "Min 8 chars with at least one uppercase, lowercase, and digit.";
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
}
