import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useDispatch } from "react-redux";
import { login } from "./adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../auth/assets/images/logo.png";
import { primaryGreen, secondaryGreen } from "../../app/constants/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import "@fontsource/roboto";
import Footer from "../../app/layout/Footer";

/**
 * Componente que renderiza la página de login.
 * @component
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  /**
   * Restablece los campos del formulario de inicio de sesión, limpiando los valores de los campos de nombre de usuario y contraseña.
   * @function
   * @returns {void}
   */
  const resetFormFields = () => {
    const usernameField = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const passwordField = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (usernameField && passwordField) {
      usernameField.value = "";
      passwordField.value = "";
    }
  };

  /**
   * Cambia el estado de visualización de la contraseña entre mostrar y ocultar.
   * @function
   * @returns {void}
   */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Evita que el campo de contraseña se seleccione al hacer clic en el icono de mostrar/ocultar contraseña.
   * @function
   * @param {React.MouseEvent<HTMLButtonElement>} event - El evento del mouse.
   * @returns {void}
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /**
   * Maneja la presentación del formulario de inicio de sesión, validando que los campos no estén vacíos y que las credenciales sean correctas.
   * @function
   * @param {React.FormEvent<HTMLFormElement>} event - El evento de formulario.
   * @returns {void}
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";
    if (username === "" && password === "") {
      let errorDefault = "Debe completar todos los campos.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (username === "") {
      let errorDefault = "Debe completar el campo usuario.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (password === "") {
      let errorDefault = "Debe completar el campo contraseña.";
      toast.error(errorDefault, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    agent.Auth.login(username, password)
      .then((response: any) => {
        dispatch(login(response.token));

        toast.dismiss();
        navigate("/admin/list");
      })
      .catch((error) => {
        let errorDefault: string = "Ha ocurrido un error. Intente nuevamente.";
        switch (error.status) {
          case 400:
            if (error.data === "Invalid Credentials") {
              errorDefault = "Usuario o contraseña incorrectos.";
            }
            break;
          case 500:
            errorDefault = "Ha ocurrido un error. Intente nuevamente.";
            break;
          default:
            break;
        }

        toast.error(errorDefault, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          resetFormFields();
        }, 300);
      });
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
          background: secondaryGreen,
        }}
      >
        <Container>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="logo" width={200} height={200} />
              <Typography
                component="h1"
                variant="h5"
                color={primaryGreen}
                fontSize={30}
                fontWeight={700}
                mb={2}
                fontFamily={"roboto"}
                fontStyle={"italic"}
              >
                ¡Dumbo te da menos!
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              border={1}
              borderColor="success.main"
              borderRadius={2}
              sx={{
                mt: 1,
                alignItems: "center",
                flexDirection: "column",
                display: "flex",
                backgroundColor: "#fff",
                padding: "30px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                fontSize={35}
                fontWeight={550}
                fontFamily={"roboto"}
              >
                Inicia Sesión
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2, mb: 2 }}
              >
                Iniciar Sesión{" "}
              </Button>
            </Box>
          </Container>
          <Footer />
        </Container>
      </Grid>
    </>
  );
};

export default Login;
