import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddInvoice from "./AddInvoice";
import NotesIcon from "@mui/icons-material/Notes";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FileUploadInput from "../../FileUploadInput";
import { CalendarMonth, Payments } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useClients } from "../../../hooks/clients/useClients";
import { errorAlert, successAlert } from "../../alerts/alerts";
import GeneralLoader from "../../GeneralLoader";

export default function RegisterPaymentDlg({ open, setOpen }) {
  const [openAddInvoiceDlg, setOpenAddInvoiceDlg] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const { registerClientPayment } = useClients();
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDlg = () => {
    setOpen(false);
  };

  const handleRegisterPay = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const payload = {
      client_id: selectedClient.client_id,
      payment_date: selectedClient.payment_date,
      ...data,
      files: files,
    };

    try {
      setIsLoading(true);
      await registerClientPayment(payload);
      successAlert("Pago registrado correctamente", "colored");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      errorAlert("Error al registrar el pago", "colored");
      setIsLoading(false);
    }
    handleCloseDlg();
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
          Registrar pago
        </DialogTitle>

        <form onSubmit={handleRegisterPay} id="registerPayForm">
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}
            dividers
          >
            <Grid container spacing={2}>
              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <DateRangeIcon />
                  <Typography fontWeight="bold">Meses pagados</Typography>
                </Box>

                <TextField
                  name="payment_months"
                  label="Meses pagados"
                  fullWidth
                  size="small"
                  type="number"
                />
              </Grid>

              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <CalendarMonth />
                  <Typography fontWeight="bold">Fecha del pago</Typography>
                </Box>

                <TextField
                  name="payment_register_date"
                  type="date"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  onClick={(e) =>
                    e.currentTarget.querySelector("input")?.showPicker?.()
                  }
                  sx={{
                    backgroundColor: "white",
                    "& input[type='date']::-webkit-calendar-picker-indicator": {
                      filter: "invert(50%)",
                      cursor: "pointer",
                    },
                  }}
                />
              </Grid>
              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Payments />
                  <Typography fontWeight="bold">Monto pagado</Typography>
                </Box>

                <TextField
                  name="amount"
                  label="Monto pagado"
                  fullWidth
                  size="small"
                  type="number"
                  inputProps={{ step: "0.01", min: 0 }}
                />
              </Grid>
              <Grid item size={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <NotesIcon />
                  <Typography fontWeight="bold">Notas</Typography>
                </Box>

                <TextField name="notes" label="Notas" fullWidth size="small" />
              </Grid>
            </Grid>

            <Box>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>
                Adjuntar comprobantes
              </Typography>
              <FileUploadInput
                files={files}
                setFiles={setFiles}
                destinyFolder={"Pagos_clientes"}
                filesType={"Pagos_clientes"}
                filesToDelete={filesToDelete}
                setFilesToDelete={setFilesToDelete}
              />
            </Box>
          </DialogContent>
        </form>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDlg} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            type="submit"
            form="registerPayForm"
            variant="contained"
            sx={{ backgroundColor: "#103b56" }}
          >
            Guardar
          </Button>
        </DialogActions>

        <AddInvoice open={openAddInvoiceDlg} setOpen={setOpenAddInvoiceDlg} />
      </Dialog>
      {isLoading && <GeneralLoader />}
    </>
  );
}
