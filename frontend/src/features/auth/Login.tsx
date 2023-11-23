import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { Button, Grid, TextField, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useDispatch } from "react-redux";
import { login } from "./adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../auth/assets/images/logo.png";
import { primaryGreen } from "../../app/constants/colors";
import { BoltRounded } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";
    agent.Auth.login(username, password)
      .then((response: any) => {
        dispatch(login(response.token));
        console.log(response);
        navigate("/admin/list");
      })
      .catch((error) => {
        console.log(error);
        let errorDefault: string = "Ha ocurrido un error. Intente nuevamente.";
        console.log(error.status);
        console.log(error.statusText);
        console.log(error.data);
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
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, #effbe2, #e8f6e2)",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="logo"
              width={200}
              height={200}
              style={{ marginTop: "50px" }}
            />
            <Typography
              component="h1"
              variant="h5"
              color={primaryGreen}
              fontSize={30}
              fontWeight={700}
              mb={2}
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
              fontWeight={500}
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
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión{" "}
            </Button>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default Login;
