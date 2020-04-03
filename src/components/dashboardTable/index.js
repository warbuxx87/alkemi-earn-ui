import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import dai from "../../assets/images/dai.png";
import usdc from "../../assets/images/usdc.png";
import eth from "../../assets/images/eth.png";
import wbtc from "../../assets/images/wbtc.png";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#202123",
    color: theme.palette.common.white,
    opacity: "1",
    fontSize: "12px",
    lineHeight: "1px",
    letterSpacing: 0,
    borderBottom: "1px solid #000000"
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
    borderBottom: "1px solid #000000"
  }
}))(TableCell);

function createData( symbol, image, asset, balance, value, apr) {
  return { symbol, image, asset, balance, value, apr };
}

const rows = [
  createData("ETH", eth, 159, 2344333.7, "8.34%", 52223.3),
  createData("DAI", dai, 237, 167736.90, "12.34%", 1928.88),
  createData("USDC", usdc, 262, 16.0, "24%", 6.0),
  createData("BTC", wbtc, 305, 3.7, "24%", 4.3)
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const columns = [
    { id: "1", label: "Asset", minWidth: 200 },
    { id: "2", label: "Balance", minWidth: 120, align: "center" },
    { id: "3", label: "Value", minWidth: 100, align: "center" },
    { id: "4", label: "Lending APR %", minWidth: 100, align: "center" },
    { id: "5", label: "Earnings", minWidth: 100,  align: "center" }
  ];

  return (
    <Grid className="tableCurrent">
      <Grid container className="bg_title">
        <Grid item md={6}>
          <Grid className="table_name">Active Deposits</Grid>
        </Grid>
        <Grid item md={6} className="add">
          <Grid className="addAsset">Manage</Grid>
        </Grid>
      </Grid>
      <TableContainer className="table">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <StyledTableCell
                  key={i}
                  className={classes.row}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.symbol}>
                <StyledTableCell component="th" scope="row">
                  <Grid container>
                    <Grid item md={5}>
                      <Grid>
                        <img className="imageSize" src={row.image} alt="{row.symbol}" />
                      </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid>{row.symbol}</Grid>
                      <Grid className="unit">{row.unit}</Grid>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="center">{row.asset}</StyledTableCell>
                <StyledTableCell align="center">{row.balance}</StyledTableCell>
                <StyledTableCell align="center">{row.value}</StyledTableCell>
                <StyledTableCell align="center">{row.apr}</StyledTableCell>
                <StyledTableCell align="center" class="lastest">{row.earnings}</StyledTableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
