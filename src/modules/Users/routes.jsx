import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";

export default function UsersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="add" element={<AddUser />} />
      <Route path="edit/:id" element={<EditUser />} />
      <Route path="view/:id" element={<ViewUser />} />
    </Routes>
  );
}
