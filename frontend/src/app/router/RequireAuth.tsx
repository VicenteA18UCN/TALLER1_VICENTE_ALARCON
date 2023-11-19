import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectId } from "../../features/auth/adminSlice";

export default function RequireAuth() {
  const adminId = useSelector(selectId);
  if (adminId === "") {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
