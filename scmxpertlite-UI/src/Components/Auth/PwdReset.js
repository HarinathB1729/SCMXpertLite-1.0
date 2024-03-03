import React, { useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import DOMPurify from "dompurify";


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
  const [pwdresetData, setPwdresetData] = useState({});
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [cnfPwd, setCnfPwd] = useState("");
  const [pwdErr, setPwdErr] = useState(false);

  const navigate = useNavigate();

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{7,20}$/;
    return regex.test(password);
  }

  const pwdResetDataHandler = (e) => {
    e.preventDefault();
    setError(false);

    if (validatePassword(pwdresetData?.password)) setPwdErr(false);
    else setPwdErr(true);

    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    setPwdresetData((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
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
          {pwdErr && (
            <Typography sx={{ color: "red", fontSize: "0.8em" }}>
              Password : 8-20 characters with [a-z], [A-Z], [0-9], [!@#$%^&*()_+
              {};':"|,./?].
            </Typography>
          )}

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
            error={cnfPwd !== pwdresetData.password}
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
