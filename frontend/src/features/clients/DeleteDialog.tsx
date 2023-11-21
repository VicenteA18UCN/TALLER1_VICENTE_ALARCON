import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";

interface Props {
  isOpen: boolean;
  deleteClient: Client;
  handleClickClose: () => void;
  handleClickDelete: (id: number) => void;
}
const DeleteDialog = ({
  isOpen,
  deleteClient,
  handleClickClose,
  handleClickDelete,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(deleteClient);

  const handleOnSubmit = () => {
    handleClickDelete(client.id);
    handleClose();
  };

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
