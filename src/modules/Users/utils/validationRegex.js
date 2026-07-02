/** Standard email format */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Indian mobile number:
 * - 10 digits, starts with 6, 7, 8, or 9
 * - Allows optional +91 or 0 prefix (stripped before test)
 */
export const PHONE_REGEX = /^[6-9]\d{9}$/;

/**
 * Strong password:
 * - Minimum 8 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one digit
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
