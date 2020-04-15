import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import LayoutContent from "../../containers/Layout/Content";
import Sidebar from "../../containers/Sidebar/Sidebar";
import AppBar from "../../containers/AppBar/AppBar";

const styles = theme => ({
    frame: {
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100%"
    },
    content: {
        width: "100%",
        flexGrow: 1,
        background: '#000000',
        color: '#ffffff',
        // backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        //marginTop: 56,
        marginTop:'100px',
        marginLeft:'125px',
        marginRight:'100px',
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
            marginTop: 64
        },
    },
    contentShifted: {
        width: "calc(100% - 400px)",
        flexGrow: 1,
        background: '#202123',
        color: '#ffffff',
        // backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        //marginTop: 56,
        marginTop:'100px',
        marginLeft:'125px',
        marginRight:'100px',
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
            marginTop: 100
        },
        '@media (min-width: 1379px)': {
          marginLeft:'50px!important',
          marginRight:'25px!important',
        },
    }
});

const LayoutSkeleton = ({ classes }) => (
    <div className={classes.frame}>
        <AppBar />
        <Sidebar />
        <div className={classes.content}>
            <LayoutContent />
        </div>
    </div>
);

LayoutSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LayoutSkeleton);
