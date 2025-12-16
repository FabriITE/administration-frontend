import React from "react";
import { Box } from "@mui/material";
import AccountsReceivableCard from "./AccountsReceivableCard";
import { Wallet, TrendingUp, TrendingDown, List } from "lucide-react";
import { useSelector } from "react-redux";

export default function AccountsReceivableResume() {
  const month_resume = useSelector((state) => state.monthInfo);

  const total = month_resume.total_charged + month_resume.total_receivable;

  const percentPaid =
    total > 0 ? (month_resume.total_charged / total) * 100 : 0;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2.5,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AccountsReceivableCard
        title="Total por Cobrar"
        amount={`$ ${month_resume.total_receivable}`}
        color="#fef2f2"
        icon={<Wallet color="#e70000" />}
        bgcolor={"#e70000"}
      />
      <AccountsReceivableCard
        title="Pagos Confirmados"
        icon={<TrendingUp color="#008000" />}
        amount={`$ ${month_resume.total_charged}`}
        color="#f0fdf4"
        bgcolor={"#008000"}
      />
      <AccountsReceivableCard
        title="Clientes activos"
        amount={`${month_resume.active_clients}`}
        color="#eff6ff"
        icon={<TrendingDown color="#006bff" />}
        bgcolor={"#006bff"}
      />
      <AccountsReceivableCard
        title="Tasa de Pago"
        amount={`${percentPaid.toFixed(2)} %`}
        color="#faf5ff"
        icon={<List color="#8001ffff" />}
        bgcolor={"#8001ffff"}
      />
    </Box>
  );
}
