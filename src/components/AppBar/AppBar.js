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
// import Settings from "./Settings";
import Other from "./Other";
import MobileMenu from "./MobileMenu";
import StatusDisplay from "./StatusDisplay";
import logo from "assets/images/logo-white.svg";

import { addressParser } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    connectWallet: {
        padding: "2px 2px 2px 0px",
        background: theme.palette.background.paper,
        "& .MuiButton-label": {
            justifyContent: "flex-end",
        },
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
    dropdown: {
        marginTop: "4px",
    },
    menuitem: {
        fontSize: "0.875rem",
    },
    address: {
        fontSize: "0.875rem",
        backgroundColor: "#000000",
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "2px",
        display: "inline-flex",
        paddingTop: "1px",
        height: "32px",
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
                <Hidden lgUp>
                    <MobileMenu walletIsLiquidator={walletIsLiquidator} />
                </Hidden>

                <Hidden mdDown>
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
                <Hidden lgUp>
                    <img
                        className={classes.logo}
                        src={logo}
                        alt={"Alkemi Logo"}
                    />
                </Hidden>
                <Box ml={2} flexGrow={1} />
                <Button
                    className={classes.connectWallet}
                    type="button"
                    color="secondary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={accountAddress ? handleClick : handleOnConnect}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        display="flex"
                    >
                        <Grid item>
                            {displayWalletStatus(walletConnected, walletIsKYCd)}
                        </Grid>
                        <Grid
                            item
                            className={classes.address}
                            data-testid="connectAddressButton"
                        >
                            <Box display="flex" alignItems="center">
                                {/* 0x121565...6456 */}
                                {accountAddress
                                    ? addressParser(accountAddress)
                                    : "Connect"}
                            </Box>
                        </Grid>
                    </Grid>
                </Button>
                <Menu
                    className={classes.dropdown}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    {
                        false && (
                            <MenuItem onClick={handleOnConnect}>
                                Change Wallet
                            </MenuItem>
                        ) /* TODO: show when using more than a single wallet */
                    }
                    {accountAddress ? (
                        <MenuItem
                            className={classes.menuitem}
                            onClick={handleOnReset}
                        >
                            Disconnect Wallet
                        </MenuItem>
                    ) : null}
                </Menu>
                <Hidden mdDown>
                    <Box ml={1}>
                        <Other />
                    </Box>
                </Hidden>
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
