import React from "react";
import "../App.css";
import { NavLink, Outlet } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import ExfIconSrc from "./Authorized/Exf_icon.ico";
import ExfImgSrc from "./Authorized/exafluence.avif";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./Authorized/MainListItems";
import SecondListItems from "./Authorized/SecondListItems";
import { useAuth } from "../Components/Authorized/AuthProvider";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomeRouter() {
  const [open, setOpen] = React.useState(true);
  const { isAuthenticated } = useAuth();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  // console.log("isAuthenticated ",isAuthenticated)
  // console.log("homerouter")

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <img
                style={{ width: "32px", height: "32px" }}
                src={ExfIconSrc}
                alt="Exf icon"
              />

              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              SCMXpertLite
            </Typography>
            Hello {isAuthenticated["name"]} !
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <div
            style={{
              display: "flex",
              height: "100vh",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ backgroundColor: "#1f3b71", height: "100%" }}>
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: [1],
                  color: "yellow",
                }}
              >
                <div></div>
                <NavLink to="/dashboard">
                  <img
                    style={{ width: "260px", height: "75px" }}
                    src={ExfImgSrc}
                    alt="Exf Icon"
                  />
                </NavLink>
                {/* <NavLink
                  style={{ textDecoration: "none", color: "#FFD700" }}
                  to="/dashboard"
                >
                  <h2>Exafluence</h2>
                </NavLink> */}
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <List component="nav">
                <MainListItems />
              </List>
            </div>
            <div style={{ backgroundColor: "red" }}>
              <SecondListItems />
            </div>
          </div>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
