import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, selectExp, selectId } from "../../features/auth/adminSlice";
import Navbar from "../layout/Navbar";

import { useDispatch } from "react-redux";

export default function RequireAuth() {
  const userId = useSelector(selectId);
  const exp = useSelector(selectExp);
  const now = Math.floor(Date.now() / 1000);
  const dispatch = useDispatch();
  if (exp && now > exp) {
    dispatch(logout());
    return <Navigate to="/login" />;
  }

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
