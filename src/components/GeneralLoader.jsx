import { Box } from "@mui/system";
import { PropagateLoader } from "react-spinners";
import React from "react";

export default function GeneralLoader() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(29, 29, 29, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 19999,
      }}
    >
      <PropagateLoader size={30} color="#1976d2" />
    </Box>
  );
}
