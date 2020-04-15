import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Borrowing from "../../components/Borrow";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

const Borrow = ({ classes }) => (
  <div className={classes.borrow}>
    <Borrowing></Borrowing>
  </div>
);

Borrow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Borrow);
