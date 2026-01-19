import React, { useState, useRef } from "react";
import {
  Avatar,
  Popper,
  Paper,
  Button,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

export default function UserAvatar() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleEnter = () => setOpen(true);
  const handleLeave = () => setOpen(false);

  const session = useSelector((state) => state.session);

  const handleRedirect = () => {
    window.location = "https://itellumsat.com/";
  };

  return (
    <Box sx={{ position: "relative", mb: 1 }}>
      <Paper
        ref={anchorRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "205px",
          height: "50px",
          bgcolor: "#2E2E3A",
          color: "white",
          borderRadius: 2,
          cursor: "pointer",
          justifyContent: "center",
          gap: "8px",
          padding: "3px",
        }}
      >
        <Avatar sx={{ bgcolor: "#963EB6", width: 30, height: 30 }}></Avatar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "155px",
            overflow: "hidden",
          }}
        >
          <Typography
            fontSize={"14px"}
            margin={0}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
          >
            {session?.username}
          </Typography>
          <Typography variant="caption" margin={0} color="#1C9DD9">
            {session?.role}
          </Typography>
        </Box>
      </Paper>

      <Popper
        open={true}
        anchorEl={anchorRef.current}
        placement="top-start"
        disablePortal
        modifiers={[{ name: "flip", enabled: false }]}
        style={{ zIndex: 1300 }}
      >
        <Collapse in={open}>
          <Paper
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            sx={{
              bgcolor: "#2E2E3A",
              borderRadius: 1,
              boxShadow: 3,
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleRedirect()}
              startIcon={
                <LogoutIcon sx={{ transform: "scaleX(-1)", color: "red" }} />
              }
              sx={{
                width: 212,
                height: 50,
                justifyContent: "center",
                color: "white",
                fontSize: "0.90rem",
                fontWeight: "bold",
                ":focus": { outlineWidth: "0" },
                textTransform: "none",
                "&:hover": { bgcolor: "gray" },
              }}
            >
              Salir
            </Button>
          </Paper>
        </Collapse>
      </Popper>
    </Box>
  );
}
