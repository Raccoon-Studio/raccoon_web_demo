import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loader">
        <div className="admin-spinner" />
        <p>Loading…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
