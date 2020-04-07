import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "./styles";
import BorrowTables from "./borrowTable";
import LendTables from "./lendTable";


export default function CustomizedTables() {
  const classes = styles();

  return (
    <Grid container  spacing={3} className={classes.tableDashboard} >
      <Grid item md={6} xs>
        <LendTables></LendTables>
      </Grid>
      <Grid item md={6} xs>
        <BorrowTables></BorrowTables>
      </Grid>
    </Grid>
  );
}
