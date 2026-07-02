/**
 * Centralized endpoint paths. Keeping these as plain strings (rather than
 * scattering literals across services) means a backend route change is a
 * one-line edit here.
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    otpVerify: "/auth/otp/verify",
  },
  reminders: {
    list: "/reminders",
    detail: (id) => `/reminders/${id}`,
  },
  habits: {
    list: "/habits",
    detail: (id) => `/habits/${id}`,
  },
  goals: {
    list: "/goals",
    detail: (id) => `/goals/${id}`,
  },
  notes: {
    list: "/notes",
    detail: (id) => `/notes/${id}`,
  },
  analytics: {
    summary: "/analytics/summary",
  },
  premium: {
    plans: "/premium/plans",
  },
};
