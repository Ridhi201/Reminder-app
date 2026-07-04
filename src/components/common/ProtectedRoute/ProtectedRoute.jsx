import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

/**
 * Layout-route compatible ProtectedRoute.
 * Use as the `element` on a pathless parent <Route>.
 * Renders <Outlet /> when authenticated, redirects to /login otherwise.
 */
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
