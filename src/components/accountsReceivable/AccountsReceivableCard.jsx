import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Wallet } from "lucide-react";

export default function AccountsReceivableCard({
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
        height: "120px",
        width: "256px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: `${color}`,
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

        <Box sx={{ position: "absolute", top: 18, right: 8 }}>{icon}</Box>
      </CardContent>
    </Card>
  );
}
