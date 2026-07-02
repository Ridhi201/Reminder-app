/**
 * userService.js
 *
 * Placeholder for real API calls (Step 10 — Axios integration).
 * Swap the console.log bodies with axios calls once the backend is ready.
 *
 * Example (when backend is ready):
 *   import api from "../../../api/axiosInstance";
 *   createUser: (data) => api.post("/users", data),
 */

const userService = {
  /** Fetch all users */
  getUsers: async () => {
    // return await api.get("/users");
    throw new Error("API not connected yet — using local state");
  },

  /** Create a new user */
  createUser: async (data) => {
    // return await api.post("/users", data);
    console.log("[userService] createUser →", data);
  },

  /** Update an existing user */
  updateUser: async (id, data) => {
    // return await api.put(`/users/${id}`, data);
    console.log("[userService] updateUser →", id, data);
  },

  /** Delete a user */
  deleteUser: async (id) => {
    // return await api.delete(`/users/${id}`);
    console.log("[userService] deleteUser →", id);
  },
};

export default userService;
