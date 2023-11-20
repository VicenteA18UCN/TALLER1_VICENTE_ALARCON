import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Client } from "../../app/models/Client";
import agent from "../../app/api/agent";

interface Props {
  isOpen: boolean;
  initialClient: Client;
  handleClickClose: () => void;
}

const EditUserForm = ({ isOpen, initialClient, handleClickClose }: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(initialClient);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClientChange = (event: any) => {
    console.log(event);
    setClient({ ...client, [event.target.id]: event.target.value });
  };

  const handleClickUpdate = (client: Client) => {
    agent.Clients.update(
      client.rut,
      client.name,
      client.lastname,
      client.email,
      client.points
    );
  };
  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  const handleOnSubmit = () => {
    handleClickUpdate(client);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
            type="email"
            fullWidth
            variant="standard"
            value={client.points.toString()}
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

export default EditUserForm;
