import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GeneralLoader from "../../GeneralLoader";
import { useClients } from "../../../hooks/clients/useClients";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedClient } from "../../../features/clients";
import { errorAlert, successAlert } from "../../alerts/alerts";

export default function CancelClientDlg({ open, setOpen }) {
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const { markCancelClient } = useClients();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDlg = () => {
    setOpen(false);
    dispatch(clearSelectedClient());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await markCancelClient(selectedClient?.client_id);
      handleCloseDlg();
      setIsLoading(false);
      successAlert("Cliente dado de baja correctamente", "colored");
    } catch {
      handleCloseDlg();
      setIsLoading(false);
      errorAlert("Error al dar de baja el cliente", "colored");
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: "#103b56" }}>
            <Typography variant="h6" color="white" fontWeight="bold">
              Dar de baja
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid size={12} sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Typography variant="body1">
                ¿Está seguro que desea dar de baja este cliente?
              </Typography>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleCloseDlg} variant="outlined" color="error">
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#103b56" }}
              onClick={handleSubmit}
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
