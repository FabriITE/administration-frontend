import React from "react";
import { Box } from "@mui/system";
import AccountsReceivableHeader from "../../components/accountsReceivable/AccountsReceivableHeader";
import AccountsReceivableFilter from "../../components/accountsReceivable/AccountsReceivableFilter";
import AccountsReceivableTable from "../../components/accountsReceivable/AccountsReceivableTable";
import "./AccountsReceivable.css";
import AccountsReceivableResume from "../../components/accountsReceivable/AccountsReceivableResume";

export default function AccountsReceivableView() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountsReceivableHeader />
      </Box>
      <Box
        sx={{
          width: "100%",
          pb: "2%",
          justifyContent: "center",
          alignContent: "center",
          display: "flex",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <AccountsReceivableResume />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6%",
              mt: "2.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <AccountsReceivableFilter />
            </Box>
            <Box
              sx={{
                mt: "1%",
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <AccountsReceivableTable />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
