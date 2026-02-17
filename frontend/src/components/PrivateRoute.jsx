import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/sign_in" replace />;
};