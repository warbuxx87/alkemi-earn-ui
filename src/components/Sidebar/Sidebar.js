// Main Component

// Section 1: React low level imports
import { useState } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    Link,
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
import { PoolPopover } from "./PoolSelect";
import { CustomCube as CloudIcon } from "../UI/Icons/custom-cube";

// Section 4: Define Styles function taking theme as argument and returning an object

const styles = (theme) => ({
    drawer: {
        width: 280,
        marginLeft: 24,
        flexShrink: 0,
        "@media (min-width:1940px)": {
            marginLeft: 35,
            width: 300,
        },
    },
    drawerInner: {
        overflowX: "hidden",
    },
    drawerOpen: {
        width: 280,
        "@media (min-width:1940px)": {
            width: 300,
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
        width: 68,
        [theme.breakpoints.up("sm")]: {
            width: 68,
        },
        "&:hover": {
            width: 280,
            "@media (min-width:1940px)": {
                width: 300,
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
});
const pools = [
    {
        id: "verified",
        name: "Verified Pool",
        icon: <CloudIcon />,
    },
    {
        id: "open",
        name: "Open Pool",
        icon: "assets/images/logo-white.svg",
    },
];
// Section 5: Code Component
function Sidebar({ classes, width, variant, open, walletIsLiquidator }) {
    const [currentPool, setCurrentPool] = useState(pools[0]);

    const handlePoolChange = (poolId) => {
        const newPool = pools.find((pool) => pool.id === poolId);

        if (!newPool) {
            return;
        }
        setCurrentPool(newPool);
    };
    const content = (
        <Box
            className={classes.drawerInner}
            display="flex"
            flexDirection="column"
            height={1}
        >
            <SidebarHeader />
            <Box flexDirection="column" flexGrow={1}>
                <Divider className={classes.divider} />
                <Box pt={1} pb={1}>
                    <Box px={2} pb={1}>
                        <List className={classes.list}>
                            <SidebarDashboardItem />
                            <SidebarLendItem />
                            <SidebarBorrowItem />
                            <SidebarMarketsItem />
                            <SidebarHistoryItem />
                            {walletIsLiquidator === true ? (
                                <SidebarLiquidateItem />
                            ) : null}
                        </List>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
            </Box>
            <Box className={classes.bottom}>
                <Box px={2}>
                    <PoolPopover
                        currentPool={currentPool}
                        onPoolChange={handlePoolChange}
                        pools={pools}
                    />
                </Box>
                <Box py={2} px={2}>
                    <Typography variant="body2" color="textSecondary">
                        <Link
                            href="https://docs.alkemi.network/earn-ui/changelog"
                            variant="body2"
                            color="inherit"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {process.env.REACT_APP_VERSION}
                        </Link>
                    </Typography>
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
