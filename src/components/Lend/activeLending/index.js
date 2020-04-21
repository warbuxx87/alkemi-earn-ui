import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import SupplyModal from "./supplyModal";
import WithdrawModal from "./withdrawModal";
import styles from "./styles";

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "#202123",
      color: '#a7a7a7',
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

export default function CustomizedTables({ data }) {
  const classes = styles();
  const columns = [
    { id: "1", label: "Asset", minWidth: 200 },
    { id: "2", label: "Wallet Balance", minWidth: 120, align: "right" },
    { id: "3", label: "Balance", minWidth: 100, align: "right" },
    {
      id: "4",
      label: "APR %",
      minWidth: 100,
      align: "right",
      style: "percent",
      format: value => value.toFixed(2),
    },
    {
      id: "5",
      label: "Collateral",
      minWidth: 100,
      align: "right",
      format: value => value.toFixed(2),
    },
    {
      id: "6",
      label: "",
      minWidth: 280,
      align: "right",
      format: value => value.toFixed(2),
    }
  ];

  return (
    <Grid className={classes.tableALending}>
      <Grid container className={classes.bg_title}>
        <Grid item md={6}>
          <Grid className={classes.table_name}>Active Lending Reserves</Grid>
        </Grid>
        <Grid item md={6} className={classes.add}></Grid>
      </Grid>

      <TableContainer className={classes.table}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <StyledTableCell
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
            {data.map(row => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <Grid container>
                    <Grid item md={5}>
                      <Grid>
                        <img className={classes.imageSize} src={row.image} alt="dai" />
                      </Grid>
                    </Grid>
                    <Grid item md={7}>
                      <Grid>{row.name}</Grid>
                      <Grid className={classes.unit}>{row.unit}</Grid>
                    </Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Grid>
                    <Grid>{row.wallet}</Grid>
                    <Grid className={classes.unit}>{row.wallet_2}</Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Grid>
                    <Grid>{row.balance}</Grid>
                    <Grid className={classes.unit}>{row.balance_2}</Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Grid>
                    <Grid>{row.apr}</Grid>
                    <Grid className={classes.unit}>{row.apr_2}</Grid>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Switch
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Grid className={classes.lastest} container>
                    <Grid
                      item
                      md={6}
                      xs
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <WithdrawModal> </WithdrawModal>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <SupplyModal> </SupplyModal>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
