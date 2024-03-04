import React from "react";
import "../../App.css";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "./AuthProvider";

function SecondListItems() {
  const { setIsAuthenticated } = useAuth();

  const logoutHandler = () => {
    setIsAuthenticated(false);
  };
  return (
    <NavLink style={{ backgroundColor: "red" }} className="Link" to="/login">
      <ListItemButton onClick={logoutHandler}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </NavLink>
  );
}

export default SecondListItems;
