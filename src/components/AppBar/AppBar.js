// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import MuiAppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import {
    Box,
    Button,
    Grid,
    Hidden,
    makeStyles,
    Toolbar,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
//import Settings from "./Settings";
//import Notifications from "./Notifications";
import MobileMenu from "./MobileMenu";
import StatusDisplay from "./StatusDisplay";
import logo from "assets/images/logo-white.svg";

import { addressParser } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    connectWallet: {
        minWidth: 130,
        padding: "4px 0",
        [theme.breakpoints.down("xs")]: {
            minWidth: 110,
            padding: "3px 0 2px 0",
            marginRight: 16,
        },
        [theme.breakpoints.between("sm", "md")]: {
            marginRight: 24,
        },
    },
    appBar: {
        paddingLeft: "0px",
        paddingRight: "0px",
    },
    title: {
        textTransform: "uppercase",
    },
    logo: {
        maxWidth: 140,
        marginLeft: 6,
    },
    address: {
        fontSize: "0.875rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.825rem",
        },
    },
}));

// Section 5: Code Component
function AppBar({
    title,
    onConnect,
    onReset,
    accountAddress,
    walletConnected,
    walletIsKYCd,
    walletIsLiquidator,
}) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOnConnect = (event) => {
        onConnect();
        setAnchorEl(null);
    };

    const handleOnReset = () => {
        onReset();
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const displayWalletStatus = (walletConnected, walletIsKYCd) => {
        if (!walletConnected)
            return (
                <StatusDisplay
                    color="secondary"
                    walletIsKYCd={walletIsKYCd}
                    tooltipTitle="Not connected"
                />
            );
        else {
            if (walletIsKYCd)
                return (
                    <StatusDisplay
                        color="success"
                        walletIsKYCd={walletIsKYCd}
                        tooltipTitle="KYC Authorized"
                    />
                );
            else
                return (
                    <StatusDisplay
                        color="warning"
                        walletIsKYCd={walletIsKYCd}
                        tooltipTitle="Not KYC Authorized"
                    />
                );
        }
    };

    return (
        <MuiAppBar
            color="transparent"
            position="relative"
            className={classes.appBar}
        >
            <Toolbar disableGutters={true}>
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-start"
                    wrap="nowrap"
                >
                    <Grid>
                        <Hidden lgUp>
                            <MobileMenu
                                walletIsLiquidator={walletIsLiquidator}
                            />
                        </Hidden>

                        <Hidden mdDown>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                            >
                                Overview
                            </Typography>
                            <Typography
                                variant="h4"
                                color="textPrimary"
                                data-testid="title"
                                noWrap
                                className={classes.title}
                            >
                                {title}
                            </Typography>
                        </Hidden>
                    </Grid>
                    <Hidden lgUp>
                        <img
                            className={classes.logo}
                            src={logo}
                            alt={"Alkemi Logo"}
                        />
                    </Hidden>
                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        justify="flex-end"
                    >
                        <Grid item>
                            {/*<Settings />
                            <Notifications />*/}
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.connectWallet}
                                type="button"
                                variant="outlined"
                                color="secondary"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={
                                    accountAddress
                                        ? handleClick
                                        : handleOnConnect
                                }
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    {displayWalletStatus(
                                        walletConnected,
                                        walletIsKYCd
                                    )}
                                    <Box
                                        className={classes.address}
                                        data-testid="connectAddressButton"
                                    >
                                        {/* 0x121565...6456 */}
                                        {accountAddress
                                            ? addressParser(accountAddress)
                                            : "Connect"}
                                    </Box>
                                </Box>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {
                                    false && (
                                        <MenuItem onClick={handleOnConnect}>
                                            Change Wallet
                                        </MenuItem>
                                    ) /* TODO: show when using more than a single wallet */
                                }
                                {accountAddress ? (
                                    <MenuItem onClick={handleOnReset}>
                                        Disconnect Wallet
                                    </MenuItem>
                                ) : null}
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </MuiAppBar>
    );
}

// Section 6: Documentation with PropTypes
AppBar.propTypes = {
    title: PropTypes.string,
    onConnect: PropTypes.func,
    onReset: PropTypes.func,
    accountAddress: PropTypes.string,
};

// Section 7:  Connect styles and export
export default AppBar;
