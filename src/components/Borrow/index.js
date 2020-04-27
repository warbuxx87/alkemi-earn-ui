import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import BorrowingTable from "./Table";
import styles from "./styles";

export default function PermanentDrawerLeft() {
  const classes = styles();
  return (
    <div className={classes.borrowing}>
      <Grid container spacing={3}>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
            <Grid className={classes.title}>Aggregated USD Value</Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.valuable}>$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
            <Grid className={classes.title}>Interest Paid</Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.valuable}>$0.00</Grid>
          </Grid>
        </Grid>
        <Grid className={classes.box} item xs>
          <Grid className={classes.info_box}>
            <Grid className={classes.title}>Average Interest APR</Grid>
            <Divider className={classes.divider} />
            <Grid className={classes.valuable}>0.00%</Grid>
          </Grid>
        </Grid>
      </Grid>
      <BorrowingTable></BorrowingTable>
    </div>
  );
}
