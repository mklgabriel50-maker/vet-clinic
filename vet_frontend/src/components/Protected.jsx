import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  // Bypass auth (dev mode)
  const disableAuth = import.meta.env.VITE_DISABLE_AUTH === "1";
  if (disableAuth) return children;

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return children;
}
