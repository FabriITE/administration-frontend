import { Box, Button, Card, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AccountsReceivableFilter({
  selected,
  setSelected,
  search,
  setSearch,
  searchInactive,
}) {
  // const [selected, setSelected] = useState("Todos");

  const buttons = ["Todos", "Por cobrar", "Pagados"];
  return (
    <Box
      sx={{
        width: "86.5%",
        my: 1,
        mr: 2,
      }}
    >
      <Paper
        sx={{
          p: 1.5,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: 3,
          borderRadius: 3,
          flexWrap: "wrap",
          gap: 2,
          height: "70%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {buttons.map((btn) => (
            <Button
              key={btn}
              onClick={() => setSelected(btn)}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: "20px",
                bgcolor: selected === btn ? "#103b56" : "transparent",
                color: selected === btn ? "#fff" : "inherit",
                borderColor:
                  selected === btn ? "#103b56" : "rgba(0, 0, 0, 0.23)",
                "&:hover": {
                  bgcolor: selected === btn ? "#0b2c40" : "rgba(16,59,86,0.1)",
                },
              }}
            >
              {btn}
            </Button>
          ))}
          <Button
            onClick={() => searchInactive("De baja")}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "20px",
              bgcolor: selected === "De baja" ? "#103b56" : "transparent",
              color: selected === "De baja" ? "#fff" : "inherit",
              borderColor:
                selected === "De baja" ? "#103b56" : "rgba(0, 0, 0, 0.23)",
              "&:hover": {
                bgcolor:
                  selected === "De baja" ? "#0b2c40" : "rgba(16,59,86,0.1)",
              },
            }}
          >
            De baja
          </Button>
        </Box>

        <Box
          sx={{
            minWidth: "250px",
            maxWidth: "350px",
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="Buscar..."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Paper>
    </Box>
  );
}
