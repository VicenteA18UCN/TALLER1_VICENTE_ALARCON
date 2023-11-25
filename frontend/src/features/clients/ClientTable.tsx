import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { primaryGreen } from "../../app/constants/colors";
import { Client } from "../../app/models/Client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

/**
 * Constante que define un TableCell personalizado con estilos específicos.
 * @constant
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: primaryGreen,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/**
 * Constante que establece el estilo de las filas de la tabla.
 * @constant
 * @memberof StyledTableRow
 * @param {Object} theme - Tema de Material-UI.
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Interfaz que define el tipado de las props del componente ClientsTable.
 * @interface
 * @property {Client[]} initialClient - Lista inicial de clientes.
 * @property {(client: Client) => void} handleDelete - Función para manejar la eliminación de un cliente.
 * @property {(client: Client) => void} handleEdit - Función para manejar la edición de un cliente.
 */
interface Props {
  initialClient: Client[];
  handleDelete: (client: Client) => void;
  handleEdit: (client: Client) => void;
}

/**
 * Componente que renderiza la tabla de clientes.
 * @component
 * @param {Props} props - Props del componente ClientsTable.
 */
const ClientsTable = ({ initialClient, handleDelete, handleEdit }: Props) => {
  const [clients, setClients] = React.useState<Client[]>(initialClient);

  /**
   * Hook que se ejecuta cuando se actualiza el estado de initialClient.
   * @memberof ClientsTable
   * @name useEffect
   * @function
   */ React.useEffect(() => {
    setClients(initialClient);
  }, [initialClient]);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombres</StyledTableCell>
            <StyledTableCell align="center">Apellidos</StyledTableCell>
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
              <StyledTableCell align="center" style={{ width: "200px" }}>
                {client.rut}
              </StyledTableCell>
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
