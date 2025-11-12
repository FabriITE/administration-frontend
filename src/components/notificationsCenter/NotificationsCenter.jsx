import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotificationCard from "./NotificationCard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
// import { changeNotificationsFilter } from "../../features/notifications";
// import { useNotifications } from "../../hooks/notifications/useNotifications";

export default function NotificationsCenter({ open, handleCloseCenter }) {
  // const dispatch = useDispatch();
  // const notifications = useSelector((state) => state.notifications);
  // const notificationsFilter = useSelector(
  //   (state) => state.notifications.notificationsFilter
  // );
  // const { markAsReadAllNotifications } = useNotifications();

  // const changeFilters = (e) => {
  //   dispatch(changeNotificationsFilter(e));
  // };

  // const handleReadAll = () => {
  //   markAsReadAllNotifications();
  // };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleCloseCenter}
      PaperProps={{ sx: { width: 480, p: 2 } }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <NotificationsNoneIcon fontSize="medium" />
          <Typography fontSize={22}>Notificaciones</Typography>
        </Box>
        <IconButton
          sx={{ ":focus": { outlineWidth: "0" } }}
          onClick={handleCloseCenter}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            bgcolor: "#f2f2f2",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          <Button
            sx={{
              width: "48%",
              padding: "0px",
              height: "30px",
              // ":focus": { outlineWidth: 0 },
              // bgcolor:
              //   notificationsFilter == "unread" ? "#103B56" : "transparent",
              // color: notificationsFilter == "read" ? "#103B56" : "#fff",
            }}
            value={"unread"}
            // variant={notificationsFilter == "unread" ? "contained" : "text"}
            onClick={(e) => changeFilters(e.currentTarget.value)}
          >
            No leídos
          </Button>
          <Button
            sx={{
              width: "48%",
              padding: "0px",
              height: "30px",
              ":focus": { outlineWidth: 0 },
              // bgcolor:
              //   notificationsFilter == "read" ? "#103B56" : "transparent",
              // color: notificationsFilter == "unread" ? "#103B56" : "#fff",
            }}
            value={"read"}
            // variant={notificationsFilter == "read" ? "contained" : "text"}
            onClick={(e) => changeFilters(e.currentTarget.value)}
          >
            leídos
          </Button>
        </Box>
        {/* <Box sx={{ width: "50%", display: "flex", justifyContent: "end" }}>
          {notificationsFilter == "unread" && (
            <Button
              sx={{
                width: "45%",
                height: "40px",
                padding: 0,
                color: "#103B56",
                ":focus": { outlineWidth: 0 },
              }}
              variant="text"
              onClick={() => handleReadAll()}
            >
              Leer todo
            </Button>
          )}
        </Box> */}
      </Box>
      <Divider />
      <Box sx={{ mt: 2, height: "82%" }}>
        {/* <Box
          sx={{
            width: "100%",
            gap: "10px",
            height: "95%",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
        >
          {notifications[
            notificationsFilter == "unread"
              ? "unreadNotifications"
              : "readNotifications"
          ].map((notification, index) => (
            <NotificationCard
              key={`notification-${index}`}
              notification={notification}
              index={index}
            />
          ))}
        </Box> */}
      </Box>
    </Drawer>
  );
}
