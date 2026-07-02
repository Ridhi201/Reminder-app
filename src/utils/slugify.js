/** "OTP Verification" -> "OTPVerification" */
export function toPascalCase(str) {
  return str
    .replace(/'/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

/** "OTP Verification" -> "otp-verification" */
export function toSlug(str) {
  return str
    .replace(/'/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
