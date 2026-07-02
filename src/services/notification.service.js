/**
 * Placeholder notification service. On web this would wrap the
 * Notifications API; on React Native this would wrap a push SDK.
 * Business logic intentionally left for later implementation.
 */
export const notificationService = {
  async requestPermission() {
    if (!("Notification" in window)) return "unsupported";
    return Notification.requestPermission();
  },
  schedule(_reminder) {
    // TODO: integrate with backend push / local scheduling.
  },
  cancel(_reminderId) {
    // TODO: integrate with backend push / local scheduling.
  },
};
