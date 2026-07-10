import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Profile />} />
    </Routes>
  );
}
