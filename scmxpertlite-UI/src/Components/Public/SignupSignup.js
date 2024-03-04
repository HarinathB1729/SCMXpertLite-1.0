import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        className="LinkNone"
        target="_blank"
        href="https://www.exafluence.com/"
        rel="noreferrer"
      >
        Exafluence
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignupSignup() {
  const navigate = useNavigate();
  const signup_init_values = {
    name: false,
    password: "",
    role: "user",
    email: false,
  };
  const [signupData, setSignupData] = useState(signup_init_values);
  const [cnfPwd, setCnfPwd] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);

  const signupHandler = async (event) => {
    event.preventDefault();
    // console.log("form submitted :", signupData);
    try {
      await api
        .post("/signup", signupData)
        .then((res) => {
          // console.log("response", res);
          setError(false);
          window.alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          setError(true);
          console.log("error", err);
          setErrMsg(err.response.data["detail"]);
          // console.log("errmsg",err.response.data['detail'])
        });
    } catch (err) {
      console.log("Catch Error", err);
    }
  };

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{7,20}$/;
    return regex.test(password);
  }

  const dataHandler = (e) => {
    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    if (validatePassword(signupData?.password)) setPwdErr(false);
    else setPwdErr(true);

    setSignupData((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
    }));
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
      <Typography variant="h5" gutterBottom>
        SCMXpertLite -Create Account
      </Typography>
      <Container>
        <form onSubmit={signupHandler} autoComplete="off">
          <FormControl>
            <TextField
              required={true}
              fullWidth
              sx={{ marginTop: "20px" }}
              label="What should we call You ?"
              name="name"
              placeholder="Enter Your Name"
              onChange={dataHandler}
            />

            <TextField
              sx={{ marginTop: "20px" }}
              required={true}
              fullWidth
              label="email address"
              name="email"
              placeholder="Enter Your Email Address"
              type="email"
              onChange={dataHandler}
            />
            <TextField
              sx={{ marginTop: "20px" }}
              fullWidth
              required={true}
              name="password"
              label="Password"
              type="password"
              onChange={dataHandler}
              placeholder="Enter New Password"
              error={pwdErr}
            />
            {pwdErr && (
              <Typography sx={{ color: "red", fontSize: "0.8em" }}>
                Password : 8-20 characters with [a-z], [A-Z], [0-9],
                [!@#$%^&*()_+{};':"|,./?].
              </Typography>
            )}
            <TextField
              sx={{ marginTop: "20px" }}
              fullWidth
              required={true}
              name="cnfpwd"
              type="password"
              label="confirm password"
              onChange={(e) => {
                setCnfPwd(e.target.value);
              }}
              placeholder="Confirm New Password"
              error={cnfPwd !== signupData.password}
            />
            {cnfPwd !== signupData.password && (
              <Typography
                sx={{ float: "left", color: "red" }}
                fontSize={13}
                gutterBottom
              >
                Passwords don't match
              </Typography>
            )}

            <Typography
              sx={{ float: "left", color: "red" }}
              fontSize={13}
              gutterBottom
            >
              {error && errMsg}
            </Typography>

            <Typography
              sx={{
                marginTop: "50px",
                width: "100%",
                height: "20px",
                marginBottom: "25px",
                textAlign: "center",
              }}
            >
              I have read and I Accept the Privacy Policy & Conditions of Use
            </Typography>

            <Button
              type="submit"
              size="medium"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !signupData.name ||
                !signupData.email ||
                signupData.password !== cnfPwd
              }
            >
              SIGN UP
            </Button>
          </FormControl>
        </form>
      </Container>

      <Copyright sx={{ mt: 4, mb: 2 }} />
    </Container>
  );
}
