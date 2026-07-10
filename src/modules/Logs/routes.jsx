import { Routes, Route } from "react-router-dom";
import ActivityLogs from "./pages/ActivityLogs";

export default function LogsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ActivityLogs />} />
    </Routes>
  );
}
