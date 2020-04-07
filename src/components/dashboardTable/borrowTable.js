import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import dai from "../../assets/images/dai.png";
import usdc from "../../assets/images/usdc.png";
import eth from "../../assets/images/eth.png";
import wbtc from "../../assets/images/wbtc.png";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import {
    useHistory
  } from "react-router-dom";

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
  createData("ETH", eth, 0, 0, 0, 0),
  createData("DAI", dai, 0, 0, 0, 0),
  createData("USDC", usdc, 0, 0, 0, 0),
  createData("BTC", wbtc, 0, 0, 0, 0)
];


export default function BorrowTables() {
  const classes = styles();
  let history = useHistory();
  const redirect = () => {
      history.push('/borrowing');
  }
  const columns = [
    { id: "1", label: "Asset", minWidth: 100, className:"asset_width" },
    { id: "2", label: "Borrowed", minWidth: 90, align: "center" },
    { id: "3", label: "Value", minWidth: 90, align: "center" },
    { id: "4", label: "Borrow APR %", minWidth: 120, align: "center" },
    { id: "5", label: "Earnings", minWidth: 90,  align: "center" }
  ];

  return (
      <Grid >
        <Grid container className={classes.bg_title}>
          <Grid item md={6}>
            <Grid className={classes.table_name}>Active Loans</Grid>
          </Grid>
          <Grid item md={6} className={classes.add}>
            {/* <Grid className={classes.addAsset}>Manage</Grid> */}
            <Button type="button" className={classes.addAsset} variant="contained" onClick={redirect}>
            Manage
            </Button>
          </Grid>
        </Grid>
        <TableContainer className={classes.table}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <StyledTableCell
                    key={i}
                    className={ column ? column.className : classes.row}
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
                      <Grid item md={4}>
                        <Grid>
                          <img className={classes.imageSize} src={row.image} alt="{row.symbol}" />
                        </Grid>
                      </Grid>
                      <Grid item md={8}>
                        <Grid>{row.symbol}</Grid>
                        <Grid className={classes.unit}>{row.unit}</Grid>
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
