import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function HistoryAccountsCard({
  title,
  amount,
  variation,
  variationColor,
  color,
  icon,
}) {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 4,
        height: "100px",
        width: "256px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            height: "100%",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "gray" }}
          >
            {title}
          </Typography>
          <Box sx={{ height: "40px" }}>
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

        <Box
          sx={{
            bgcolor: `${color}`,
            position: "absolute",
            top: 45,
            right: 20,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "15%",
            borderRadius: "14%",
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
