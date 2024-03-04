import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SignupLogin from "./SignupLogin";
import SignupSignup from "./SignupSignup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

function Signup() {
  return (
    <Grid container sx={{background: "radial-gradient(circle,rgba(148,233,232,1)  0%, rgba(174,183,238,1) 100%)"}}>
      <Grid
        item
        sx={{
          display: "flex",          
          borderRight:'1px solid',
          width: "50%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignupSignup />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",         
          width: "50%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignupLogin />
      </Grid>
    </Grid>
  );
}

export default Signup;
