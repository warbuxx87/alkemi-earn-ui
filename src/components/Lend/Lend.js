import React from "react";

import { Container, Grid, makeStyles } from "@material-ui/core";
import TotalValue from "./lendingInfo/TotalValue";
import TotalInterest from "./lendingInfo/TotalInterest";
import TotalApr from "./lendingInfo/TotalApr";
import LendingTable from "./lendingTable";
import ActiveLending from "./activeLending";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
}));

function Lend() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container spacing={3}>
        <Grid item lg={4} sm={6} xs={12}>
          <TotalValue />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TotalInterest />
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <TotalApr />
        </Grid>
        <Grid item lg={12} xs={12}>
          <ActiveLending />
        </Grid>
        <Grid item lg={12} xs={12}>
          <LendingTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Lend;
