import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RoleRedirect() {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role === "staff") return <Navigate to="/staff" replace />;
  return <Navigate to="/login" replace />;
}
