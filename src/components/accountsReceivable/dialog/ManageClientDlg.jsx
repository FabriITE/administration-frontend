import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GeneralLoader from "../../GeneralLoader";
import { useClients } from "../../../hooks/clients/useClients";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedClient } from "../../../features/clients";
import { errorAlert, successAlert } from "../../alerts/alerts";
import BuildIcon from "@mui/icons-material/Build";

export default function ManageClientDlg({ open, setOpen }) {
  const [action, setAction] = useState("");
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const { manageClientActions } = useClients();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const actions = [
    { value: "reactivation", label: "Reactivación" },
    { value: "suspension", label: "Suspensión" },
    { value: "cancelation", label: "Baja del servicio" },
  ];

  const handleCloseDlg = () => {
    setOpen(false);
    dispatch(clearSelectedClient());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!action) {
      errorAlert("Debe seleccionar una acción", "colored");
      return;
    }

    try {
      setIsLoading(true);
      await manageClientActions({ ...selectedClient, action });
      successAlert("Acción realizada correctamente", "colored");
      handleCloseDlg();
    } catch {
      errorAlert("Error al actualizar estado del cliente", "colored");
      handleCloseDlg();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle
          sx={{
            backgroundColor: "#103b56",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Acciones del cliente
        </DialogTitle>

        <form onSubmit={handleSubmit} id="manageClientForm">
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}
            dividers
          >
            <Grid container spacing={2}>
              <Grid item size={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <BuildIcon />
                  <Typography fontWeight="bold">
                    Seleccione la acción a realizar
                  </Typography>
                </Box>

                <FormControl fullWidth size="small">
                  <InputLabel id="actionLabel">Acción del cliente</InputLabel>
                  <Select
                    labelId="actionLabel"
                    label="Acción del cliente"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  >
                    {actions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        </form>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDlg} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            type="submit"
            form="manageClientForm"
            variant="contained"
            sx={{ backgroundColor: "#103b56" }}
            disabled={isLoading}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading && <GeneralLoader />}
    </>
  );
}
