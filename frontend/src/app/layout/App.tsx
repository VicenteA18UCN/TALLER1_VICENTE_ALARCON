import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente principal de la aplicación.
 * @function
 * @returns {React.Element} - Elemento raíz de la aplicación que contiene la configuración global.
 */
const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
