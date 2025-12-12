import React from "react";
import { Box } from "@mui/material";
import AccountsReceivableCard from "./AccountsReceivableCard";
import { Wallet, TrendingUp, TrendingDown, List } from "lucide-react";
import { useSelector } from "react-redux";

export default function AccountsReceivableResume() {
  const monthResume = {
    balance: 1250000,
    total_incomes: 750000,
    total_expenses: 250000,
    total_transactions: 48,
  };
  const month_resume = useSelector((state) => state.monthInfo);
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
      />
      <AccountsReceivableCard
        title="Pagos Confirmados"
        amount={`$ ${month_resume.total_charged}`}
        color="#f0fdf4"
        icon={<TrendingUp color="#008000" />}
      />
      <AccountsReceivableCard
        title="Clientes activos"
        amount={`${month_resume.active_clients}`}
        color="#eff6ff"
        icon={<TrendingDown color="#006bff" />}
      />
      {/* <AccountsReceivableCard
        title="Tasa de Pago"
        amount={`${monthResume.total_transactions}`}
        color="#faf5ff"
        icon={<List color="#8001ffff" />}
      /> */}
    </Box>
  );
}
