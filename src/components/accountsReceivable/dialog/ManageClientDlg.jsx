import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
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
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

export default function ManageClientDlg({ open, setOpen }) {
  const [action, setAction] = useState("");
  const selectedClient = useSelector((state) => state.clients.selectedClient);

  const { manageClientActions } = useClients();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDlg = () => {
    setOpen(false);
    dispatch(clearSelectedClient());
  };

  const actions = [
    { value: "reactivation", label: "Reactivación" },
    { value: "suspension", label: "Suspensión" },
    { value: "cancelation", label: "Baja del servicio" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!action) {
      errorAlert("Debe seleccionar una acción", "colored");
      return;
    }

    try {
      setIsLoading(true);
      await manageClientActions({ ...selectedClient, action: action });
      handleCloseDlg();
      setIsLoading(false);
      successAlert("Acción realizada correctamente", "colored");
    } catch {
      handleCloseDlg();
      setIsLoading(false);
      errorAlert("Error al actualizar estado del cliente", "colored");
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              height: "35px",
              bgcolor: "#103b56",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold">
              Acciones al cliente{" "}
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ px: "6%" }} dividers>
            <Grid sx={{ mt: "2%" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  alignContent: "center",
                  display: "flex",
                }}
              >
                {" "}
                Seleccione la acción que desea realizar
              </Typography>
            </Grid>
            <Grid sx={{ pt: "6%" }}>
              <FormControl fullWidth>
                <InputLabel id="actionLabel">Seleccione la accion</InputLabel>
                <Select
                  labelId="actionLabel"
                  label="Seleccione la accion"
                  fullWidth
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
          </DialogContent>
          <DialogActions sx={{ px: 2 }}>
            <Button onClick={handleCloseDlg} variant="outlined" color="error">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#103b56" }}
              disabled={isLoading}
            >
              Confirmar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {isLoading && <GeneralLoader />}
    </>
  );
}
