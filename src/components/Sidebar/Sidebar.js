import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
// import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
// import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
// import SidebarLiquidateItem from "containers/Sidebar/LiquidateItem";
import SidebarHeader from "containers/Sidebar/Header";

const styles = theme => ({
    drawer: {
        width: 280,
        marginLeft: 24,
        flexShrink: 0,
        "@media (min-width:1550px)": {
            marginLeft: 35,
            width: 340
        }
    },
    drawerInner: {
        overflowX: "hidden"
    },
    drawerOpen: {
        width: 280,
        "@media (min-width:1550px)": {
            width: 340
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: 70,
        [theme.breakpoints.up("sm")]: {
            width: 70
        },
        "&:hover": {
            width: 280,
            "@media (min-width:1550px)": {
                width: 340
            },
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }
    },
    drawerPaper: {
        // width: drawerWidth,
        margin: "22px 0px 0px 24px",
        "@media (min-width:1550px)": {
            margin: "22px 0px 0px 35px"
        },
        background: "#202123",
        color: "white",
        border: "none"
    },
    divider: {
        backgroundColor: theme.palette.common.black
    }
});

const Sidebar = ({ classes, width, variant, open }) => {
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })
            }}
            anchor="left"
        >
            <div className={classes.drawerInner}>
                <SidebarHeader />
                <Divider className={classes.divider} />
                <List className={classes.list}>
                    <SidebarDashboardItem />
                    <SidebarLendItem />
                    <SidebarBorrowItem />
                </List>
                <Divider className={classes.divider} />
            </div>
        </Drawer>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    variant: PropTypes.string,
    open: PropTypes.bool
};

export default compose(withWidth(), withStyles(styles))(Sidebar);
