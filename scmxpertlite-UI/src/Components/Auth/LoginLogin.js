import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import { useAuth } from "./AuthProvider";
import ReplayIcon from "@mui/icons-material/Replay";

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
        rel="noreferrer"
        href="https://www.exafluence.com/"
      >
        Exafluence
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginLogin() {
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const [captchaVal, setCaptchaVal] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    captchaGenerator();
  }, []);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const captchaGenerator = () => {
    let txt = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let capval = "";
    let char = "";

    for (let i = 0; i < 7; i++) {
      char = txt.charAt(getRandomNumber(0, txt.length + 1));
      // console.log("char",char)
      capval += char;
    }
    // console.log("captcha generated :" + capval);
    setCaptchaVal(capval);
  };

  const captchaDataHandler = (event) => {
    setUserCaptcha(event.target.value);
  };

  const loginDataHandler = (e) => {
    e.preventDefault();
    setError(false);
    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    setLoginData((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
    }));
  };

  const formDataHandler = async (e) => {
    e.preventDefault();
    // console.log("formsubmitted :", loginData);
    let access_token = "";
    try {
      await api
        .post("/authentication", loginData)
        .then((res) => {
          // console.log("res", res);
          // localStorage.setItem("accessToken",res.data.access_token)
          access_token = res.data?.access_token;
          navigate("/dashboard");
        })
        .then(async () => {
          try {
            await api
              .get("/protected", {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              })
              .then((res) => {
                // console.log("protected res", res);
                setIsAuthenticated({ ...res.data, token: access_token });
                navigate("/dashboard");
              })
              .catch((err) => {
                console.log("Error", err);
              });
          } catch (err) {
            console.log("Catch Error", err);
          }
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
  // console.log("usercaptcha", userCaptcha);
  // console.log("captcha val", captchaVal);

  return (
    <Container
      sx={{
        // border: "1px solid green",
        height: "99vh",
        width: "75%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        SCMXpertLite
      </Typography>
      <Typography component="h1" variant="h6" gutterBottom>
        Sign in now
      </Typography>
      <Container>
        <form onSubmit={formDataHandler} autoComplete="off">
          <TextField
            required={true}
            fullWidth
            label="email address"
            name="email"
            placeholder="Enter Your Email Address"
            type="email"
            onChange={loginDataHandler}
            error={error}
          />
          <TextField
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            fullWidth
            required={true}
            name="password"
            label="Password"
            type="password"
            onChange={loginDataHandler}
            placeholder="Enter Your Password"
            error={error}
          />
          {error && (
            <Typography
              sx={{ float: "left", color: "red", marginBottom: "20px" }}
              fontSize={13}
            >
              {errMsg}
            </Typography>
          )}
          {/* <Container
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Checkbox />
            <Typography>Remember Me</Typography>
          </Container> */}
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <TextField
              fullWidth
              required={true}
              name="captcha"
              label="Enter Captcha"
              type="text"
              onChange={captchaDataHandler}
              placeholder="Enter captcha Value"
              error={error}
            />

            <ReplayIcon
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "20px",
              }}
              onClick={captchaGenerator}
            />
            <TextField
              sx={{ fontSize: "30em" }}
              fullWidth
              label="Captcha"
              value={captchaVal}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !loginData.email ||
              !loginData.password ||
              captchaVal !== userCaptcha
            }
          >
            SIGN IN
          </Button>
        </form>
      </Container>
      <Container sx={{ width: "100%", height: "20px" }}>
        <Link className="LinkNone" to="/pwdreset">
          Forgot Password ?
        </Link>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
