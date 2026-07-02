export const APP_CONFIG = {
  appName: "Reminder",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  env: import.meta.env.MODE,
  features: {
    aiAssistant: true,
    voiceAssistant: true,
    locationReminders: true,
    premium: true,
  },
  defaultLocale: "en",
  defaultTheme: "light",
};
