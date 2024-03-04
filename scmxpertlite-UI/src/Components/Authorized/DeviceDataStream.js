import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "blue",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DeviceDataStream(props) {
  const [deviceData, setDeviceData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setDeviceData(props.deviceData);
  }, [props.deviceData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
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
            {(rowsPerPage > 0
              ? deviceData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : deviceData
            ).map((row, i) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={deviceData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
