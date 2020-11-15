// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    withWidth,
    withStyles,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarLiquidateItem from "containers/Sidebar/LiquidateItem";
import SidebarHeader from "containers/Sidebar/Header";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    drawer: {
        width: 280,
        marginLeft: 24,
        flexShrink: 0,
        "@media (min-width:1550px)": {
            marginLeft: 35,
            width: 340,
        },
    },
    drawerInner: {
        overflowX: "hidden",
    },
    drawerOpen: {
        width: 280,
        "@media (min-width:1550px)": {
            width: 340,
        },
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 70,
        [theme.breakpoints.up("sm")]: {
            width: 70,
        },
        "&:hover": {
            width: 280,
            "@media (min-width:1550px)": {
                width: 340,
            },
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    drawerPaper: {
        // width: drawerWidth,
        height: "calc(100% - 45px)",
        borderRadius: 4,
        margin: "22px 0px 0px 24px",
        "@media (min-width:1550px)": {
            margin: "22px 0px 0px 35px",
        },
        color: "white",
        border: "none",
    },

    bottomPush: {
        position: "fixed",
        bottom: 10,
        paddingBottom: 10,
        maxWidth: 280,
        "@media (min-width:1550px)": {
            maxWidth: 340,
        },
    },
});

// Section 5: Code Component
function Sidebar({ classes, width, variant, open }) {
    const content = (
        <Box className={classes.drawerInner}>
            <SidebarHeader />
            <Box display="flex" flexDirection="column">
                <Divider className={classes.divider} />
                <Box pt={1} pb={1}>
                    <List className={classes.list}>
                        <SidebarDashboardItem />
                        <SidebarLendItem />
                        <SidebarBorrowItem />
                        <SidebarMarketsItem />
                        <SidebarHistoryItem />
                        <SidebarLiquidateItem />
                    </List>
                </Box>
                <Divider className={classes.divider} />
                <Box width={1} className={classes.bottomPush}>
                    <Divider className={classes.divider} />
                    <Box py={2} px={2}>
                        <Typography variant="body2" color="textSecondary">
                            {process.env.REACT_APP_VERSION}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden mdDown>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx(classes.drawerPaper, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    anchor="left"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
}

// Section 6: Documentation with PropTypes
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    variant: PropTypes.string,
    open: PropTypes.bool,
};

// Section 7:  Connect styles and export
export default compose(withWidth(), withStyles(styles))(Sidebar);
