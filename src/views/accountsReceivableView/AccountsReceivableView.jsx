import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import AccountsReceivableHeader from "../../components/accountsReceivable/AccountsReceivableHeader";
import AccountsReceivableFilter from "../../components/accountsReceivable/AccountsReceivableFilter";
import AccountsReceivableTable from "../../components/accountsReceivable/AccountsReceivableTable";
import "./AccountsReceivable.css";
import AccountsReceivableResume from "../../components/accountsReceivable/AccountsReceivableResume";

import { useClients } from "../../hooks/clients/useClients";

export default function AccountsReceivableView() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const { fecthActiveClients, fetchMonthInfo } = useClients();

  const { fecthInactiveClients } = useClients();
  useEffect(() => {
    fecthActiveClients();
    fetchMonthInfo();
  }, []);

  useEffect(() => {
    if (filter != "De baja") {
      fecthActiveClients();
    }
  }, [filter]);

  const searchInactive = async () => {
    setFilter("De baja");
    await fecthInactiveClients();
  };

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
              <AccountsReceivableFilter
                selected={filter}
                setSelected={setFilter}
                search={search}
                setSearch={setSearch}
                searchInactive={searchInactive}
              />
            </Box>
            <Box
              sx={{
                mt: "1%",
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <AccountsReceivableTable filter={filter} search={search} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
