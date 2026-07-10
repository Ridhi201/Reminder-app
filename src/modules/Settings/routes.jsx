import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";

export default function SettingsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path=":tab" element={<Settings />} />
    </Routes>
  );
}
