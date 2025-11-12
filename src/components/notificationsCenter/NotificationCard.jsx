import { Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatRelative } from "date-fns";

import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { markNotificationAsRead } from "../../utils/api";
import ReplyIcon from "@mui/icons-material/Reply";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
// import { useNotifications } from "../../hooks/notifications/useNotifications";

const notificationBgColor = {
  newVehicle: "rgba(38, 142, 207, 0.15)",
  newRequest: "rgba(0, 255, 45, 0.15)",
  approveRequest: "rgba(0, 255, 45, 0.15)",
  denegateRequest: "rgba(0, 255, 45, 0.15)",
  newMaintenence: "rgba(0, 255, 45, 0.15)",
  completeMaintenence: "rgba(0, 255, 45, 0.15)",
};
const dotBgColor = {
  newVehicle: "rgba(38, 142, 207, 1)", // Azul - algo nuevo agregado
  newRequest: "rgba(255, 193, 7, 1)", // Amarillo fuerte - solicitud pendiente
  approveRequest: "rgba(76, 175, 80, 1)", // Verde - aprobado
  denegateRequest: "rgba(244, 67, 54, 1)", // Rojo - denegado
  newMaintenence: "rgba(33, 150, 243, 1)", // Azul claro - mantenimiento iniciado
  completeMaintenence: "rgba(103, 58, 183, 1)", // Morado - mantenimiento finalizado

  inspectionPending: "rgba(255, 140, 0, 1)", // naranja
  inspectionInComing: "rgba(255, 193, 7, 1)", // Amarillo fuerte
  inspectionApprove: "rgba(76, 175, 80, 1)", // Verde - aprobado
  inspectionDenegate: "rgba(244, 67, 54, 1)", // Rojo - denegado
};

const DotBgColor = (title) => dotBgColor[title] ?? "#9e9e9e";

export default function NotificationCard({ notification }) {
  const colordot = DotBgColor(notification.notification_type);

  const dateDistance = formatRelative(notification.created_at, new Date(), {
    locale: es,
  });

  const { readNotification, unReadNotification } = useNotifications();

  const handleReadTicket = async () => {
    await readNotification(notification.notification_id);
  };

  const handleUnreadTicket = async () => {
    await unReadNotification(notification.notification_id);
  };

  return (
    <Box
      sx={{
        width: "96.8%",
        height: "125px",
        bgcolor: ` ${"#f2f2f2"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        borderRadius: "5px",
      }}
      elevation={2}
    >
      <Box sx={{ width: "100%", height: "100px", display: "flex" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                backgroundColor: ` ${colordot}`,
                width: "10px",
                height: "10px",
              }}
            />
            <Typography>{notification.title}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "95%", height: "60px" }}>
        <Typography>{notification.description}</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon fontSize="small" />
          <Typography sx={{ "::first-letter": { textTransform: "uppercase" } }}>
            {dateDistance}
          </Typography>
        </Box>

        <Box sx={{}}>
          {notification.is_read ? (
            <IconButton
              sx={{ ":focus": { outlineWidth: "0px" } }}
              onClick={() => handleUnreadTicket()}
            >
              <DoNotDisturbIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ ":focus": { outlineWidth: "0px" } }}
              onClick={() => handleReadTicket()}
            >
              <DoneAllIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}
