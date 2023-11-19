import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { Button, TextField, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useDispatch, useSelector } from "react-redux";
import { login, selectId } from "./adminSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { time } from "console";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(selectId);
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
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        switch (error.response.status) {
          case 400:
            if (error.response.data === "Invalid Credentials") {
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
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia Sesión
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión{" "}
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
function delay(arg0: number) {
  throw new Error("Function not implemented.");
}
