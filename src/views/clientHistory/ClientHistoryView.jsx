import React, { useEffect } from "react";
import HistoryAccounts from "../../components/historyAccounts/HistoryAccounts";
import { Box, IconButton, Typography } from "@mui/material";
import HistoryAccountsResume from "../../components/historyAccounts/HistoryAccountsResume";
import { MoveLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClients } from "../../hooks/clients/useClients";

export default function ClientHistoryView() {
  const navigate = useNavigate();
  const selectedClient = useSelector((state) => state.clients.selectedClient);
  const { san } = useParams();
  const { fetchSelectedClient, fecthPaymentHistory } = useClients();

  useEffect(() => {
    fetchSelectedClient(san);
  }, []);

  useEffect(() => {
    if (selectedClient) {
      fecthPaymentHistory(selectedClient.client_id);
    }
  }, [selectedClient]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "98%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "auto",
            height: "10%",
            display: "flex",
            alignItems: "center",
            py: "6px",
          }}
        >
          <Box>
            <IconButton onClick={() => navigate("/")}>
              <MoveLeft />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Historial de pagos
          </Typography>
        </Box>
        <Box>
          <HistoryAccountsResume />
        </Box>
        <Box
          sx={{
            width: "100%",
            pt: 2,
          }}
        >
          <HistoryAccounts />
        </Box>
      </Box>
    </Box>
  );
}
