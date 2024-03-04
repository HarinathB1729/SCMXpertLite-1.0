import React from "react";
import "../../App.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LoginSignup() {
  return (
    <Container>
      <Typography variant="h4">Create Your Account</Typography>
      <Typography variant="h6" sx={{ margin: "25px" }}>
        Enter your personal details and start journey with us
      </Typography>
      <Link className="LinkNone" to="/signup">
        <Button size="medium" variant="contained">
          SIGN UP
        </Button>
      </Link>
    </Container>
  );
}

export default LoginSignup;
