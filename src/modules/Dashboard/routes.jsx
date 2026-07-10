import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
