import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Create a New Shipment
        </Typography>
        <NavLink className="dashboard-item-button" to="/newshipment">
          CREATE SHIPMENT
        </NavLink>
      </div>
      <div className="dashboard-item">
        <Typography variant="h6" color="textPrimary" gutterBottom>
          To See Device Data Stream
        </Typography>
        <NavLink className="dashboard-item-button" to="/devicedata">
          DEVICE DATASTREAM
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
