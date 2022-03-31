import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
    button: {
        margin: theme.spacing(3),
    },
});

const NoWhereDashboardButton = ({ classes, onClick }) => (
    <Button variant="outlined" className={classes.button} onClick={onClick}>
        Bring me back home!
    </Button>
);

NoWhereDashboardButton.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(NoWhereDashboardButton);
