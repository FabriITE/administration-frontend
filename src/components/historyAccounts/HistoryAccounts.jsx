import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import FileCard from "../FileCard";
import { useSelector } from "react-redux";

export default function HistoryAccounts() {
  const selectedClient = useSelector(
    (state) => state.clients.clientPaymentHistory
  );

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const payments = selectedClient;

  const handleOpenDialog = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  const handleDownload = (file) => {
    window.open(file.file_url, "_blank");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isPaymentComplete = (paymentDate) => !!paymentDate;

  return (
    <Box
      sx={{
        width: "98%",
        mb: 4,
      }}
    >
      {payments.length > 0 ? (
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            ml: "10px",
            justifyContent: "center",
            alignContent: "center",
          }}
          spacing={4}
        >
          {payments.map((payment) => (
            <Grid size={3.4} key={payment.payment_id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderLeft: "solid 4px #b2b4b6ff",
                  "&:hover": {
                    borderLeft: "solid 4px #103b56",
                    transform: "translateY(-8px)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardHeader
                  title={`Pago #${payment.payment_id}`}
                  subheader={formatDate(payment.created_at)}
                  sx={{
                    "& .MuiCardHeader-subheader": {
                      fontSize: "0.85rem",
                    },
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.9,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="textSecondary">
                      Monto
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        background:
                          "linear-gradient(135deg, #000415ff 0%, #000000ff 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ${Number.parseFloat(payment.amount).toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Chip
                      label={`${payment.payment_months} mes${
                        payment.payment_months > 1 ? "es" : ""
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {payment.notes && (
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        borderLeft: "3px solid #103b56",
                        bgcolor: "#f9f9f9",
                        rowGap: 1,
                        overflow: "auto",
                        maxHeight: "50px",
                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Notas
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 0.5, fontStyle: "italic" }}
                      >
                        "{payment.notes || "Sin notas"}"
                      </Typography>
                    </Box>
                  )}
                  {payment.files && payment.files.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 1,
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <AttachFileIcon
                        sx={{ fontSize: "1.2rem", color: "primary.main" }}
                      />

                      <Typography variant="caption" sx={{ flex: 1 }}>
                        {payment.files.length} archivo
                        {payment.files.length > 1 ? "s" : ""} adjunto
                        {payment.files.length > 1 ? "s" : ""}
                      </Typography>

                      <IconButton
                        onClick={() => toggleExpand(payment.payment_id)}
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
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 1.9,
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontStyle: "italic" }}
                      >
                        No hay archivos adjuntos
                      </Typography>
                    </Box>
                  )}

                  <Collapse
                    in={expandedCard === payment.payment_id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Archivos adjuntos:
                      </Typography>

                      {payment.files && payment.files.length > 0 ? (
                        payment.files.map((file, index) => (
                          <Box key={index}>
                            <FileCard
                              file={file}
                              index={index}
                              type="view"
                              handleDelete={() => {}}
                            />
                          </Box>
                        ))
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "center",
                            color: "text.secondary",
                            fontStyle: "italic",
                          }}
                        >
                          No hay archivos adjuntos
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}></Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            width: "100%",
            margin: "auto",
          }}
        >
          <CardContent>
            <Box sx={{ fontSize: "3rem", mb: 2 }}>📭</Box>
            <Typography color="textSecondary">
              No hay pagos registrados
            </Typography>
          </CardContent>
        </Box>
      )}
    </Box>
  );
}
