import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout    from "../components/layout/AdminLayout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

// Auth
import Login  from "../authentication/pages/Login";
import Logout from "../authentication/pages/Logout";

// Modules
import Dashboard  from "../modules/Dashboard/pages/Dashboard";
import Users      from "../modules/Users/pages/Users";
import AddUser    from "../modules/Users/pages/AddUser";
import EditUser   from "../modules/Users/pages/EditUser";
import ViewUser   from "../modules/Users/pages/ViewUser";
import { ReminderList, AddReminder, EditReminder, ViewReminder } from "../modules/Reminders";
import { CalendarPage } from "../modules/Calendar";
import { TemplateList, AddTemplate, EditTemplate, ViewTemplate } from "../modules/Templates";
import { NotificationList, SendNotification, ViewNotification, EditNotification, NotificationHistory, NotificationAnalytics } from "../modules/Notifications";
import Settings     from "../modules/Settings/pages/Settings";
import Profile      from "../modules/Profile/pages/Profile";
import Reports      from "../modules/Reports/pages/Reports";
import ActivityLogs from "../modules/Logs/pages/ActivityLogs";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Auth guard — renders <Outlet /> when authenticated */}
      <Route element={<ProtectedRoute />}>

        {/* Admin shell layout */}
        <Route element={<AdminLayout />}>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* Logout — confirmation modal overlays the layout */}
          <Route path="/logout" element={<Logout />} />

          {/* Users */}
          <Route path="/users"          element={<Users />} />
          <Route path="/users/add"      element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/view/:id" element={<ViewUser />} />

          {/* Reminders */}
          <Route path="/reminders"          element={<ReminderList />} />
          <Route path="/reminders/add"      element={<AddReminder />} />
          <Route path="/reminders/edit/:id" element={<EditReminder />} />
          <Route path="/reminders/view/:id" element={<ViewReminder />} />

          {/* Calendar */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* Templates */}
          <Route path="/templates"          element={<TemplateList />} />
          <Route path="/templates/add"      element={<AddTemplate />} />
          <Route path="/templates/edit/:id" element={<EditTemplate />} />
          <Route path="/templates/view/:id" element={<ViewTemplate />} />

          {/* Notifications */}
          <Route path="/notifications"           element={<NotificationList />} />
          <Route path="/notifications/send"      element={<SendNotification />} />
          <Route path="/notifications/view/:id"  element={<ViewNotification />} />
          <Route path="/notifications/edit/:id"  element={<EditNotification />} />
          <Route path="/notifications/history"   element={<NotificationHistory />} />
          <Route path="/notifications/analytics" element={<NotificationAnalytics />} />

          {/* Settings */}
          <Route path="/settings"      element={<Settings />} />
          <Route path="/settings/:tab" element={<Settings />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Reports */}
          <Route path="/reports"      element={<Reports />} />
          <Route path="/reports/:tab" element={<Reports />} />

          {/* Activity Logs */}
          <Route path="/logs" element={<ActivityLogs />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>{/* /AdminLayout */}
      </Route>{/* /ProtectedRoute */}
    </Routes>
  );
}
