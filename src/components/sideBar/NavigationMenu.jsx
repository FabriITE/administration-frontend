import { MenuList } from "@mui/material";
import React from "react";
import NavigationButton from "./NavigationButton";
import { routes } from "../../models/routes";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import HandymanIcon from "@mui/icons-material/Handyman";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
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
        text={"cuentas por cobrar"}
        route={routes.accountsreceivable.route}
      />
    </MenuList>
  );
}
