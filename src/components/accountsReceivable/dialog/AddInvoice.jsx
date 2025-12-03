import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
// import FileUploadInput from "../../FileUploadInput";

export default function AddInvoice({ open, setOpen }) {
  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{ bgcolor: "#103b56", color: "white", fontWeight: "bold" }}
      >
        Agregar comprobante de pago
      </DialogTitle>
      <DialogContent sx={{ display: "flex" }}>
        <Box sx={{ mt: "6%" }}>
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
          {/* <FileUploadInput /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#103b56" }}>
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
