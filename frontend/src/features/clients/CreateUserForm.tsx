import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";

interface Props {
  isOpen: boolean;
  handleClickClose: () => void;
  handleClickCreate: (client: Client) => void;
}

const defaultClient: Client = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
  rut: "",
  points: 0,
};

const CreateUserForm = ({
  isOpen,

  handleClickClose,
  handleClickCreate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(defaultClient);

  const handleClientChange = (event: any) => {
    const { id, value } = event.target;
    setClient({ ...client, [id]: value });
    console.log(client);
  };

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  const handleOnSubmit = () => {
    handleClickCreate(client);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Crear Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="rut"
            label="Rut"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
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
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => handleClientChange(e)}
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

export default CreateUserForm;
