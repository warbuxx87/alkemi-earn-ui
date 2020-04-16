import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx';

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import logo from "assets/images/alkemi.png";

const styles = theme => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        ...theme.mixins.toolbar,
        justifyContent: "space-between",
        width: 'inherit',
        overflow: 'hidden',
        marginLeft: 20,
        marginRight: 20

    },
    image:{
      width:"163px",
      height:"27px",
    },
    menu: {
        width: 35,
        height: 35, 
        padding: 0
    },
    activeMenu: {
        backgroundColor: '#151617'
    }
});

const SidebarHeader = ({ classes, open, onOpen, onClose }) => {
    return (
        <div className={classes.drawerHeader}>
            <img className={classes.image} src={logo} alt={"Alkemi Logo"} />
            <IconButton onClick={open ? onClose : onOpen} className={clsx(classes.menu, { [classes.activeMenu]: open })}>
                <MenuIcon fontSize="small" />
            </IconButton>
        </div>
    );
};

SidebarHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(SidebarHeader);
