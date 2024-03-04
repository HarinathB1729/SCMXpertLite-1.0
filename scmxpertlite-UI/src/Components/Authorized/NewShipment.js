import React, { useState, useEffect } from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import "../../App.css";
import api from "../api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import DOMPurify from "dompurify";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

export default function NewShipment() {
  const [devices, setDevices] = React.useState([]);
  const { isAuthenticated } = useAuth();
  const route = ["Newyork", "Dubai", "Tirupati", "London"];
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();
  const token = isAuthenticated["token"];
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const newshipment_init_values = {
    email: isAuthenticated["email"],
    shipmentno: "",
    routedetails: "",
    device: "",
    ponumber: "",
    ndcnumber: "",
    snogoods: "",
    containerno: "",
    goodstype: "",
    expdeliverydate: "",
    deliveryno: "",
    batchid: "",
    shipmentdescr: "",
  };


  useEffect(() => {
    routesGen();
    const fetchData = async () => {
      try {
        await api
          .get("/devices", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDevices(res.data);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      } catch (err) {
        console.log("Catch Error :", err);
      }
    };
    fetchData();
  }, []);

  const [newShipment, setNewShipment] = React.useState(newshipment_init_values);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("submit, newShipment :", newShipment);
    try {
      await api
        .post("/newshipment", newShipment, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("response", res);
          window.alert(res.data["message"]);
          navigate("/shipments");
        })
        .catch((err) => {
          console.log("error", err);
          setError(true)
          setErrMsg(err.response.data['detail'])
        });
    } catch (err) {
      console.log("Catch Error :", err);
    }
  };

  const clearDataHandler = (e) => {
    e.preventDefault();
    setNewShipment(newshipment_init_values);
  };

  const dataHandler = (e) => {
    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    setNewShipment((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
    }));
  };

  const routesGen = () => {
    let routes_arr = Array([]);

    for (let r in route) {
      for (let rt in route) {
        if (r == rt) continue;
        else routes_arr.push(route[r] + " - " + route[rt]);
      }
    }
    // console.log("routes", routes_arr);
    setRoutes(routes_arr);
  };
  // console.log("newShipment :", newShipment);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="h6">
        Create New Shipment
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid style={{ width: "98%", margin: "10px" }} container spacing={2}>
          <Grid xs={6}>
            <Item style={{ textAlign: "left", padding: "10px 20px" }}>
              Shipment Number*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="shipmentno"
                placeholder="Shipment Number"
                variant="filled"
                onChange={dataHandler}
                value={newShipment?.shipmentno}
                inputProps={{maxLength:7}}                
                error={error}
              />
              {error && <Typography  sx={{color:'red', fontSize:'0.8em'}}>{errMsg}</Typography>}
              <br />
              Route Details* <br />
              <Select
                style={{ width: "90%", marginBottom: "10px" }}
                name="routedetails"
                onChange={dataHandler}
                variant="filled"
                label="Age"
                value={newShipment?.routedetails}
              >
                {routes.map((route) => {
                  return (
                    <MenuItem key={route} value={route}>
                      {route}
                    </MenuItem>
                  );
                })}
              </Select>
              <br />
              Device* <br />
              <Select
                style={{ width: "90%", marginBottom: "10px" }}
                name="device"
                value={newShipment?.device}
                // onChange={handleChange}
                variant="filled"
                label="Age"
                onChange={dataHandler}
              >
                {devices?.map((devId) => (
                  <MenuItem key={devId} value={devId}>
                    {devId}
                  </MenuItem>
                ))}
              </Select>
              <br />
              PO Number*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="ponumber"
                value={newShipment?.ponumber}
                placeholder="PO Number"
                variant="filled"
                onChange={dataHandler}
              />
              <br />
              NDC Number*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="ndcnumber"
                value={newShipment?.ndcnumber}
                placeholder="NDC Number"
                variant="filled"
                onChange={dataHandler}
              />
              <br />
              Serial Number of Goods*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                placeholder="Serial Number of Goods"
                name="snogoods"
                value={newShipment?.snogoods}
                variant="filled"
                onChange={dataHandler}
              />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item style={{ textAlign: "left", padding: "10px 20px" }}>
              Container Number*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="containerno"
                value={newShipment?.containerno}
                placeholder="Container Number"
                variant="filled"
                onChange={dataHandler}
              />
              <br />
              Goods Type* <br />
              <Select
                style={{ width: "90%", marginBottom: "10px" }}
                name="goodstype"
                value={newShipment?.goodstype}
                variant="filled"
                label="Age"
                onChange={dataHandler}
              >
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
              </Select>
              <br />
              Expected Delivery Date* <br />
              <TextField
                type="date"
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="expdeliverydate"
                value={newShipment?.expdeliverydate}
                placeholder="Expected Delivery Date"
                variant="filled"
                onChange={dataHandler}
                inputProps={{ min: new Date().toISOString().substring(0, 10) }}
              />
              <br />
              Delivery Number*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="deliveryno"
                value={newShipment?.deliveryno}
                placeholder="Delivery Number"
                variant="filled"
                onChange={dataHandler}
              />
              <br />
              Batch ID*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                name="batchid"
                value={newShipment?.batchid}
                placeholder="Batch ID"
                variant="filled"
                onChange={dataHandler}
              />
              <br />
              Shipment Description*
              <br />
              <TextField
                style={{ width: "90%", marginBottom: "10px" }}
                required
                placeholder="Shipment Description"
                name="shipmentdescr"
                value={newShipment?.shipmentdescr}
                variant="filled"
                multiline
                rows={3}
                onChange={dataHandler}
              />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item style={{ backgroundColor: "#fff" }}>
              <Button
                style={{ width: "200px", padding: "10px 20px" }}
                variant="contained"
                type="submit"
              >
                Create shipment
              </Button>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Button
                style={{ width: "200px", padding: "10px 20px" }}
                variant="contained"
                color="error"
                onClick={clearDataHandler}
              >
                Clear Details
              </Button>
            </Item>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
