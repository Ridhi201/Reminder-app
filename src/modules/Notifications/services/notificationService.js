import api from "../../../services/api";

export const sendNotification = (data) =>
  api.post("/notifications/send", data);

export const getNotifications = () =>
  api.get("/notifications");

export const deleteNotification = (id) =>
  api.delete(`/notifications/${id}`);

export const getNotificationById = (id) =>
  api.get(`/notifications/${id}`);

export const updateNotification = (id, data) =>
  api.put(`/notifications/${id}`, data);

const notificationService = {
  sendNotification,
  getNotifications,
  deleteNotification,
  getNotificationById,
  updateNotification,
};

export default notificationService;
