import React, { useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Paper, Chip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsIcon from "@mui/icons-material/Payments";
import EditOutlinedIcon from "@mui/icons-material/ModeEditOutline";
import DoneIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/CancelOutlined";

import EditAccountsReceivableDlg from "./dialog/EditAccountsReceivableDlg";
import RegisterPaymentDlg from "./dialog/RegisterPaymentDlg";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { addSelectedClient, updateClientField } from "../../features/clients";

export default function AccountsReceivableTable({ filter, search }) {
  const [openInvoiceDlg, setOpenInvoiceDlg] = useState(false);
  const [openEditDlg, setOpenEditDlg] = useState(false);

  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.clients);
  console.log(clients);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleOpenDialogInvoice = (row) => {
    dispatch(addSelectedClient(row));
    setOpenInvoiceDlg(true);
  };

  const handleOpenDialogEdit = (row) => {
    dispatch(addSelectedClient(row));
    setOpenEditDlg(true);
  };
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

  const processRowUpdate = async (newRow, oldRow) => {
    const updatedFields = {};

    for (const key in newRow) {
      if (newRow[key] !== oldRow[key]) {
        updatedFields[key] = newRow[key];
      }
    }

    Object.keys(updatedFields).forEach((field) => {
      dispatch(
        updateClientField({
          id: newRow.client_id,
          field: field,
          value: updatedFields[field],
        })
      );
    });
    console.log(newRow);

    return newRow;
  };

  const handleProcessError = (err) => {
    console.error("Error actualizando fila:", err);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditRow = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveRow = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

  const handleCancelEditRow = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const columns = [
    { field: "san", headerName: "SAN", width: 150, editable: true },

    {
      field: "name",
      headerName: "Nombre de Cliente",
      width: 280,
      editable: false,
    },

    {
      field: "monthly_payment",
      headerName: "Mensualidad",
      type: "number",
      width: 120,
      editable: false,
    },

    {
      field: "is_paid",
      headerName: "¿Pago?",
      width: 90,
      editable: false,
      type: "singleSelect",
      valueOptions: [
        { value: 1, label: "Sí" },
        { value: 0, label: "No" },
      ],
      renderCell: (params) =>
        params.value === 1 ? (
          <CheckIcon sx={{ color: "#1aa51f" }} />
        ) : (
          <CloseIcon sx={{ color: "#ef2213" }} />
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
      editable: true,
      type: "singleSelect",
      valueOptions: ["Activo", "En mora", "Pendiente"],
      renderCell: (params) => {
        const color =
          params.value === "Activo"
            ? "#1aa51f"
            : params.value === "En mora"
            ? "#ff9800"
            : "#ef2213";

        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              bgcolor: color,
              color: "#fff",
              width: 100,
              fontWeight: "bold",
            }}
          />
        );
      },
    },

    {
      field: "description",
      headerName: "Descripción",
      width: 400,
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 110,
      getActions: (params) => {
        const { id } = params;

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<DoneIcon sx={{ color: "green" }} />}
              label="Guardar"
              onClick={handleSaveRow(id)}
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon sx={{ color: "red" }} />}
              label="Cancelar"
              onClick={handleCancelEditRow(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditOutlinedIcon />}
            label="Editar"
            onClick={() => handleOpenDialogEdit(params.row)}
          />,
          <GridActionsCellItem
            key="invoice"
            icon={<MoreHorizIcon />}
            label="Factura"
            onClick={() => handleOpenDialogInvoice(params.row)}
          />,
        ];
      },
    },
  ];

  let filteredRows = clients;
  const searchText = (search || "").toLowerCase();

  if (Array.isArray(clients) && clients.length > 0) {
    filteredRows = clients.filter((row) => {
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
  }

  return (
    <>
      <Paper
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          width: "86%",
          height: 600,
          mx: "auto",
        }}
      >
        <DataGrid
          getRowId={(row) => row.client_id}
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessError}
          sx={{
            width: "100%",
            height: "100%",
            "& .MuiDataGrid-cell": { alignItems: "center" },
          }}
        />
      </Paper>

      <RegisterPaymentDlg open={openInvoiceDlg} setOpen={setOpenInvoiceDlg} />

      <EditAccountsReceivableDlg open={openEditDlg} setOpen={setOpenEditDlg} />
    </>
  );
}
