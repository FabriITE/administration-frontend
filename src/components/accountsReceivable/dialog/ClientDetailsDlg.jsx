import React, { useEffect, useState } from "react";
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
  Divider,
  CircularProgress,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import MailIcon from "@mui/icons-material/Mail";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useSelector } from "react-redux";
import { useClients } from "../../../hooks/clients/useClients";

export default function ClientDetailsDlg({ open, setOpen, selectedSan }) {
  const { fetchSelectedClient } = useClients();
  const selectedClient = useSelector((state) => state.clients.selectedClient);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !selectedSan) return;

    const loadClient = async () => {
      setLoading(true);
      try {
        await fetchSelectedClient(selectedSan, true);
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [open, selectedSan]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle
        sx={{
          backgroundColor: "#103b56",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Información del cliente
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 2,
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "gray" }} />
          </Box>
        ) : (
          <>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: "8px",
                }}
              >
                <BusinessIcon />
                <Typography fontWeight="bold">Datos del cliente</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre"
                    value={selectedClient?.DisplayName || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre de compañia"
                    value={selectedClient?.CompanyName || "N/A"}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ID QuickBooks"
                    value={selectedClient?.Id || ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Estado"
                    value={
                      selectedClient?.Active === true
                        ? "Activo"
                        : selectedClient?.Active === false
                        ? "Inactivo"
                        : ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: "8px",
                }}
              >
                <MailIcon />
                <Typography fontWeight="bold">Contacto</Typography>
              </Box>

              <TextField
                fullWidth
                size="small"
                label="Correo electrónico"
                value={
                  selectedClient?.PrimaryEmailAddr?.Address || "No definido"
                }
                InputProps={{ readOnly: true }}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: "8px",
                }}
              >
                <AccountBalanceWalletIcon />
                <Typography fontWeight="bold">
                  Información financiera
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Balance"
                    value={selectedClient?.Balance ?? ""}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Moneda"
                    value={
                      selectedClient?.CurrencyRef
                        ? `${selectedClient.CurrencyRef.name} (${selectedClient.CurrencyRef.value})`
                        : ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginBottom: "8px",
                }}
              >
                <CalendarMonthIcon />
                <Typography fontWeight="bold">Fechas</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Fecha de creación"
                    value={
                      selectedClient?.MetaData?.CreateTime
                        ? new Date(
                            selectedClient.MetaData.CreateTime
                          ).toLocaleString()
                        : ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Última actualización"
                    value={
                      selectedClient?.MetaData?.LastUpdatedTime
                        ? new Date(
                            selectedClient.MetaData.LastUpdatedTime
                          ).toLocaleString()
                        : ""
                    }
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => setOpen(false)}
          variant="contained"
          sx={{ backgroundColor: "#103b56" }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
