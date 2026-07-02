/**
 * templateService.js
 *
 * Mock API calls for Axios integration.
 * Swap console.logs or errors with Axios endpoints once backend goes online.
 */

const templateService = {
  /** Fetch all templates */
  getTemplates: async () => {
    throw new Error("API not connected yet — using local state");
  },

  /** Fetch a specific template by ID */
  getTemplateById: async (id) => {
    throw new Error("API not connected yet — using local state");
  },

  /** Create a new template */
  createTemplate: async (data) => {
    console.log("[templateService] createTemplate →", data);
  },

  /** Update an existing template */
  updateTemplate: async (id, data) => {
    console.log("[templateService] updateTemplate →", id, data);
  },

  /** Delete a template */
  deleteTemplate: async (id) => {
    console.log("[templateService] deleteTemplate →", id);
  },
};

export default templateService;
export { templateService };
