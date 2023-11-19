import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectId } from "../../features/auth/adminSlice";
import Navbar from "../layout/Navbar";

export default function RequireAuth() {
  const userId = useSelector(selectId);
  if (userId) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
