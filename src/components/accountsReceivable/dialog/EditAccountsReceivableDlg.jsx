import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClients } from "../../../hooks/clients/useClients";
import { errorAlert, successAlert } from "../../alerts/alerts";
import GeneralLoader from "../../GeneralLoader";
import { clearSelectedClient } from "../../../features/clients";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import PaymentsIcon from "@mui/icons-material/Payments";
import NotesIcon from "@mui/icons-material/Notes";

export default function EditAccountsReceivableDlg({ open, setOpen }) {
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { editClient } = useClients();

  const handleCloseDlg = () => {
    setOpen(false);
    dispatch(clearSelectedClient());
  };

  const getChangedFields = (formData, originalData) => {
    const changed = {};

    for (const [key, value] of Object.entries(formData)) {
      const originalValue = originalData?.[key];

      const normalizedValue = value === "" ? null : value;
      const normalizedOriginal =
        originalValue === "" || originalValue === undefined
          ? null
          : String(originalValue);

      if (String(normalizedValue) !== String(normalizedOriginal)) {
        changed[key] = value;
      }
    }

    return changed;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const changedFields = getChangedFields(formData, selectedClient);

    if (Object.keys(changedFields).length === 0) {
      successAlert("No se detectaron cambios", "colored");
      handleCloseDlg();
      return;
    }

    changedFields.client_id = selectedClient?.client_id;
    changedFields.qb_customer_id = selectedClient?.qb_customer_id;  

    try {
      setIsLoading(true);
      await editClient({
        changed_fields: changedFields,
        complete_data: { ...formData, client_id: selectedClient?.client_id },
      });
      successAlert("Cliente actualizado correctamente", "colored");
      handleCloseDlg();
    } catch (error) {
      console.error(error);
      errorAlert("Error al actualizar el cliente", "colored");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            backgroundColor: "#103b56",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Editar cliente
        </DialogTitle>

        <form onSubmit={handleSubmit} id="editClientForm">
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}
            dividers
          >
            <Grid container spacing={2}>
              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <FingerprintIcon />
                  <Typography fontWeight="bold">SAN</Typography>
                </Box>
                <TextField
                  size="small"
                  name="san"
                  defaultValue={selectedClient?.san}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PersonIcon />
                  <Typography fontWeight="bold">Nombre del cliente</Typography>
                </Box>
                <TextField
                  size="small"
                  name="name"
                  defaultValue={selectedClient?.name}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PersonIcon />
                  <Typography fontWeight="bold">
                    Nombre de la empresa
                  </Typography>
                </Box>
                <TextField
                  size="small"
                  name="company_name"
                  defaultValue={selectedClient?.company_name}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PaymentsIcon />
                  <Typography fontWeight="bold">Numero de telefono</Typography>
                </Box>
                <TextField
                  size="small"
                  name="phone"
                  defaultValue={selectedClient?.phone}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PaymentsIcon />
                  <Typography fontWeight="bold">Mensualidad</Typography>
                </Box>
                <TextField
                  size="small"
                  name="monthly_payment"
                  defaultValue={selectedClient?.monthly_payment}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item size={12}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <NotesIcon />
                  <Typography fontWeight="bold">Notas</Typography>
                </Box>
                <TextField
                  size="small"
                  name="notes"
                  multiline
                  rows={3}
                  defaultValue={selectedClient?.notes}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
        </form>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="error" onClick={handleCloseDlg}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="editClientForm"
            variant="contained"
            sx={{ backgroundColor: "#103b56" }}
            disabled={isLoading}
          >
            Guardar cambios
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && <GeneralLoader />}
    </>
  );
}
