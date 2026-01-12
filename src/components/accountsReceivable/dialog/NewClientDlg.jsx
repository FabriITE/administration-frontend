import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PlaceIcon from "@mui/icons-material/Place";
import PaymentIcon from "@mui/icons-material/Payment";
import { CalendarMonth, Mail } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import { useForm } from "react-hook-form";
import AutocompleteInput from "../../AutocompleteInput";
import BadgeIcon from "@mui/icons-material/Badge";
import { errorAlert, successAlert } from "../../alerts/alerts";
import { useClients } from "../../../hooks/clients/useClients";
import GeneralLoader from "../../GeneralLoader";

export default function NewClientDlg({ open, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { registerClient } = useClients();

  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDlg = () => {
    onClose(false);
  };

  const [selectedProvincia, setSelectedProvincia] = useState({
    provincia: null,
    idProvincia: null,
  });
  const [selectedCanton, setSelectedCanton] = useState({
    canton: null,
    idCanton: null,
  });
  const errorMessages = {
    DUPLICATE_CLIENT: "Ya existe un cliente con ese nombre",
    QB_ERROR: "Error al crear el cliente en QuickBooks",
    VALIDATION_ERROR: "Datos inválidos, revise el formulario",
    UNAUTHORIZED: "Su sesión expiró, vuelva a iniciar sesión",
    INTERNAL_ERROR: "Error interno del servidor",
  };

  const createCliente = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        ...data,
        provincia: selectedProvincia.provincia,
        idProvincia: selectedProvincia.idProvincia,
        canton: selectedCanton.canton,
        idCanton: selectedCanton.idCanton,
      };
      setIsLoading(true);

      await registerClient(payload);
      reset();
      onClose(true);
      setIsLoading(false);
      successAlert("Cliente agregado correctamente", "colored");
    } catch (err) {
      setIsLoading(false);

      const backendCode = err?.response?.data?.code;

      const message =
        errorMessages[backendCode] ||
        err?.response?.data?.message ||
        "Error al agregar el cliente";

      errorAlert(message, "colored");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        scroll="paper"
      >
        <form onSubmit={createCliente}>
          <DialogTitle
            sx={{
              backgroundColor: "#103b56",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Crear cliente
          </DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 2,
              maxHeight: "70vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: "6px" },
            }}
          >
            {/* ===== NOMBRE ===== */}
            <Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ display: "flex", width: "50%", gap: 1 }}>
                  <BadgeIcon />
                  <Typography fontWeight="bold">Nombre del cliente</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <BusinessIcon />
                  <Typography fontWeight="bold">
                    Nombre de la empresa
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    name="display_name"
                    required
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre de la empresa"
                    name="company_name"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* ===== DATOS GENERALES ===== */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FingerprintIcon />
                <Typography fontWeight="bold">
                  Datos generales del cliente
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Número de teléfono"
                    name="phone_number"
                    required
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="SAN"
                    name="san"
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {/* ===== CORREOS ===== */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Mail />
                <Typography fontWeight="bold">Correo electrónico</Typography>
              </Box>

              <TextField
                label="Correo Electrónico personal"
                name="email"
                type="email"
                fullWidth
                size="small"
                required
              />

              <TextField
                label="Correo Electrónico empresarial"
                name="company_email"
                type="email"
                fullWidth
                size="small"
              />
            </Box>

            {/* ===== UBICACIÓN ===== */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PlaceIcon />
                <Typography fontWeight="bold">Ubicación</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <AutocompleteInput
                    control={control}
                    type="provincia"
                    text="Provincia"
                    defaultPlace={selectedProvincia}
                    onChange={setSelectedProvincia}
                  />
                </Grid>

                <Grid size={6}>
                  <AutocompleteInput
                    control={control}
                    type="canton"
                    text="Cantón"
                    defaultPlace={selectedCanton}
                    onChange={setSelectedCanton}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* ===== FECHA ===== */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarMonth />
                <Typography fontWeight="bold">Fecha de instalación</Typography>
              </Box>

              <TextField
                name="start_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                required
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
            </Box>

            {/* ===== PAGO ===== */}
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PaymentIcon />
                <Typography fontWeight="bold">Pago</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  name="payment_months"
                  label="Meses pagados"
                  size="small"
                  type="number"
                  required
                />

                <TextField
                  fullWidth
                  name="monthly_payment"
                  label="Mensualidad"
                  size="small"
                  type="number"
                  inputProps={{ step: "0.01", min: 0 }}
                  required
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
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

      {isLoading && <GeneralLoader />}
    </>
  );
}
