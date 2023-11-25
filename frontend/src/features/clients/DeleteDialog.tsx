import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";

/**
 * Interfaz que define el tipado de las props del componente DeleteDialog.
 * @interface
 * @property {boolean} isOpen - Indica si el diálogo está abierto.
 * @property {Client} deleteClient - Cliente a eliminar.
 * @property {() => void} handleClickClose - Función para manejar el cierre del diálogo.
 * @property {(id: number) => void} handleClickDelete - Función para manejar la eliminación del cliente.
 */
interface Props {
  isOpen: boolean;
  deleteClient: Client;
  handleClickClose: () => void;
  handleClickDelete: (id: number) => void;
}
/**
 * Componente que representa un diálogo de confirmación para la eliminación de un cliente.
 * @component
 * @param {Props} props - Props del componente DeleteDialog.
 */
const DeleteDialog = ({
  isOpen,
  deleteClient,
  handleClickClose,
  handleClickDelete,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(deleteClient);
  /**
   * Ejecuta la función para manejar la eliminación del cliente y cierra el diálogo.
   * @memberof DeleteDialog
   * @name handleOnSubmit
   * @function
   * @returns {void}
   */
  const handleOnSubmit = () => {
    handleClickDelete(client.id);
    handleClose();
  };
  /**
   * Cierra el diálogo y ejecuta la función para manejar el cierre del diálogo.
   * @memberof DeleteDialog
   * @name handleClose
   * @function
   * @returns {void}
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible. ¿Estas seguro de que quieres eliminar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancelar</Button>
          <Button onClick={handleOnSubmit} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
