import React from "react";
import "../../App.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function SignupLogin() {
  return (
    <Container>
      <Typography variant="h4">Welcome Back !</Typography>
      <Typography variant="h6" sx={{ margin: "25px" }}>
        Welcome Back ! Please login with your personal info
      </Typography>
      <Link className="LinkNone" to="/">
        <Button size="medium" variant="contained">
          SIGN IN
        </Button>
      </Link>
    </Container>
  );
}

export default SignupLogin;
