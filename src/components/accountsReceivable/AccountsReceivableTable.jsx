import React, { useState, useMemo } from "react";
import { Paper, Chip, Typography, Box } from "@mui/material";
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  QuickFilter,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/ModeEditOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryIcon from "@mui/icons-material/History";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import EditAccountsReceivableDlg from "./dialog/EditAccountsReceivableDlg";
import RegisterPaymentDlg from "./dialog/RegisterPaymentDlg";

import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { addSelectedClient } from "../../features/clients";
import { useNavigate } from "react-router-dom";
import { routes } from "../../models/routes";
import ManageClientDlg from "./dialog/ManageClientDlg";

export default function AccountsReceivableTable({ filter, search }) {
  const [openInvoiceDlg, setOpenInvoiceDlg] = useState(false);
  const [openEditDlg, setOpenEditDlg] = useState(false);
  const [openCancelClientDlg, setOpenCancelClientDlg] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);

  const formatDate = (str) => {
    if (!str) return "";
    try {
      const utc = new Date(str);
      const localDate = new Date(
        utc.getUTCFullYear(),
        utc.getUTCMonth(),
        utc.getUTCDate()
      );
      return format(localDate, "dd/MM/yyyy");
    } catch {
      return "";
    }
  };

  const columns = useMemo(
    () => [
      { field: "san", headerName: "SAN", width: 150 },
      { field: "name", headerName: "Nombre de Cliente", width: 280 },
      {
        field: "monthly_payment",
        headerName: "Mensualidad",
        type: "number",
        width: 120,
      },
      {
        field: "is_paid",
        headerName: "¿Pago?",
        width: 90,
        renderCell: (params) =>
          params.value === 1 ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckIcon sx={{ color: "#1aa51f" }} />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CloseIcon sx={{ color: "#ef2213" }} />
            </Box>
          ),
      },
      {
        field: "start_date",
        headerName: "Fecha inicio",
        width: 150,
        renderCell: ({ row }) => formatDate(row?.start_date),
      },
      {
        field: "invoice_date",
        headerName: "Envío de factura",
        width: 160,
        renderCell: ({ row }) => formatDate(row?.invoice_date),
      },
      {
        field: "payment_date",
        headerName: "Fecha pago",
        width: 150,
        renderCell: ({ row }) => formatDate(row?.payment_date),
      },
      {
        field: "suspension_date",
        headerName: "Suspensión",
        width: 160,
        renderCell: ({ row }) => formatDate(row?.suspension_date),
      },
      {
        field: "status",
        headerName: "Estado",
        width: 120,
        renderCell: (params) => {
          const color =
            params.value == "Activo"
              ? "#1aa51f"
              : params.value == "En Mora"
              ? "#ff9800"
              : params.value == "Pendiente de reactivacion"
              ? "#2F5D8A"
              : params.value == "Pendiente de suspension"
              ? "#E0B83F"
              : "#ef2213";

          return (
            <Chip
              label={params.value || "No se pudo recolectar"}
              size="small"
              sx={{
                bgcolor: color,
                color: "#fff",
                width: "auto",
                fontWeight: "bold",
              }}
            />
          );
        },
      },
      {
        field: "notes",
        headerName: "Notas",
        width: 400,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        width: 150,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditOutlinedIcon />}
            label="Editar"
            title="Editar"
            onClick={() => {
              dispatch(addSelectedClient(params.row));
              setOpenEditDlg(true);
            }}
          />,
          <GridActionsCellItem
            icon={<ReceiptLongIcon />}
            label="Registrar pago"
            title="Registrar pago"
            onClick={() => {
              dispatch(addSelectedClient(params.row));
              setOpenInvoiceDlg(true);
            }}
          />,
          <GridActionsCellItem
            icon={<HistoryIcon />}
            label="Historial"
            title="Historial de pagos"
            onClick={() => {
              dispatch(addSelectedClient(params.row));
              navigate(`${routes.clientHistory.parentRoute}/${params.row.san}`);
            }}
          />,
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Mas Acciones"
            title="Mas Acciones"
            onClick={() => {
              dispatch(addSelectedClient(params.row));
              setOpenCancelClientDlg(true);
            }}
          />,
        ],
      },
    ],
    []
  );

  function CustomToolbar() {
    return (
      <Toolbar>
        <QuickFilter />
      </Toolbar>
    );
  }
  const filteredRows = useMemo(() => {
    if (!Array.isArray(clients)) return [];
    const searchText = (search || "").toLowerCase();

    return clients.filter((row) => {
      const name = (row.name || "").toLowerCase();
      const san = (row.san || "").toLowerCase();
      const notes = (row.notes || "").toLowerCase();
      const isPaid = Number(row.is_paid);

      const matchSearch =
        name.includes(searchText) ||
        san.includes(searchText) ||
        notes.includes(searchText);

      let matchFilter = true;
      if (filter === "Pagados") matchFilter = isPaid === 1;
      else if (filter === "Por cobrar") matchFilter = isPaid === 0;

      return matchSearch && matchFilter;
    });
  }, [clients, search, filter]);

  return (
    <>
      <Paper
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          width: "86%",
          height: 550,
          mx: "auto",
        }}
      >
        <DataGrid
          getRowId={(row) => row.client_id}
          slots={{ toolbar: CustomToolbar }}
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          sx={{
            width: "100%",
            height: "100%",
            "& .MuiDataGrid-toolbarContainer": {
              padding: 1,
              borderBottom: "1px solid #e0e0e0",
            },
          }}
        />
      </Paper>

      <RegisterPaymentDlg open={openInvoiceDlg} setOpen={setOpenInvoiceDlg} />
      <EditAccountsReceivableDlg open={openEditDlg} setOpen={setOpenEditDlg} />
      <ManageClientDlg
        open={openCancelClientDlg}
        setOpen={setOpenCancelClientDlg}
      />
    </>
  );
}
