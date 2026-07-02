import api from "./api";

/** GET /dashboard/stats */
export const getDashboardStats = () => api.get("/dashboard/stats");

/** GET /dashboard/recent-users */
export const getRecentUsers = () => api.get("/dashboard/recent-users");

/** GET /dashboard/recent-reminders */
export const getRecentReminders = () => api.get("/dashboard/recent-reminders");

/** GET /dashboard/charts */
export const getChartData = () => api.get("/dashboard/charts");
