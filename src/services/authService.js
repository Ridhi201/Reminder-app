import api from "./api";

/** POST /auth/login */
export const login = (credentials) => api.post("/auth/login", credentials);

/** POST /auth/logout */
export const logout = () => api.post("/auth/logout");

/** GET /auth/me */
export const getMe = () => api.get("/auth/me");

/** POST /auth/refresh */
export const refreshToken = () => api.post("/auth/refresh");
