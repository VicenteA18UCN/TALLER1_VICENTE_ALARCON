import * as React from "react";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";
import ClientTable from "../clients/ClientTable";
import agent from "../../app/api/agent";
import { Client } from "../../app/models/Client";
import EditUserForm from "../clients/EditUserForm";
import SearchClient from "../clients/SearchClient";
import DeleteDialog from "../clients/DeleteDialog";
import CreateUserForm from "../clients/CreateUserForm";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectExp, selectId } from "../../features/auth/adminSlice";
import Footer from "../../app/layout/Footer";
import { validate, clean, format, getCheckDigit } from "rut.js";

const defaultClient: Client = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
  rut: "",
  points: 0,
};

const AdminPage = () => {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [searchString, setSearchString] = React.useState<string>("");
  const [currentClient, setCurrentClient] =
    React.useState<Client>(defaultClient);
  const [isCreateFormOpen, setIsCreateFormOpen] =
    React.useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);
  const exp = useSelector(selectExp);
  const dispatch = useDispatch();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  React.useEffect(() => {
    agent.Clients.list()
      .then((response) => {
        setClients(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const expiredToken = () => {
    const now = Math.floor(Date.now() / 1000);
    if (exp && now > exp) {
      dispatch(logout());
      window.location.reload();
    }
  };

  const handleClickCreate = (newClient: Client) => {
    expiredToken();
    console.log(newClient.rut);
    if (!validate(newClient.rut)) {
      toast.error("El rut no es válido.", {
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
    } else {
      newClient.rut = format(newClient.rut);
    }
    if (!emailRegex.test(newClient.email)) {
      toast.error("El email no es válido.", {
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

    agent.Clients.create(
      newClient.rut,
      newClient.name,
      newClient.lastname,
      newClient.email,
      newClient.points
    )
      .then((response) => {
        setClients([...clients, response]);
        handleCloseCreateForm();
      })
      .catch((error) => {
        console.log(error);
        let errorDefault: string = "Ha ocurrido un error. Intente nuevamente.";
        console.log(error);
        switch (error.status) {
          case 400:
            if (error.data.errors?.Rut) {
              errorDefault = "El rut no puede estar vacío.";
            } else if (error.data.errors?.Name) {
              errorDefault = "El nombre no puede estar vacío.";
            } else if (error.data.errors?.Lastname) {
              errorDefault = "El apellido no puede estar vacío.";
            } else if (error.data.errors?.Email) {
              if (
                error.data.errors.Email.includes("The Email field is required.")
              ) {
                errorDefault = "El email no puede estar vacío.";
              } else if (
                error.data.errors.Email.includes(
                  "The Email field is not a valid e-mail address."
                )
              ) {
                errorDefault = "El email no es válido.";
              }
            } else if (error.data?.Email) {
              errorDefault = "El Email ya existe.";
            } else if (error.data?.Rut) {
              errorDefault = "El Rut ya existe.";
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
      });
  };

  const handleClickDelete = (id: number) => {
    expiredToken();
    console.log(id);
    agent.Clients.delete(id)
      .then((response) => {
        setClients(clients.filter((client) => client.id !== id));
        console.log(response);
        handleCloseDeleteForm();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const handleClickUpdate = (updatedClient: Client) => {
    expiredToken();
    if (!emailRegex.test(updatedClient.email)) {
      toast.error("El email no es válido.", {
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

    agent.Clients.update(
      updatedClient.rut,
      updatedClient.name,
      updatedClient.lastname,
      updatedClient.email,
      updatedClient.points
    )
      .then((response) => {
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === updatedClient.id
              ? { ...client, ...updatedClient }
              : client
          )
        );
        console.log(response);
        handleCloseEditForm();
      })
      .catch((error) => {
        let errorDefault: string = "Ha ocurrido un error. Intente nuevamente.";
        switch (error.status) {
          case 400:
            if (error.data.errors?.Name) {
              errorDefault = "El nombre no puede estar vacío.";
            } else if (error.data.errors?.Lastname) {
              errorDefault = "El apellido no puede estar vacío.";
            } else if (error.data.errors?.Email) {
              if (
                error.data.errors.Email.includes("The Email field is required.")
              ) {
                errorDefault = "El email no puede estar vacío.";
              } else if (
                error.data.errors.Email.includes(
                  "The Email field is not a valid e-mail address."
                )
              ) {
                errorDefault = "El email no es válido.";
              }
            } else if (error.data.Email) {
              errorDefault = "El Email ya existe.";
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
      });
  };

  const handleOpenCreateForm = () => {
    setIsCreateFormOpen(true);
  };

  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
  };

  const handleOpenDeleteForm = (client: Client) => {
    setIsDeleteDialogOpen(true);
    setCurrentClient(client);
  };
  const handleCloseDeleteForm = () => {
    setIsDeleteDialogOpen(false);
    setCurrentClient(defaultClient);
  };

  const handleEditClient = (client: Client) => {
    setIsEditFormOpen(true);
    setCurrentClient(client);
  };

  const handleCloseEditForm = () => {
    setCurrentClient(defaultClient);
    setIsEditFormOpen(false);
  };

  const handleSearch = (newSearchString: string) => {
    setSearchString(newSearchString);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.rut.startsWith(searchString) ||
      client.email.startsWith(searchString)
  );

  return (
    <>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ padding: "20px 15px", margin: "2rem 0" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Gestión de Usuarios
              </Typography>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6} sm={8}>
                  <SearchClient handleSearch={handleSearch} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Grid container justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleOpenCreateForm}
                      color="success"
                      style={{ maxWidth: "200px", marginBottom: "1px" }}
                    >
                      Añadir cliente
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <ClientTable
                initialClient={filteredClients}
                handleDelete={handleOpenDeleteForm}
                handleEdit={handleEditClient}
              />
              {isCreateFormOpen && (
                <CreateUserForm
                  isOpen={isCreateFormOpen}
                  handleClickClose={handleCloseCreateForm}
                  handleClickCreate={handleClickCreate}
                />
              )}
              {isEditFormOpen && (
                <EditUserForm
                  isOpen={isEditFormOpen}
                  initialClient={currentClient}
                  handleClickClose={handleCloseEditForm}
                  handleClickUpdate={handleClickUpdate}
                />
              )}

              {isDeleteDialogOpen && (
                <DeleteDialog
                  isOpen={isDeleteDialogOpen}
                  deleteClient={currentClient}
                  handleClickClose={handleCloseDeleteForm}
                  handleClickDelete={handleClickDelete}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default AdminPage;
