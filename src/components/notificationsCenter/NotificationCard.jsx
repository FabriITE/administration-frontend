import {
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { formatRelative } from "date-fns";
import { es } from "date-fns/locale";
import { useNotifications } from "../../hooks/notifications/useNotifications";

const dotBgColor = {
  newVehicle: "#268ECF",
  newRequest: "#FFC107",
  approveRequest: "#4CAF50",
  denegateRequest: "#F44336",
  newMaintenence: "#2196F3",
  completeMaintenence: "#673AB7",
};

const DotBgColor = (type) => dotBgColor[type] ?? "#9E9E9E";

export default function NotificationCard({ notification }) {
  const color = DotBgColor(notification.notification_type);

  const dateDistance = formatRelative(
    new Date(notification.created_at),
    new Date(),
    { locale: es }
  );

  const { readNotification, unReadNotification } = useNotifications();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: notification.is_read ? "#f5f5f5" : "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        borderLeft: `4px solid ${color}`,
        transition: "all .2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* Contenido */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ mb: 0.5 }}
        >
          {notification.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {notification.description}
        </Typography>

        {/* Fecha */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <AccessTimeIcon fontSize="small" />
          <Typography
            variant="caption"
            sx={{ "::first-letter": { textTransform: "uppercase" } }}
          >
            {dateDistance}
          </Typography>
        </Box>
      </Box>

      {/* Acción */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {notification.is_read ? (
          <IconButton onClick={() => unReadNotification(notification.notification_id)}>
            <DoNotDisturbIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => readNotification(notification.notification_id)}>
            <DoneAllIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
