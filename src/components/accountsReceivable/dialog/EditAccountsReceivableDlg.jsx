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
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClients } from "../../../hooks/clients/useClients";
import { errorAlert, successAlert } from "../../alerts/alerts";
import GeneralLoader from "../../GeneralLoader";
import { clearSelectedClient } from "../../../features/clients";

export default function EditAccountsReceivableDlg({ open, setOpen }) {
  const selectedClient = useSelector((state) => state.clients.selectedClient);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { editClient } = useClients();

  const handleCloseDlg = () => {
    setOpen(false);
    dispatch(clearSelectedClient());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.client_id = selectedClient?.client_id;

    try {
      setIsLoading(true);
      await editClient(data);
      successAlert("Cliente actualizado correctamente", "colored");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating client data:", error);
      errorAlert("Error al actualizar el cliente", "colored");
      setIsLoading(false);
    } finally {
      handleCloseDlg();
      setIsLoading(false);
    }
  };

  return (
    <>
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
                  defaultValue={selectedClient?.san}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="name"
                  label="Nombre del cliente"
                  defaultValue={selectedClient?.name}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={6}>
                <Select
                  name="status"
                  label="Estado"
                  defaultValue={selectedClient?.status}
                  fullWidth
                  required
                >
                  <MenuItem value={"Activo"}>Activo</MenuItem>
                  <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
                  <MenuItem value={"En mora"}>En mora</MenuItem>
                </Select>
              </Grid>

              <Grid size={6}>
                <TextField
                  name="monthly_payment"
                  label="Mensualidad"
                  type="boolean"
                  defaultValue={selectedClient?.monthly_payment}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="notes"
                  label="Notas"
                  defaultValue={selectedClient?.notes}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button>
            <Button
              sx={{ bgcolor: "#103b56" }}
              variant="contained"
              type="submit"
            >
              Guardar Cambios
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {isLoading && <GeneralLoader />}
    </>
  );
}
