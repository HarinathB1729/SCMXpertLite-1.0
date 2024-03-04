import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DeviceDataStream from "./DeviceDataStream";
import api from "../api";
import { useAuth } from "./AuthProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function DeviceData() {
  const { isAuthenticated } = useAuth();
  const [deviceId, setDeviceId] = React.useState("");
  const [devices, setDevices] = React.useState([]);
  const [deviceData, setDeviceData] = React.useState([]);
  const token = isAuthenticated["token"];

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, []);

  const handleChange = async (event) => {
    setDeviceId(event.target.value);
  };

  const formDataHandler = async (e) => {
    e.preventDefault();
    if (isAuthenticated["role"] == "admin") {
      try {
        await api
          .get("/device/" + deviceId, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log("device data :",res.data);
            setDeviceData(res.data);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      } catch (err) {
        console.log("Catch Error", err);
      }
    }
  };

  return (
    <Container
      sx={{
        // border: "1px solid blue",
        width: "90%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px",
        // gap: "20px",
      }}
    >
      <Typography sx={{ marginTop: "10px" }} variant="h5" component="h6">
        Device Data Stream
      </Typography>
      {isAuthenticated["role"] == "admin" ? (
        <>
          <Container
            sx={{
              // border: "1px solid green",
              backgroundColor: "#f7edab",
              // height: "100px",
              display: "flex",
              flexDirection: "column",
              margin: "15px 0px",
              padding: "20px",
            }}
          >
            <Typography align="center">
              Please select a Device ID to see Data Stream
            </Typography>
            <form onSubmit={formDataHandler}>
              <FormControl sx={{ m: 1, minWidth: 600 }} autoComplete="off">
                <Container
                  sx={{
                    display: "flex",
                    gap: "30px",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ width: "100%", height: "40px" }}
                    value={deviceId}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    required
                  >
                    {devices?.map((devId) => (
                      <MenuItem key={devId} value={devId}>
                        {devId}
                      </MenuItem>
                    ))}
                  </Select>

                  <Button
                    sx={{ minWidth: "150px", minHeight: "40px" }}
                    type="submit"
                    variant="contained"
                    size="small"
                  >
                    Get Device Data
                  </Button>
                </Container>
              </FormControl>
            </form>
          </Container>
          {deviceData.length > 0 && (
            <DeviceDataStream deviceData={deviceData} />
          )}
        </>
      ) : (
        <Container>You dont have Admin Privileges to view this page</Container>
      )}
    </Container>
  );
}

export default DeviceData;
