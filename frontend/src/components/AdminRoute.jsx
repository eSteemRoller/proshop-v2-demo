
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { userInfo } = useSelector((authState) => authState.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
}
