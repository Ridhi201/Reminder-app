import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout    from "../components/layout/AdminLayout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

// Auth
import Login  from "../authentication/pages/Login";
import Logout from "../authentication/pages/Logout";

// Modules Routes
import DashboardRoutes     from "../modules/Dashboard/routes";
import UsersRoutes         from "../modules/Users/routes";
import TemplatesRoutes     from "../modules/Templates/routes";
import NotificationsRoutes from "../modules/Notifications/routes";
import SettingsRoutes      from "../modules/Settings/routes";
import ProfileRoutes       from "../modules/Profile/routes";
import ReportsRoutes       from "../modules/Reports/routes";
import LogsRoutes          from "../modules/Logs/routes";

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

          <Route path="/dashboard/*" element={<DashboardRoutes />} />

          {/* Logout — confirmation modal overlays the layout */}
          <Route path="/logout" element={<Logout />} />

          {/* Users */}
          <Route path="/users/*" element={<UsersRoutes />} />

          {/* Templates */}
          <Route path="/templates/*" element={<TemplatesRoutes />} />

          {/* Notifications */}
          <Route path="/notifications/*" element={<NotificationsRoutes />} />

          {/* Settings */}
          <Route path="/settings/*" element={<SettingsRoutes />} />

          {/* Profile */}
          <Route path="/profile/*" element={<ProfileRoutes />} />

          {/* Reports */}
          <Route path="/reports/*" element={<ReportsRoutes />} />

          {/* Activity Logs */}
          <Route path="/logs/*" element={<LogsRoutes />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Route>{/* /AdminLayout */}
      </Route>{/* /ProtectedRoute */}
    </Routes>
  );
}

