import { Routes, Route } from "react-router-dom";
import Reports from "./pages/Reports";

export default function ReportsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Reports />} />
      <Route path=":tab" element={<Reports />} />
    </Routes>
  );
}
