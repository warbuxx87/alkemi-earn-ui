import React from "react";
import PropTypes from "prop-types";

import LendingInfo from '../../components/Lend/lendingInfo';
import LendingTable from '../../components/Lend/lendingTable';
import ActiveLending from '../../components/Lend/activeLending'

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

});

const Lend = ({ classes }) => (
  <div className={classes.lend}>
    <LendingInfo></LendingInfo>
    <ActiveLending></ActiveLending>
    <LendingTable></LendingTable>
  </div>
);

Lend.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Lend);
