import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import api from "../api";
import { FormControl } from "@mui/material";
import DOMPurify from "dompurify";
import "./../../App.css";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(true);
  const [err, setErr] = useState(false);
  const chgname_init_values = {
    name: isAuthenticated["name"],
    email: isAuthenticated["email"],
  };
  const [changeName, setChangeName] = useState(chgname_init_values);
  const token = isAuthenticated["token"];

  const dataHandler = (e) => {
    setErr(false);
    const sanitized_name = DOMPurify.sanitize(e.target.name);
    const sanitized_value = DOMPurify.sanitize(e.target.value);

    setChangeName((prev) => ({
      ...prev,
      [sanitized_name]: sanitized_value,
    }));
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // console.log("form submitted :", changeName);
    if (isAuthenticated["name"] !== changeName.name) {
      try {
        await api
          .post("/changename", changeName, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // console.log("changename res",res)
            window.alert(res.data["message"]);
            navigate("/login");
          })
          .catch((err) => {
            console.log("error", err);
          });
      } catch (err) {
        console.log("Catch Error :", err);
      }
    } else setErr(true);
  };

  // console.log("user details", isAuthenticated);
  // console.log("changeName", changeName);
  // console.log("edit", edit);

  return (
    <div>
      <Typography variant="h6" component="h6">
        My Account
      </Typography>
      <Container>
        <form onSubmit={formSubmitHandler}>
          <FormControl>
            <TextField
              sx={{ marginTop: "20px", minWidth: "500px" }}
              required={true}
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={changeName?.email}
              onChange={dataHandler}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              required={true}
              fullWidth
              sx={{ marginTop: "20px", minWidth: "500px" }}
              label="Name"
              name="name"
              value={changeName?.name}
              onChange={dataHandler}
              autoComplete="off"
              InputProps={{
                readOnly: edit,
              }}
              error={err}
            />

            {edit && (
              <Button
                sx={{ margin: "20px 0" }}
                fullWidth
                size="medium"
                variant="contained"
                onClick={() => setEdit(false)}
              >
                EDIT Name
              </Button>
            )}
            {!edit && (
              <div style={{ display: "flex" }}>
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  sx={{ width: "50%", margin: "20px 10px 20px 0px" }}
                >
                  UPDATE Name
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{ width: "50%", margin: "20px 0px 20px 10px" }}
                  onClick={() => {
                    setChangeName(chgname_init_values);
                    setEdit(true);
                  }}
                >
                  CANCEL
                </Button>
              </div>
            )}
          </FormControl>
        </form>
      </Container>
    </div>
  );
}

export default MyAccount;
