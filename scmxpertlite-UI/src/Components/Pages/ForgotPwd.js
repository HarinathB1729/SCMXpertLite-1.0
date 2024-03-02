import React from "react";
import "../../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import api from "../api";
import { useAuth } from "../Auth/AuthProvider";
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

export default function ForgotPwd() {
  const { isAuthenticated } = useAuth();
  const [changePwd, setChangePwd] = React.useState({
    email: isAuthenticated["email"],
    password: false,
  });
  const [error, setError] = React.useState(false);
  const [cnfPwd, setCnfPwd] = React.useState("");
  const navigate = useNavigate();

  const loginDataHandler = (e) => {
    e.preventDefault();
    setError(false);
    setChangePwd((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formDataHandler = async (e) => {
    e.preventDefault();
    //console.log("formsubmitted :", changePwd);
    const access_token = isAuthenticated["token"];
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
      <Typography variant="h6" component="h6">
        Change Password
      </Typography>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <form onSubmit={formDataHandler}>
          <TextField
            required={true}
            sx={{ width: "500px" }}
            label="email address"
            name="email"
            type="email"
            defaultValue={isAuthenticated["email"]}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ marginTop: "20px", width: "500px" }}
            required={true}
            name="password"
            label="New Password"
            type="password"
            onChange={loginDataHandler}
            placeholder="Enter New Password"
            autoComplete="off"
            error={error}
          />
          <TextField
            sx={{ marginTop: "20px", width: "500px" }}
            required={true}
            name="password"
            label="Confirm New Password"
            type="password"
            onChange={(e) => {
              setCnfPwd(e.target.value);
            }}
            placeholder="Enter New Password"
            autoComplete="off"
            error={cnfPwd != changePwd.password}
          />
          <br />
          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={cnfPwd != changePwd.password}
          >
            Update Password
          </Button>
        </form>
      </Container>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
