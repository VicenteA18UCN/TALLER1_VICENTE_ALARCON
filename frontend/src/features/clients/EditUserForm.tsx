import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";

/**
 * Interfaz que define el tipado de las props del componente EditUserForm.
 * @interface
 * @property {boolean} isOpen - Indica si el formulario de edición está abierto.
 * @property {Client} initialClient - Cliente inicial que se está editando.
 * @property {() => void} handleClickClose - Función para manejar el cierre del formulario.
 * @property {(client: Client) => void} handleClickUpdate - Función para manejar la actualización del cliente.
 */
interface Props {
  isOpen: boolean;
  initialClient: Client;
  handleClickClose: () => void;
  handleClickUpdate: (client: Client) => void;
}
/**
 * Componente que representa un formulario para la edición de clientes.
 * @component
 * @param {Props} props - Props del componente EditUserForm.
 */
const EditUserForm = ({
  isOpen,
  initialClient,
  handleClickClose,
  handleClickUpdate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(initialClient);

  /**
   * Maneja el cambio en los campos del cliente que se está editando.
   * @memberof EditUserForm
   * @name handleClientChange
   * @function
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio en el input.
   * @returns {void}
   */
  const handleClientChange = (event: any) => {
    console.log(event);
    setClient({ ...client, [event.target.id]: event.target.value });
  };
  /**
   * Cierra el formulario de edición y ejecuta la función para manejar el cierre del formulario.
   * @memberof EditUserForm
   * @name handleClose
   * @function
   * @returns {void}
   */
  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  /**
   * Ejecuta la función para manejar la actualización del cliente.
   * @memberof EditUserForm
   * @name handleOnSubmit
   * @function
   * @returns {void}
   */
  const handleOnSubmit = () => {
    if (!client.points) {
      client.points = 0;
    }
    handleClickUpdate(client);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombres"
            type="text"
            fullWidth
            variant="standard"
            value={client.name}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Apellidos"
            type="text"
            fullWidth
            variant="standard"
            value={client.lastname}
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Correo electrónico"
            type="email"
            fullWidth
            variant="standard"
            value={client.email}
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
            value={client.points.toString()}
            onChange={(e) => handleClientChange(e)}
            inputProps={{ min: "0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleOnSubmit}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditUserForm;
