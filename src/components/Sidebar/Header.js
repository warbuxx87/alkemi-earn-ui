// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

import withStyles from "@mui/styles/withStyles";

// Section 3: Components & Containers import from the application
import logo from "assets/images/logo-white.svg";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        ...theme.mixins.toolbar,
        justifyContent: "space-between",
        width: "inherit",
        overflow: "hidden",
        marginLeft: 22,
        marginRight: 20,
        [theme.breakpoints.down("sm")]: {
            marginLeft: 8,
            marginRight: 16,
        },
    },
    image: {
        maxWidth: "125px",
        minWidth: "125px",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "130px",
            minWidth: "130px",
        },
    },
    menu: {
        width: 35,
        height: 35,
        padding: 0,
    },
    activeMenu: {
        backgroundColor: "#151617",
    },
});

// Section 5: Code Component
const SidebarHeader = ({ classes, open, onOpen, onClose }) => {
    return (
        <div className={classes.drawerHeader}>
            <img className={classes.image} src={logo} alt={"Alkemi Logo"} />
        </div>
    );
};

// Section 6: Documentation with PropTypes
SidebarHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default withStyles(styles)(SidebarHeader);
