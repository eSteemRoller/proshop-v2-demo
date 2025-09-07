
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function PrivateRoute() { 
  const { userInfo } = useSelector((authState) => authState.auth);
  
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};