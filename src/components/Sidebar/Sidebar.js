// Main Component

// Section 1: React low level imports
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from "clsx";
import { LedgerHQFrame } from "utils/web3ReactConnectors";

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
import { LedgerHQFrame } from "utils/web3ReactConnectors";

// Section 3: Components & Containers import from the application
import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarLiquidateItem from "containers/Sidebar/LiquidateItem";
import SidebarFiatItem from "components/Sidebar/FiatItem";
import SidebarHeader from "containers/Sidebar/Header";
import PoolSelectContainer from "containers/Sidebar/PoolSelect";

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
    chip: {
        padding: "9px 12px 7px 12px",
        borderLeft: "solid 1px #868998",
    },
    chiptext: {
        lineHeight: 0,
        color: "#868998",
        letterSpacing: "1px",
        fontWeight: 500,
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

// Section 5: Code Component
function Sidebar({
    classes,
    width,
    variant,
    open,
    walletIsLiquidator,
    currentPool,
}) {
    const content = (
        <Box
            className={classes.drawerInner}
            display="flex"
            flexDirection="column"
            height={1}
        >
            {" "}
            <Box display="flex" alignItems="center">
                <SidebarHeader />
                <Box className={classes.chip}>
                    <Typography
                        variant="subtitle2"
                        className={classes.chiptext}
                    >
                        {currentPool === "open" ? "OPEN" : "VERIFIED"}
                    </Typography>
                </Box>
            </Box>
            <Box flexDirection="column" flexGrow={1}>
                <Divider className={classes.divider} />
                <Box pt={1} pb={1}>
                    <Box px={2} pb={1}>
                        <List className={classes.list}>
                            <SidebarDashboardItem />
                            <SidebarLendItem />
                            <SidebarBorrowItem />
                            <SidebarHistoryItem />
                            <SidebarMarketsItem />
                            {walletIsLiquidator === true ? (
                                <SidebarLiquidateItem />
                            ) : null}
                            {LedgerHQFrame.isLedgerApp() ? null : (
                                <SidebarFiatItem />
                            )}
                        </List>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
            </Box>
            <Box className={classes.bottom}>
                {LedgerHQFrame.isLedgerApp() ? null : (
                    <Box px={2}>
                        <PoolSelectContainer />
                    </Box>
                )}
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
