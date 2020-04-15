import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import logo from '../../assets/images/alkemi.png';

const styles = theme => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 " + theme.spacing.unit + "px",
        ...theme.mixins.toolbar
    },
    image:{
      width:'163px',
      height:'27px',
    }
});

const SidebarHeader = ({ classes, onClick }) => {
    return (
        <div className={classes.drawerHeader}>
            <img className={classes.image} src={logo} alt={'Alkemi Logo'} />
            <IconButton onClick={onClick}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
    );
};

SidebarHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SidebarHeader);
