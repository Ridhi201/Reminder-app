import { Routes, Route } from "react-router-dom";
import {
  NotificationList,
  SendNotification,
  ViewNotification,
  EditNotification,
  NotificationHistory,
  NotificationAnalytics
} from "./index";

export default function NotificationsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<NotificationList />} />
      <Route path="send" element={<SendNotification />} />
      <Route path="view/:id" element={<ViewNotification />} />
      <Route path="edit/:id" element={<EditNotification />} />
      <Route path="history" element={<NotificationHistory />} />
      <Route path="analytics" element={<NotificationAnalytics />} />
    </Routes>
  );
}
