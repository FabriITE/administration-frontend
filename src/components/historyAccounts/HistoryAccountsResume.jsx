import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import HistoryAccountsCard from "./HistoryAccountsCard";
import { CreditCard, BanknoteArrowDown, Wallet } from "lucide-react";
import { useSelector } from "react-redux";

export default function HistoryAccountsResume() {
  const history = useSelector((state) => state.clients.clientPaymentHistory);

  const [totalPay, setTotalPay] = useState(0);
  const [amountPayments, setAmountPayments] = useState(0);

  const calculateData = () => {
    let total = 0;
    let length = 0;
    history.forEach((payment) => {
      total += parseFloat(payment.amount);
      length += 1;
    });
    setTotalPay(total);
    setAmountPayments(length);
  };

  useEffect(() => {
    calculateData();
  }, [history]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mb: 4,
      }}
    >
      <HistoryAccountsCard
        title="Total Pagado"
        amount={`$ ${totalPay}`}
        color="#f0fdf4"
        icon={<BanknoteArrowDown color="#008000" />}
      />
      <HistoryAccountsCard
        title="Pagos"
        amount={`${amountPayments}`}
        color="#fef2f2"
        icon={<Wallet color="#e70000" />}
      />
    </Box>
  );
}
