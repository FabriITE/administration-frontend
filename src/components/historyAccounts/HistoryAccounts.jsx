import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Divider,
  Collapse,
  CardContent,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Receipt } from "lucide-react";
import { useSelector } from "react-redux";
import FileCard from "../FileCard";

export default function HistoryAccounts() {
  const payments = useSelector((state) => state.clients.clientPaymentHistory);

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      {payments.length > 0 ? (
        <Grid container justifyContent="center" spacing={3}>
          {payments.map((payment) => (
            <Grid item xs={12} md={10} key={payment.payment_id}>
              <Box
                sx={{
                  bgcolor: "white",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: 2,
                  p: 2,
                  transition: "0.2s",
                  "&:hover": {
                    borderLeft: "solid 4px #103b56",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography fontWeight={600}>
                      Pago #{payment.payment_id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(payment.created_at)}
                    </Typography>
                  </Box>

                  <Typography variant="h6" fontWeight={700} color="primary">
                    ${Number(payment.amount).toFixed(2)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={`${payment.payment_months} mes${
                      payment.payment_months > 1 ? "es" : ""
                    }`}
                    size="small"
                    variant="outlined"
                  />

                  {payment.notes && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      “{payment.notes}”
                    </Typography>
                  )}

                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AttachFileIcon fontSize="small" color="action" />
                    <Typography variant="caption">
                      {payment.files?.length || 0} archivo(s)
                    </Typography>

                    {payment.files?.length > 0 && (
                      <IconButton
                        onClick={() => toggleExpand(payment.payment_id)}
                        sx={{ height: "20px", width: "20px" }}
                      >
                        <KeyboardArrowDown
                          sx={{
                            transform:
                              expandedCard === payment.payment_id
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "0.3s",
                          }}
                        />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                <Collapse
                  in={expandedCard === payment.payment_id}
                  timeout="auto"
                  unmountOnExit
                >
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Archivos adjuntos:
                    </Typography>

                    {payment.files?.map((file, index) => (
                      <FileCard
                        key={index}
                        file={file}
                        index={index}
                        type="view"
                        handleDelete={() => {}}
                      />
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CardContent>
            <Box sx={{ fontSize: "3rem", mb: 2 }}>
              <Receipt />
            </Box>
            <Typography variant="h6" fontWeight="bold">
              No hay pagos registrados
            </Typography>
          </CardContent>
        </Box>
      )}
    </Box>
  );
}