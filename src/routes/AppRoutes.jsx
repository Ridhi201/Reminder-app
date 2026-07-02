import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout/AdminLayout";

import Dashboard  from "../modules/Dashboard/pages/Dashboard";
import Users      from "../modules/Users/pages/Users";
import AddUser    from "../modules/Users/pages/AddUser";
import EditUser   from "../modules/Users/pages/EditUser";
import ViewUser   from "../modules/Users/pages/ViewUser";
import { ReminderList, AddReminder, EditReminder, ViewReminder } from "../modules/Reminders";
import { CalendarPage } from "../modules/Calendar";
import { TemplateList, AddTemplate } from "../modules/Templates";



export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

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
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/templates/add" element={<AddTemplate />} />



        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Route>
    </Routes>
  );
}
