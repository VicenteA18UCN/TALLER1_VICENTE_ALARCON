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

/**
 * Página de administración de usuarios.
 * @component
 */
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

  /**
   * Comprueba si el token de autenticación ha expirado y realiza acciones en consecuencia.
   * Si el token ha expirado, realiza un cierre de sesión y recarga la página.
   * @function
   * @returns {void}
   */
  const expiredToken = () => {
    const now = Math.floor(Date.now() / 1000);
    if (exp && now > exp) {
      dispatch(logout());
      window.location.reload();
    }
  };

  /**
   * Maneja la creación de un nuevo cliente.
   * @param {Client} newClient - El nuevo cliente a crear.
   * @returns {void}
   */
  const handleClickCreate = (newClient: Client) => {
    expiredToken();
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
        toast.success("Cliente creado con éxito.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
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
            } else if (error.data.errors?.Points) {
              errorDefault = "Los puntos no pueden ser negativos.";
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

  /**
   * Maneja la eliminación de un cliente.
   * @param {number} id - El ID del cliente a eliminar.
   * @returns {void}
   */
  const handleClickDelete = (id: number) => {
    expiredToken();
    console.log(id);
    agent.Clients.delete(id)
      .then((response) => {
        var errorDefault = "Se ha eliminado al usuario correctamente.";
        toast.success(errorDefault, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setClients(clients.filter((client) => client.id !== id));
        console.log(response);
        handleCloseDeleteForm();
      })
      .catch((error) => {
        handleCloseDeleteForm();
        if (error.data === "User is admin") {
          var errorDefault = "No se puede eliminar un usuario administrador.";
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
        }
      });
  };

  /**
   * Maneja la actualización de un cliente.
   * @param {Client} updatedClient - El cliente actualizado.
   * @returns {void}
   */
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
        toast.success("Cliente actualizado con éxito.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
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
            } else if (error.data.errors?.Points) {
              errorDefault = "Los puntos no pueden ser negativos.";
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
  /**
   * Abre el formulario de creación de usuario.
   * @returns {void}
   */
  const handleOpenCreateForm = () => {
    setIsCreateFormOpen(true);
  };
  /**
   * Cierra el formulario de creación de usuario.
   * @returns {void}
   */
  const handleCloseCreateForm = () => {
    setIsCreateFormOpen(false);
  };
  /**
   * Abre el formulario de eliminación de usuario.
   * @returns {void}
   */
  const handleOpenDeleteForm = (client: Client) => {
    setIsDeleteDialogOpen(true);
    setCurrentClient(client);
  };
  /**
   * Cierra el formulario de eliminación de usuario.
   * @returns {void}
   */
  const handleCloseDeleteForm = () => {
    setIsDeleteDialogOpen(false);
    setCurrentClient(defaultClient);
  };
  /**
   * Abre el formulario de edición de usuario.
   * @returns {void}
   */
  const handleEditClient = (client: Client) => {
    setIsEditFormOpen(true);
    setCurrentClient(client);
  };
  /**
   * Cierra el formulario de edición de usuario.
   * @returns {void}
   */
  const handleCloseEditForm = () => {
    setCurrentClient(defaultClient);
    setIsEditFormOpen(false);
  };

  /**
   * Gestiona la búsqueda de clientes.
   * @param {string} newSearchString - La cadena de búsqueda.
   * @returns {void}
   */
  const handleSearch = (newSearchString: string) => {
    setSearchString(newSearchString);
  };

  /**
   * Filtra los clientes según la cadena de búsqueda.
   * @returns {void}
   */
  const filteredClients = clients.filter(
    (client) =>
      client.rut.toLowerCase().startsWith(searchString.toLowerCase()) ||
      client.email.toLowerCase().startsWith(searchString.toLowerCase())
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
