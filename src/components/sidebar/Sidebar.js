import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { compose } from "redux";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import SidebarDashboardItem from "../../containers/Sidebar/DashboardItem";
import SidebarLendItem from "../../containers/Sidebar/LendItem";
import SidebarBorrowItem from "../../containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "../../containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "../../containers/Sidebar/HistoryItem";
import SidebarLiquidateItem from "../../containers/Sidebar/LiquidateItem";



import SidebarHeader from "../../containers/Sidebar/Header";

const styles = theme => ({
    drawer: {
        height: "100vh",
        position: "fixed"
    },
    drawerPaper: {
        position: "relative",
        // margin: '22px 0px 0px 35px',
        background: '#202123',
        color: 'white',
        height: "100%",
        width: 240,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        width: 0,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up("sm")]: {
            width: 60
        }
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: 240
    },

});

const Sidebar = ({ classes, width, variant, open, onClose }) => {
    const isLargeScreen = isWidthUp("sm", width);
    return (
        <Drawer
            variant={isLargeScreen ? "permanent" : undefined}
            classes={
                isLargeScreen
                    ? {
                          docked: classes.drawer,
                          paper: classNames(
                              classes.drawerPaper,
                              !open && classes.drawerPaperClose
                          )
                      }
                    : {}
            }
            open={open}
            onClose={onClose}
        >
            <div className={classes.drawerInner}>
                <SidebarHeader />
                <List className={classes.list}>
                    <SidebarDashboardItem />
                    <SidebarLendItem />
                    <SidebarBorrowItem />
                    <SidebarMarketsItem />
                    <SidebarHistoryItem />
                    <SidebarLiquidateItem />
                </List>
            </div>
        </Drawer>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    variant: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default compose(withWidth(), withStyles(styles))(Sidebar);
