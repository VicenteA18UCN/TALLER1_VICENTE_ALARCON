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
  initialClient: Client;
  handleClickClose: () => void;
  handleClickUpdate: (client: Client) => void;
}

const EditUserForm = ({
  isOpen,
  initialClient,
  handleClickClose,
  handleClickUpdate,
}: Props) => {
  const [open, setOpen] = React.useState(isOpen);
  const [client, setClient] = React.useState<Client>(initialClient);

  const handleClientChange = (event: any) => {
    console.log(event);
    setClient({ ...client, [event.target.id]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    handleClickClose();
  };
  const handleOnSubmit = () => {
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
