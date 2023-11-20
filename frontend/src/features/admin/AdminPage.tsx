import * as React from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { selectId, selectToken } from "../auth/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import ClientTable from "../clients/ClientTable";
import agent from "../../app/api/agent";
import { Client } from "../../app/models/Client";
import EditUserForm from "../clients/EditUserForm";
import SearchClient from "../clients/SearchClient";
import DeleteDialog from "../clients/DeleteDialog";

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
  const [searchResults, setSearchResults] = React.useState<Client[]>(clients);
  const [currentClient, setCurrentClient] =
    React.useState<Client>(defaultClient);

  const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    agent.Clients.list()
      .then((response) => {
        setClients(response);
        setSearchResults(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteClient = (id: number) => {
    agent.Clients.delete(id)
      .then((response) => {
        setSearchResults(clients.filter((client) => client.id !== id));
        setClients(clients.filter((client) => client.id !== id));
        console.log(response);
        handleCloseDeleteForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickUpdate = (updatedClient: Client) => {
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
        setSearchResults((prevClients) =>
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
        console.log(error);
      });
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

  const handleSearch = (searchString: string) => {
    const results = clients.filter(
      (client) =>
        client.rut.startsWith(searchString) ||
        client.email.startsWith(searchString)
    );
    setSearchResults(results);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: "20px 15px", margin: "2rem 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Gestión de Usuarios
            </Typography>

            <SearchClient handleSearch={handleSearch} />

            <ClientTable
              initialClient={searchResults}
              handleDelete={handleOpenDeleteForm}
              handleEdit={handleEditClient}
            />
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
                handleClickDelete={handleDeleteClient}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminPage;
