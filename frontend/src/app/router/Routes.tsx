import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/auth/Login";
import RequireAuth from "./RequireAuth";
import AdminPage from "../../features/admin/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={"/login"} /> },
      { path: "/login", element: <Login /> },
      {
        path: "/admin",
        element: <RequireAuth />,
        children: [{ path: "list", element: <AdminPage /> }],
      },
    ],
  },
]);
