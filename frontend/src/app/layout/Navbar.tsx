import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/adminSlice";
import { primaryGreen } from "../constants/colors";

/**
 * Componente que representa la barra de navegación superior de la aplicación.
 * @function
 * @returns {React.Element} - Elemento que contiene la barra de navegación con título y opciones de usuario.
 */
const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  /**
   * Manejador para cerrar la sesión del usuario.
   * @function
   * @returns {void}
   */
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  /**
   * Manejador para abrir el menú de usuario.
   * @function
   * @param {React.MouseEvent<HTMLElement>} event - Evento de clic en el icono de usuario.
   * @returns {void}
   */
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /**
   * Manejador para cerrar el menú de usuario.
   * @function
   * @returns {void}
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: primaryGreen }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dumbo Supermercados
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
