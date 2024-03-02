import React, { useEffect, useState } from "react";
import api from "../api";
import { Typography } from "@mui/material";
import { useAuth } from "../Auth/AuthProvider";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function MyShipments() {
  const { isAuthenticated } = useAuth();
  const [myShipments, setMyShipments] = useState([]);
  let query;
  const token = isAuthenticated["token"];

  useEffect(() => {
    query =
      isAuthenticated["role"] === "admin" ? "/allshipments" : "/myshipments";

    const fetchData = async () => {
      await api
        .get(query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log("response :",res)
          setMyShipments(res.data);
        })
        .catch((err) => {
          console.log("Error :", err);
        });
    };
    fetchData();
  }, []);
  // console.log("myshipments :", myShipments);

  return (
    <div>
      <Typography variant="h6" component="h6">
        My Shipments
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ marginTop: "30px", minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Shipment no.</StyledTableCell>
              <StyledTableCell>Batch ID</StyledTableCell>
              <StyledTableCell align="left">Container no</StyledTableCell>
              <StyledTableCell align="left">Delivery no</StyledTableCell>
              <StyledTableCell align="left">Device</StyledTableCell>
              <StyledTableCell align="left">Expected DoD</StyledTableCell>
              <StyledTableCell align="left">Goods Type</StyledTableCell>
              <StyledTableCell align="left">NDC Number</StyledTableCell>
              <StyledTableCell align="left">PO Number</StyledTableCell>
              <StyledTableCell align="left">Route Details</StyledTableCell>
              <StyledTableCell align="left">
                Shipment Description
              </StyledTableCell>

              <StyledTableCell align="left">S.No.of goods</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myShipments.length > 0 &&
              myShipments?.map((row) => (
                <StyledTableRow key={row?.shipmentno}>
                  <StyledTableCell component="th" scope="row">
                    {row?.shipmentno}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.batchid}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.containerno}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.deliveryno}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.device}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.expdeliverydate}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.goodstype}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.ndcnumber}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.ponumber}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.routedetails}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.shipmentdescr}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {row?.snogoods}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MyShipments;
