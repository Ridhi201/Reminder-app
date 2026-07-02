/**
 * reminderService.js
 *
 * Mock API calls for Axios integration.
 * Swap console.logs or errors with Axios endpoints once backend goes online.
 */

const reminderService = {
  /** Fetch all reminders */
  getReminders: async () => {
    throw new Error("API not connected yet — using local state");
  },

  /** Fetch a specific reminder by ID */
  getReminderById: async (id) => {
    throw new Error("API not connected yet — using local state");
  },

  /** Create a new reminder */
  createReminder: async (data) => {
    console.log("[reminderService] createReminder →", data);
  },

  /** Update an existing reminder */
  updateReminder: async (id, data) => {
    console.log("[reminderService] updateReminder →", id, data);
  },

  /** Delete a reminder */
  deleteReminder: async (id) => {
    console.log("[reminderService] deleteReminder →", id);
  },
};

export default reminderService;
