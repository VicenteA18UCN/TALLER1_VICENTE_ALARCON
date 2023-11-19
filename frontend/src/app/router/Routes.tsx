import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Login from "../../features/auth/Login";
import RequireAuth from "./RequireAuth";

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
      },
    ],
  },
]);
