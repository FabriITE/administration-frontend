import React, { useState } from "react";
import { Drawer, IconButton, Divider, Box, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavigationMenu from "./NavigationMenu";
import "./sideBarStyles.css";
import { useSelector, useDispatch } from "react-redux";
// import UserAvatar from "./UserAvatar";
import logo from "../../../src/assets/logo-white.webp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsCenter from "../notificationsCenter/NotificationsCenter";

const drawerWidth = 245;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "rebeccapurple",
});

function MenuDrawer({ handleDrawerState, open }) {
  // const [openNotifications, setOpenNotification] = useState(false);
  // const dispatch = useDispatch();
  // const notifications = useSelector((state) => state.notifications);

  // const handleNotificationsState = () => {
  //   if (!openNotifications) {
  //   }
  //   setOpenNotification(!openNotifications);
  // };

  return (
    <Box sx={{ width: drawerWidth + 33 }}>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "#191a22",
            justifyContent: "space-between",
            width: drawerWidth,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
          },
        }}
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 190,
              height: 90,
            }}
          />
          <Divider
            style={{ backgroundColor: "#fff", height: "1px" }}
            variant="middle"
          />
          <Box>
            <IconButton
              // onClick={handleNotificationsState}
              sx={{ color: "#000", ":focus": { outline: "none" } }}
              size="large"
            >
              <Badge
                // badgeContent={notifications.unreadNotifications.length}
                color="error"
              >
                <NotificationsIcon
                  sx={{ color: "white", width: "28px", height: "28px" }}
                />
              </Badge>
            </IconButton>
          </Box>
        </DrawerHeader>
        <NavigationMenu />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
            width: "100%",
          }}
        >
          {/* <UserAvatar /> */}
        </Box>
      </Drawer>
      <NotificationsCenter
        // open={openNotifications}
        // handleCloseCenter={handleNotificationsState}
      />
    </Box>
  );
}

export default MenuDrawer;
