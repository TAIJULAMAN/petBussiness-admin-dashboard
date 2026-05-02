import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
};

const ALLOWED_ROLES = ["SUPER_ADMIN", "ADMIN"];

const PrivateRoute = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(accessToken);
  const role = decoded?.role;

  console.log("decoded token:", decoded, "role:", role);

  if (!role || !ALLOWED_ROLES.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
