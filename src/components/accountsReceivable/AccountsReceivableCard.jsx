import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function AccountsReceivableCard({
  title,
  amount,
  variation,
  variationColor,
  color,
  icon,
  bgcolor,
}) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        height: "115px",
        width: "256px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderLeft: `solid 3.5px ${bgcolor}`,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          width: "100%",
          height: "85%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            textAlign: "initial",
            height: "70%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                bgcolor: `${color}`,
                height: "80%",
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                width: "15%",
                borderRadius: "14%",
                p: "2px",
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "gray", ml: "2%", mt: "3px" }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{ height: "40px", ml: "8%", display: "flex", mt: "8%" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "22px" }}
            >
              {amount}
            </Typography>
            {variation && (
              <Typography
                variant="subtitle2"
                sx={{ color: variationColor || "green" }}
              >
                {variation}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
