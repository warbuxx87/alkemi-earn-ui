// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";

// Section 3: Components & Containers import from the application
import LendModalSupply from "./ModalSupply";
import LendModalWithdraw from "./ModalWithdraw";
import LendTableCell from "./TableCell";

const styles = theme => ({
  tableALending: {
    color: "white"
  },
  bg_title: {
    backgroundColor: "#202123",
    height: "55px",
    borderBottom: "1px solid #000000"
  },
  table_name: {
    letterSpacing: "0",
    color: "#FFFFFF",
    fontSize: "16px",
    padding: "15px 20px"
  },
  add: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "19px"
  },
  addAsset: {
    background: "#000000 0% 0% no-repeat padding-box!important",
    borderRadius: "100px!important",
    opacity: "0.3",
    width: "94px",
    height: "28px",
    paddingTop: "3px!important",
    paddingLeft: "20px!important",
    margin: "12px 0!important",
    color: "white!important"
  },
  table: {
    color: "white!important",
    backgroundColor: "#202123",
    minWidth: "700"
  },
  table_row: {
    color: "white!important"
  },
  imageSize: {
    width: "39px",
    height: "39px"
  },
  unit: {
    letterSpacing: "0.01px",
    color: "#FFFFFF",
    opacity: "1"
  },
  lastest: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btnActive: {
    width: "122px",
    height: "32px",
    borderRadius: "23px",
    opacity: "1",
    color: "black",
    textTransform: "capitalize",
    paddingTop: "4px"
  },

  btnActiveOutline: {
    width: "122px",
    height: "32px",
    borderRadius: "23px",
    opacity: "1",
    color: "white",
    border: "1px solid white",
    textTransform: "capitalize",
    paddingTop: "4px"
  },

  tableCurrent: {
    paddingTop: "20px !important"
  },
  MuiTableHeadroot: {
    backgroundColor: "#ffffff"
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "#202123",
    color: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  chart: {
    maxHeight: 150
  },
  borderChart: {
    padding: 0
  },
  scroll: {
    overflowY: "scroll"
  },
  titleSupply: {
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    padding: "18px 20px 14px 20px",
    textAlign: "center"
  },
  supplyChart: {
    backgroundColor: "#1B1B1B"
  },
  supplyPercent: {
    letterSpacing: "0px",
    color: "#00A577",
    opacity: 1,
    fontSize: "28px",
    fontWeight: "500",
    textAlign: "center",
    // backgroundColor:'#1B1B1B',
    padding: "25px 0"
  },
  simpleModalChart: {
    // backgroundColor:'#1B1B1B',
    paddingBottom: "30px"
  },
  supplyCon: {
    paddingTop: "20px",
    paddingLeft: "22px",
    paddingRight: "22px",
    width: "100%",
    color: "green !important"
  },
  buttonWrap: {
    // width: 90px;
    // width: '100%',
    marginTop: "30px",
    textAlign: "center",
    // backgroundColor:'#00A793',
    // height: '55px',
    marginBottom: "23px"
    // paddingTop:'10px'
  },
  btnSupply: {
    width: "100%",
    textAlign: "center",
    borderColor: " #00A577 !important",
    backgroundColor: "#00A577 !important",
    color: "#FFFFFF !important",
    height: "52px",
    fontSize: "16px"
  },

  divSupply: {
    paddingTop: "40px",
    paddingBottom: "30px"
  },

  // &:hover {
  //     background-color: rgba(#8472FF, 0.85) !important;
  //     border-color: rgba(#8472FF, 0.85) !important;
  //     color: #FFFFFF !important;
  // }

  // &.disable-button {
  //     background-color: #00A577 !important;
  //     border-color: #00A577 !important;
  //     color: #f7f7f7 !important;
  // }

  inputWrap: {
    position: "relative"
  },
  antInput: {
    backgroundColor: "#161719 !important",
    border: "1px solid #000000",
    height: "40px"
  },
  maxTips: {
    position: "absolute",
    right: "15px",
    top: "17px",
    cursor: "pointer",
    color: "#ffffff",
    fontSize: "14px"
  },
  input: {
    background: "#1B1B1B 0% 0% no-repeat padding-box",
    border: "1px solid #000000",
    opacity: 1,
    width: "412px",
    height: "54px",
    paddingLeft: "10px",
    color: "white",
    fontSize: "18px"
  },
  amount: {
    color: "white",
    paddingBottom: "10px"
  },
  rateInfo: {
    color: "white",
    fontSize: "14px",
    marginTop: "20px"
  },
  rateRow: {
    padding: "12px 0",
    borderBottom: "1px dashed #a7a7a7"
  },
  closeIcon: {
    paddingRight: "10px",
    cursor: "pointer"
  },
  textSupply: {
    paddingLeft: "40px"
  },

  walletBalance: {
    color: "#a7a7a7"
  }
});

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
    format: value => value.toFixed(2)
  },
  {
    id: "5",
    label: "Collateral",
    minWidth: 100,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "6",
    label: "",
    minWidth: 280,
    align: "right",
    format: value => value.toFixed(2)
  }
];

// Section 5: Code Component
const LendTableActive = ({ classes, data, columns }) => (
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
              <LendTableCell
                className={classes.row}
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </LendTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
              <LendTableCell component="th" scope="row">
                <Grid container>
                  <Grid item md={5}>
                    <Grid>
                      <img
                        className={classes.imageSize}
                        src={row.image}
                        alt="dai"
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={7}>
                    <Grid>{row.name}</Grid>
                    <Grid className={classes.unit}>{row.unit}</Grid>
                  </Grid>
                </Grid>
              </LendTableCell>
              <LendTableCell align="right">
                <Grid>
                  <Grid>{row.wallet}</Grid>
                  <Grid className={classes.unit}>{row.wallet_2}</Grid>
                </Grid>
              </LendTableCell>
              <LendTableCell align="right">
                <Grid>
                  <Grid>{row.balance}</Grid>
                  <Grid className={classes.unit}>{row.balance_2}</Grid>
                </Grid>
              </LendTableCell>
              <LendTableCell align="right">
                <Grid>
                  <Grid>{row.apr}</Grid>
                  <Grid className={classes.unit}>{row.apr_2}</Grid>
                </Grid>
              </LendTableCell>
              <LendTableCell align="right">
                <Switch
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              </LendTableCell>
              <LendTableCell align="center">
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
                    <LendModalWithdraw> </LendModalWithdraw>
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
                    <LendModalSupply> </LendModalSupply>
                  </Grid>
                </Grid>
              </LendTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
);

// Section 6: Documentation with PropTypes
LendTableActive.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired
};

// Section 7:  Connect styles and export
export default withStyles(styles)(LendTableActive);
