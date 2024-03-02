import React, { useState, useEffect } from "react";
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

export default function DeviceDataStream(props) {
  const [deviceData, setDeviceData] = useState([]);
  // console.log("props ", props);
  // console.log("devicedata",deviceData)

  useEffect(() => {
    setDeviceData(props.deviceData);
  }, [props.deviceData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Device ID</StyledTableCell>
            <StyledTableCell align="left">Route From</StyledTableCell>
            <StyledTableCell align="left">Route To</StyledTableCell>
            <StyledTableCell align="left">Battery Level</StyledTableCell>
            <StyledTableCell align="left">Temperature (&deg;C)</StyledTableCell>
            <StyledTableCell align="left">Timestamp</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deviceData.length > 0 &&
            deviceData?.map((row, i) => (
              <StyledTableRow key={row?.deviceid + String(i)}>
                <StyledTableCell component="th" scope="row">
                  {row?.deviceid}
                </StyledTableCell>
                <StyledTableCell align="left">{row?.routefrom}</StyledTableCell>
                <StyledTableCell align="left">{row?.routeto}</StyledTableCell>
                <StyledTableCell align="left">
                  {row?.batterylevel}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.firstsensortemp}
                </StyledTableCell>
                <StyledTableCell align="left">{row?.timestamp}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
