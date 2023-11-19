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

const AdminPage = () => {
  const id = useSelector(selectId);
  console.log(id);

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ padding: "20px 15px", margin: "2rem 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Gestión de Usuarios
            </Typography>

            <ClientTable />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminPage;
