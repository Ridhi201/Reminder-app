import * as notificationService from "../modules/Notifications/services/notificationService";

export const sendNotification = notificationService.sendNotification;
export const getNotifications = notificationService.getNotifications;
export const deleteNotification = notificationService.deleteNotification;
export const getNotificationById = notificationService.getNotificationById;
export const updateNotification = notificationService.updateNotification;

export default notificationService.default;
