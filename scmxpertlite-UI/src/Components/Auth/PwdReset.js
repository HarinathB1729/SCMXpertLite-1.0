import React from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="right" {...props}>
      {"Copyright © "}
      <a
        className="LinkNone"
        rel="noreferrer"
        target="_blank"
        href="https://www.exafluence.com/"
      >
        Exafluence
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function PwdReset() {
  const [pwdresetData, setPwdresetData] = React.useState({});
  const [error, setError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(false);
  const [cnfPwd, setCnfPwd] = React.useState("");

  const navigate = useNavigate();

  const pwdResetDataHandler = (e) => {
    e.preventDefault();
    setError(false);
    setPwdresetData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formDataHandler = async (e) => {
    e.preventDefault();
    // console.log("formsubmitted :", pwdresetData);
    try {
      await api
        .post("/forgotpwd", pwdresetData)
        .then((res) => {
          // console.log("res", res);
          window.alert(res.data["message"]);
          navigate("/login");
        })
        .catch((err) => {
          setError(true);
          console.log("Error :", err);
          setErrMsg(err.response.data["detail"]);
        });
    } catch (err) {
      console.log("Catch Error", err);
    }
  };

  return (
    <Container
      sx={{
        // border: "1px solid green",
        height: "99vh",
        width: "75%",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Password Reset
      </Typography>

      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <form onSubmit={formDataHandler}>
          <TextField
            required={true}
            sx={{ width: "500px" }}
            label="email address"
            name="email"
            placeholder="Enter Your Email Address"
            type="email"
            onChange={pwdResetDataHandler}
            autoComplete="off"
            error={error}
          />
          <br />
          {error && (
            <Typography
              sx={{ float: "left", color: "red" }}
              fontSize={13}
              gutterBottom
            >
              {errMsg}
            </Typography>
          )}
          <TextField
            sx={{ marginTop: "20px", width: "500px" }}
            required={true}
            name="password"
            label="Password"
            type="password"
            onChange={pwdResetDataHandler}
            placeholder="Enter Your Password"
            autoComplete="off"
            error={error}
          />
          <TextField
            sx={{ marginTop: "20px", width: "500px" }}
            required={true}
            name="cnfpwd"
            label="Confirm Password"
            type="password"
            onChange={(e) => {
              setCnfPwd(e.target.value);
            }}
            placeholder="Confirm New Password"
            autoComplete="off"
            error={error}
          />
          {cnfPwd !== pwdresetData.password && (
            <Typography
              sx={{ float: "left", color: "red" }}
              fontSize={13}
              gutterBottom
            >
              Passwords don't match
            </Typography>
          )}

          <br />

          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !pwdresetData.email ||
              !pwdresetData.password ||
              pwdresetData.password !== cnfPwd
            }
          >
            Reset Password
          </Button>
        </form>
      </Container>
      <Container sx={{ width: "100%", height: "20px" }}>
        <Link className="LinkNone" to="/login">
          Remember Password ? Login
        </Link>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
