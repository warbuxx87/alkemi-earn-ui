// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { Container, Grid } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowingTable from "./Table";
import BorrowTableActive from "./TableActive";
import BorrowCardValue from "./CardValue";
import BorrowCardInterest from "./CardInterest";
import BorrowCardAPR from "./CardAPR";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = theme => ({
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
});

// Section 5: Code Component

const Borrow = ({ classes, inactiveBorrow, activeBorrow, onActivate }) => (
  <Container maxWidth={false} className={classes.container}>
    <Grid container spacing={3}>
      <Grid item lg={4} sm={6} xs={12}>
        <BorrowCardValue />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <BorrowCardInterest />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <BorrowCardAPR />
      </Grid>

      {!!activeBorrow.length && <BorrowTableActive data={activeBorrow} />}
      {!!inactiveBorrow.length && (
        <BorrowingTable
          inactiveBorrow={inactiveBorrow}
          onActivate={onActivate}
        />
      )}
    </Grid>
  </Container>
);

// Section 6: Documentation with PropTypes
Borrow.propTypes = {
  classes: PropTypes.object.isRequired,
  onActivate: PropTypes.func.isRequired,
  activeBorrow: PropTypes.array.isRequired,
  inactiveBorrow: PropTypes.array.isRequired
};

// Section 7:  Connect styles and export
export default withStyles(styles)(Borrow);
