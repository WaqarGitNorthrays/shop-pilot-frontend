import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  adminOnly?: boolean;
}

const ProtectedRoute = ({ adminOnly = false }: ProtectedRouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    // 🚫 Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    // 🚫 Logged in but not admin → redirect to home
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return <Outlet />;
};

export default ProtectedRoute;
