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
import { CalendarMonth } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import AutocompleteInput from "../../AutocompleteInput";
import { createClient } from "../../../utils/api";
import { errorAlert, successAlert } from "../../alerts/alerts";

export default function NewClientDlg({ open, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

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

  const createCliente = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        name: data.name,
        san: data.san,
        provincia: selectedProvincia.provincia,
        idProvincia: selectedProvincia.idProvincia,
        canton: selectedCanton.canton,
        idCanton: selectedCanton.idCanton,
        start_date: data.start_date,
      };

      const x = await createClient(payload);
      reset();
      onClose(true);
      successAlert("Cliente agregado correctamente", "colored");
    } catch (err) {
      console.log(err);
      errorAlert("Error al agregar el cliente", "colored");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
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
          sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <FingerprintIcon />
              <Box sx={{ mt: "2%" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Identificación
                </Typography>
              </Box>
            </Box>
            <Grid
              sx={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
              }}
              container
              spacing={2}
            >
              <Grid item size={6}>
                <TextField fullWidth size="small" label="Nombre" name="name" />
              </Grid>
              <Grid item size={6}>
                <TextField fullWidth size="small" label="SAN" name="san" />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <PlaceIcon />
              <Typography variant="subtitle1" fontWeight="bold">
                Ubicación
              </Typography>
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

          <Divider />

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <CalendarMonth />

              <Typography variant="subtitle1" fontWeight="bold">
                Fecha de instalacion
              </Typography>
            </Box>
            <Box
              sx={{ width: " 100%", marginLeft: "auto", marginRight: "auto" }}
            >
              <TextField
                name="start_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                variant="outlined"
                onClick={(e) =>
                  e.currentTarget.querySelector("input")?.showPicker?.()
                }
                required
                sx={{
                  backgroundColor: "white",
                  "& input[type='date']::-webkit-calendar-picker-indicator": {
                    filter: "invert(50%)",
                    cursor: "pointer",
                  },
                }}
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
  );
}
