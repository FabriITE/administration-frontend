import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useSelector } from "react-redux";
import { editClientInfo } from "../../../utils/api";
import { useClients } from "../../../hooks/clients/useClients";
import { errorAlert, successAlert } from "../../alerts/alerts";

export default function EditAccountsReceivableDlg({ open, setOpen }) {
  const selectedClient = useSelector((state) => state.clients.selectedClient);

  const { editClient } = useClients();

  const handleCloseDlg = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.client_id = selectedClient?.client_id;

    try {
      await editClient(data);
      successAlert("Cliente actualizado correctamente", "colored");
    } catch (error) {
      console.error("Error updating client data:", error);
      errorAlert("Error al actualizar el cliente", "colored");
    } finally {
      handleCloseDlg();
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "#103b56",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Editar cliente
        </Typography>
        <IconButton sx={{ color: "white" }} onClick={handleCloseDlg}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                name="san"
                label="SAN"
                value={selectedClient?.san}
                fullWidth
                required
              />
            </Grid>

            <Grid size={12}>
              <TextField
                name="name"
                label="Nombre del cliente"
                value={selectedClient?.name}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="start_date"
                label="Fecha de inicio"
                type="date"
                value={selectedClient?.start_date}
                onClick={(e) =>
                  e.currentTarget.querySelector("input")?.showPicker?.()
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="invoice_date"
                label="Fecha de envío factura"
                type="date"
                onClick={(e) =>
                  e.currentTarget.querySelector("input")?.showPicker?.()
                }
                value={selectedClient?.invoice_date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="payment_date"
                label="Fecha límite de pago"
                type="date"
                onClick={(e) =>
                  e.currentTarget.querySelector("input")?.showPicker?.()
                }
                value={selectedClient?.payment_date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                name="suspension_date"
                label="Fecha de suspensión"
                type="date"
                onClick={(e) =>
                  e.currentTarget.querySelector("input")?.showPicker?.()
                }
                value={selectedClient?.suspension_date}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>

            <Grid size={12}>
              <TextField
                name="monthly_payment"
                label="Mensualidad"
                type="number"
                value={selectedClient?.monthly_payment}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end" }}>
          <Button onClick={handleCloseDlg} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#103b56" }}
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
