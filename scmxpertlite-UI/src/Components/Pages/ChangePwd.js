import React, { useState } from "react";
import "../../App.css";
import DOMPurify from "dompurify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import { useAuth } from "../Auth/AuthProvider";
import { FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="right" {...props}>
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

export default function ChangePwd() {
  const { isAuthenticated } = useAuth();
  const [changePwd, setChangePwd] = useState({
    email: isAuthenticated["email"],
    password: false,
  });
  const [error, setError] = useState(false);
  const [cnfPwd, setCnfPwd] = useState("");
  const navigate = useNavigate();
  const access_token = isAuthenticated["token"];
  const [pwdErr, setPwdErr] = useState(false);

  const loginDataHandler = (e) => {
    e.preventDefault();
    setError(false);

    if (validatePassword(changePwd?.password)) setPwdErr(false);
    else setPwdErr(true);

    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    setChangePwd((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
    }));
  };

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{7,20}$/;
    return regex.test(password);
  }

  const formDataHandler = async (e) => {
    e.preventDefault();
    //console.log("formsubmitted :", changePwd);

    try {
      await api
        .post("/pwdreset", changePwd, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          // console.log("res", res);
          window.alert(res.data["message"]);
          navigate("/login");
        })
        .catch((err) => {
          setError(true);
          console.log("Error :", err);
        });
    } catch (err) {
      console.log("Catch Error", err);
    }
  };
  //   console.log("isauthenticated", isAuthenticated);

  return (
    <div>
      <Typography variant="h6" component="h6">
        Change Password
      </Typography>

      <Container>
        <form onSubmit={formDataHandler}>
          <FormControl>
            <TextField
              required={true}
              sx={{ marginTop: "20px", minWidth: "500px" }}
              label="email address"
              name="email"
              type="email"
              defaultValue={isAuthenticated["email"]}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              sx={{ marginTop: "20px", minWidth: "500px" }}
              required={true}
              name="password"
              label="New Password"
              type="password"
              onChange={loginDataHandler}
              placeholder="Enter New Password"
              autoComplete="off"
              error={error}
            />
            {pwdErr && (
              <Typography sx={{ color: "red", fontSize: "0.8em" }}>
                Password : 8-20 characters with [a-z], [A-Z], [0-9],
                [!@#$%^&*()_+
                {};':"|,./?].
              </Typography>
            )}

            <TextField
              sx={{ marginTop: "20px", minWidth: "500px" }}
              required={true}
              name="password"
              label="Confirm New Password"
              type="password"
              onChange={(e) => {
                setCnfPwd(e.target.value);
              }}
              placeholder="Enter New Password"
              autoComplete="off"
              error={cnfPwd !== changePwd.password}
            />
            <br />
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={cnfPwd !== changePwd.password}
            >
              Update Password
            </Button>
          </FormControl>
        </form>
      </Container>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}
