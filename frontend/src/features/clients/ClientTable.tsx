import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import exp from "constants";
import { primaryGreen } from "../../app/constants/colors";
import { Client } from "../../app/models/Client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon, IconButton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: primaryGreen,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  initialClient: Client[];
  handleDelete: (client: Client) => void;
  handleEdit: (client: Client) => void;
}

const ClientsTable = ({ initialClient, handleDelete, handleEdit }: Props) => {
  const [clients, setClients] = React.useState<Client[]>(initialClient);

  React.useEffect(() => {
    setClients(initialClient);
  }, [initialClient]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>

            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">RUT o DNI</StyledTableCell>
            <StyledTableCell align="center">Correo electrónico</StyledTableCell>
            <StyledTableCell align="center">Puntos</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <StyledTableRow key={client.id}>
              <StyledTableCell component="th" scope="row" align="center">
                {client.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {client.lastname}
              </StyledTableCell>
              <StyledTableCell align="center">{client.rut}</StyledTableCell>
              <StyledTableCell align="center">{client.email}</StyledTableCell>
              <StyledTableCell align="center">{client.points}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => handleEdit(client)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(client)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;
