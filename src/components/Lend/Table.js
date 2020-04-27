// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import CircularProgress from "@material-ui/core/CircularProgress";

// Section 3: Components & Containers import from the application
import LendTableCell from "./TableCell";

const styles = theme => ({
  head: {
    backgroundColor: "#202123",
    color: "#a7a7a7",
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
  },
  tableLending: {
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
    padding: "15px 20px",
    fontWeight: "500"
  },
  add: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "19px"
  },
  addAsset: {
    background: "#161719 0% 0% no-repeat padding-box!important",
    borderRadius: "100px!important",
    opacity: "1",
    width: "122px",
    height: "28px",
    paddingTop: "3px!important",
    paddingLeft: "12px",
    paddingRight: "12px",
    margin: "12px 0!important",
    color: "white",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: "400"
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
    border: "1px solid #FFFFFF",
    borderRadius: "23px",
    opacity: "1",
    paddingTop: "5px"
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
  }
});

const Columns = [
  { id: "1", label: "Asset", minWidth: 200 },
  { id: "2", label: "Wallet Balance", minWidth: 120, align: "right" },
  { id: "3", label: "Balance", minWidth: 100, align: "right" },
  {
    id: "4",
    label: "APR %",
    minWidth: 100,
    align: "right"
    //format: value => value.toLocaleString(),
  },
  {
    id: "5",
    label: "Collateral",
    minWidth: 100,
    align: "right"
    // format: value => value.toFixed(2),
  },
  {
    id: "6",
    label: "",
    minWidth: 280,
    align: "right"
    // format: value => value.toFixed(2),
  }
];

// Section 5: Code Component
const LendTable = ({ classes, onboard, data = [], loading={}, onActivate }) => (
  <Grid className={classes.tableLending}>
    <Grid container className={classes.bg_title}>
      <Grid item md={6}>
        <Grid className={classes.table_name}>Current Markets</Grid>
      </Grid>
      <Grid item md={6} className={classes.add}>
        <Button className={classes.addAsset}>Add Asset +</Button>
      </Grid>
    </Grid>
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Columns.map((Column, i) => (
              <LendTableCell
                className={classes.Row}
                key={Column.id}
                align={Column.align}
                style={{ minWidth: Column.minWidth }}
              >
                {Column.label}
              </LendTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(Row => (
            <TableRow key={Row.name}>
              <LendTableCell component="th" scope="Row" align="left">
                <Grid container>
                  <Grid item md={5}>
                    <Grid>
                      <img
                        className={classes.imageSize}
                        src={Row.image}
                        alt="dai"
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={7}>
                    <Grid>{Row.name}</Grid>
                    <Grid className={classes.unit}>{Row.unit}</Grid>
                  </Grid>
                </Grid>
              </LendTableCell>
              <LendTableCell align="right">{Row.wallet}</LendTableCell>
              <LendTableCell align="right">{Row.balance}</LendTableCell>
              <LendTableCell align="right">{Row.apr}</LendTableCell>
              <LendTableCell align="right">
                <Switch
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              </LendTableCell>
              <LendTableCell align="right">
                <Grid className="lastest" container>
                  <Grid
                    item
                    md={6}
                    xs
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    {/* <Grid className={classesbtnActive">
                          Active
                        </Grid> */}
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
                    <Button
                      type="button"
                      className={classes.btnActiveOutline}
                      variant="outlined"
                      color="secondary"
                      disable={loading[Row.unit]}
                      onClick={() => onActivate(Row.unit)}
                    >
                      {loading[Row.unit] ? (
                        <CircularProgress size={20} color="white" />
                      ) : (
                        "Activate"
                      )}
                    </Button>
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

// Documentation with PropTypes
LendTable.propTypes = {
  classes: PropTypes.object.isRequired,
  onboard: PropTypes.object.isRequired
};

export default withStyles(styles)(LendTable);
