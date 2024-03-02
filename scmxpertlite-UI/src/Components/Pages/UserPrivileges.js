import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Auth/AuthProvider";
import api from "../api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "theme.palette.action.hover",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function UserPrivileges() {
  const [users, setUsers] = useState({});
  const { isAuthenticated } = useAuth();
  const [pageRefresh, setPageRefresh] = useState(true);
  let token = isAuthenticated["token"];

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated.role === "admin") {
        try {
          await api
            .get("/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setUsers(res.data);
            })
            .catch((err) => {
              console.error("Error:", err);
            });
        } catch (err) {
          console.log("Catch Error :", err);
        }
      }
    };

    fetchData();
  }, [pageRefresh, isAuthenticated]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await formSubmitHandler(event.target.name, event.target.value);
  };

  const formSubmitHandler = async (email, role) => {
    // console.log("form submitted :", email, role);
    try {
      await api
        .post(
          "/makeadmin",
          { email: email, role: role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // console.log("makeadmin res",res)
          window.alert(res.data["message"]);
          setPageRefresh((prev) => !prev);
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (err) {
      console.log("Catch Error :", err);
    }
  };

  return (
    <div>
      <Typography variant="h6" component="h6">
        User Privileges
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TableContainer component={Paper}>
          <Table sx={{ marginTop: "25px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 &&
                users?.map((row) => (
                  <StyledTableRow key={row?.email}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row?.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row?.email}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row?.role}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Button
                        // type="submit"
                        name={row?.email}
                        size="medium"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(event) => {
                          let name_str = row?.name;
                          let role_str =
                            row?.role == "admin" ? "user" : "admin";

                          if (
                            window.confirm(
                              "Clicking on Ok, will make " +
                                name_str +
                                " as " +
                                role_str
                            )
                          ) {
                            handleFormSubmit(event);
                          }
                        }}
                        value={row?.role === "admin" ? "user" : "admin"}
                        disabled={row?.name === isAuthenticated["name"]}
                      >
                        {row?.role === "admin" ? "Make User" : "Make Admin"}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </form>
    </div>
  );
}

export default UserPrivileges;
