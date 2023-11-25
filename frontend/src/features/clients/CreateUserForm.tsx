import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";

/**
 * Interfaz que define el tipado de las props del componente CreateUserForm.
 * @interface
 * @property {boolean} isOpen - Indica si el formulario está abierto.
 * @property {() => void} handleClickClose - Función para manejar el cierre del formulario.
 * @property {(client: Client) => void} handleClickCreate - Función para manejar la creación de un nuevo cliente.
 */
interface Props {
  isOpen: boolean;
  handleClickClose: () => void;
  handleClickCreate: (client: Client) => void;
}
/**
 * Cliente por defecto que sirve como plantilla para la creación de nuevos clientes.
 * @constant
 * @name defaultClient
 * @type {Client}
 * @defaultvalue { id: 0, name: "", lastname: "", email: "", rut: "", points: 0 }
 */
const defaultClient: Client = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
  rut: "",
  points: 0,
};
/**
 * Componente que representa un formulario para la creación de nuevos clientes.
 * @component
 * @param {Props} props - Props del componente CreateUserForm.
 */
const CreateUserForm = ({
  isOpen,
  handleClickClose,
  handleClickCreate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(defaultClient);

  /**
   * Maneja el cambio en los campos del cliente.
   * @memberof CreateUserForm
   * @name handleClientChange
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio en el input.
   * @returns {void}
   */
  const handleClientChange = (event: any) => {
    const { id, value } = event.target;
    setClient({ ...client, [id]: value });
  };

  /**
   * Cierra el formulario y ejecuta la función para manejar el cierre del formulario.
   * @memberof CreateUserForm
   * @name handleClose
   * @function
   * @returns {void}
   */
  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };

  /**
   * Ejecuta la función para manejar la creación de un nuevo cliente.
   * @memberof CreateUserForm
   * @name handleOnSubmit
   * @function
   * @returns {void}
   */
  const handleOnSubmit = () => {
    if (!client.points) {
      client.points = 0;
    }
    handleClickCreate(client);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Crear Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="rut"
            label="Rut"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Ej: 12.345.678-9"
            value={client.rut}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Nombres"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="lastname"
            label="Apellidos"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="points"
            label="Puntos"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
            value={client.points}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOnSubmit}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateUserForm;
