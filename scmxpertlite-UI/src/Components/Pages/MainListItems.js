import React, { useEffect, useState } from "react";
import "../../App.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import { useAuth } from "../Auth/AuthProvider";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function MainListItems() {
  const { isAuthenticated } = useAuth();

  const [navitems, setNavitems] = useState([
    "Dashboard",
    "My Account",
    "Change Password",
    "Shipments",
    "New Shipment",
    "Device Data",
  ]);

  const [navitemsIcons, setNavitemsIcons] = useState([
    <DashboardIcon />,
    <PersonIcon />,
    <VpnKeyIcon />,
    <TextSnippetIcon />,
    <LocalShippingIcon />,
    <AdfScannerIcon />,
  ]);

  useEffect(() => {
    if (isAuthenticated["role"] === "admin") {
      setNavitems((prev) => [...prev, "User Privileges"]);
      setNavitemsIcons((prev) => [...prev, <ManageAccountsIcon />]);
    }
  }, []);

  // console.log("isauthenticated", isAuthenticated);

  return (
    <>
      {navitems.map((ni, i) => {
        return (
          <NavLink
            key={ni}
            className={({ isActive }) => (isActive ? "ActiveLink" : "Link")}
            to={"/" + String(ni).toLowerCase().replaceAll(" ", "")}
          >
            {({ isActive }) => {
              return (
                <ListItemButton selected={{ isActive }}>
                  <ListItemIcon sx={isActive ? { color: "#CC0000" } : {}}>
                    {navitemsIcons[i]}
                  </ListItemIcon>

                  <ListItemText
                    sx={isActive ? { color: "#EF0107" } : {}}
                    primary={ni}
                  />
                </ListItemButton>
              );
            }}
          </NavLink>
        );
      })}
    </>
  );
}

export default MainListItems;
