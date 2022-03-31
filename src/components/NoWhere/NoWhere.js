import React from "react";
import PropTypes from "prop-types";

import ReportIcon from "@mui/icons-material/Report";
import withStyles from "@mui/styles/withStyles";
import { grey } from "@mui/material/colors";

import NoWhereDashboardButton from "../../containers/NoWhere/DashboardButton";

const styles = (theme) => ({
    nowhere: {
        textAlign: "center",
    },
    nowhereHeader: {
        padding: theme.spacing(3),
    },
    nowhereTitle: {
        fontSize: "1.5em",
        color: grey[500],
    },
    nowhereIcon: {
        height: 80,
        width: 80,
        color: grey[500],
    },
});

const NoWhere = ({ classes }) => (
    <div className={classes.nowhere}>
        <div className={classes.nowhereHeader}>
            <ReportIcon className={classes.nowhereIcon} />
            <h1 className={classes.nowhereTitle}>
                Oops... It seems that you are lost!
            </h1>
        </div>
        <NoWhereDashboardButton />
    </div>
);

NoWhere.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoWhere);
