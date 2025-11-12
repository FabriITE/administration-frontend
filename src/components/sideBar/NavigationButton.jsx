import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavigationButton({ icon, text, route }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ListItem
      onClick={() => navigate(route)}
      className={`btnNav ${location.pathname === route ? "btn-selected" : ""}`}
    >
      <ListItemIcon
        sx={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
}
