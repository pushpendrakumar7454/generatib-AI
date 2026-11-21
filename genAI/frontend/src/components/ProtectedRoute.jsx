import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center text-slate-600">Checking session...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
