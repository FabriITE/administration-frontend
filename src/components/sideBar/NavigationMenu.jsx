import { MenuList } from "@mui/material";
import React from "react";
import NavigationButton from "./NavigationButton";
import { routes } from "../../models/routes";
import AssignmentIcon from "@mui/icons-material/Assignment";
export default function NavigationMenu() {
  return (
    <MenuList sx={{ width: "225px" }}>
      <NavigationButton
        key={"AccountsReceivable"}
        icon={
          <AssignmentIcon
            sx={{ color: "#fff", height: "30px", width: "30px" }}
          />
        }
        text={"Cuentas por cobrar"}
        route={routes.accountsreceivable.route}
      />
    </MenuList>
  );
}
