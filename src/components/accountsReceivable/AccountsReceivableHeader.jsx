import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import NewClientDlg from "./dialog/NewClientDlg";

export default function AccountsReceivableHeader() {
  const [open, setOpen] = useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleOpenDialog = async () => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        width: "95%",
        height: "80px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          {" "}
          Cuentas por Cobrar
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          onClick={handleOpenDialog}
          sx={{ bgcolor: "#103b56" }}
          variant="contained"
        >
          Ingreso de cliente
        </Button>
        <NewClientDlg open={open} onClose={handleCloseDialog} />
      </Box>
    </Box>
  );
}
