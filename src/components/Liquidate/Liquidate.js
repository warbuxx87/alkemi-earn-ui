import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import logo from "./logo.svg";

const styles = theme => ({
    home: {
        textAlign: "center"
    },
    homeLogo: {
        height: "80px"
    },
    homeHeader: {
        height: "150px",
        padding: "20px"
    },
    homeTitle: {
        fontSize: "1.5em"
    },
    homeIntro: {
        fontSize: "large"
    }
});

const Liquidate = ({ classes }) => (
    <div className={classes.home}>
        <div className={classes.homeHeader}>
            <img src={logo} className={classes.homeLogo} alt="logo" />
            <h1 className={classes.homeTitle}>Welcome to Alkemi UI Template</h1>
        </div>
        <p className={classes.homeIntro}>
            This is the Liquidate Page
        </p>
    </div>
);

Liquidate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Liquidate);
