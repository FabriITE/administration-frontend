import React from "react";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Paper, Chip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AccountsReceivableTable() {
  const handleSelectMaintenances = (row) => {
    console.log("Seleccionado:", row);
  };

  const columns = [
    { field: "SAN", headerName: "SAN", width: 120 },
    { field: "client", headerName: "Nombre de Cliente", width: 260 },
    { field: "invoice", headerName: "Factura", width: 145 },
    { field: "amount", headerName: "Monto", type: "number", width: 80 },
    { field: "initialDate", headerName: "Fecha Ingreso", width: 120 },
    { field: "dueDate", headerName: "Fecha Vencimiento", width: 140 },
    {
      field: "status",
      headerName: "Estado",
      width: 90,
      renderCell: (params) => {
        const status = params.value;
        let color = "";
        let textColor = "#fff";

        switch (status) {
          case "Pagado":
            color = "#1aa51fff";
            break;
          case "Pendiente":
            color = "#ff9800";
            break;
          case "Vencido":
            color = "#ef2213ff";
            break;
          default:
            color = "#9e9e9e";
        }
        return (
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: color,
              color: textColor,
              fontWeight: "bold",
              width: "88px",
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => (
        <Box
          sx={{
            width: "65%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => handleSelectMaintenances(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleSelectMaintenances(params.row)}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      SAN: "8098412",
      client: "MARCO DANIEL HIDALGO BRENES",
      invoice: "FAC-001",
      amount: 35000,
      initialDate: "2025-11-01",
      dueDate: "2025-11-20",
      status: "Vencido",
    },
  ];

  return (
    <Paper
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        width: "86%",
        height: 600,
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiDataGrid-cell": {
            alignItems: "center",
          },
        }}
      />
    </Paper>
  );
}
