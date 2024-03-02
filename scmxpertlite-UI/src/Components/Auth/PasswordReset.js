import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PwdReset from "./PwdReset";
import LoginSignup from "./LoginSignup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

function PasswordReset() {
  return (
    <Grid container>
      <Grid
        item
        sx={{
          display: "flex",
          backgroundColor: "aqua",
          // border:'1px solid red',
          width: "50%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoginSignup />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          // backgroundColor: 'green',
          // border:'1px solid red',
          width: "50%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PwdReset />
      </Grid>
    </Grid>
  );
}

export default PasswordReset;
