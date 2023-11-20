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
  const [currentClient, setCurrentClient] =
    React.useState<Client>(defaultClient);
  const [isEditFormOpen, setIsEditFormOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    agent.Clients.list()
      .then((response) => {
        setClients(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteClient = (id: number) => {
    agent.Clients.delete(id)
      .then((response) => {
        setClients(clients.filter((client) => client.id !== id));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditClient = (client: Client) => {
    setIsEditFormOpen(true);
    setCurrentClient(client);
  };

  const handleCloseEditForm = () => {
    setCurrentClient(defaultClient);
    setIsEditFormOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: "20px 15px", margin: "2rem 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Gestión de Usuarios
            </Typography>

            <ClientTable
              initialClient={clients}
              handleDelete={handleDeleteClient}
              handleEdit={handleEditClient}
            />
            {isEditFormOpen && (
              <EditUserForm
                isOpen={isEditFormOpen}
                initialClient={currentClient}
                handleClickClose={handleCloseEditForm}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminPage;
