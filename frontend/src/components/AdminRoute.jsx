import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign_in" replace />
  );
};