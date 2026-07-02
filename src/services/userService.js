import api from "./api";

/* ── Users CRUD ── */

/** GET /users */
export const getUsers = () => api.get("/users");

/** GET /users/:id */
export const getUserById = (id) => api.get(`/users/${id}`);

/** POST /users */
export const createUser = (data) => api.post("/users", data);

/** PUT /users/:id */
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

/** DELETE /users/:id */
export const deleteUser = (id) => api.delete(`/users/${id}`);

/** PATCH /users/:id/status */
export const updateUserStatus = (id, status) =>
  api.patch(`/users/${id}/status`, { status });
