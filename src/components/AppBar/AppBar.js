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
import Rewards from "./Rewards";
import logo from "assets/images/logo-white.svg";

import { addressParser } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    connectWallet: {
        padding: "2px 2px 2px 0px",
        background: theme.palette.background.light,
        "& .MuiButton-label": {
            justifyContent: "flex-end",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: 8,
        },
        [theme.breakpoints.between("sm", "md")]: {
            marginRight: 24,
        },
    },
    appBar: {
        paddingLeft: "0px",
        paddingRight: "0px",
        [theme.breakpoints.down("xs")]: {
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "8px",
        },
    },
    title: {
        textTransform: "uppercase",
    },
    logo: {
        maxWidth: 130,
    },
    dropdown: {
        marginTop: "4px",
    },
    menuitem: {
        fontSize: "0.875rem",
    },
    address: {
        fontSize: "0.875rem",
        backgroundColor: theme.palette.background.default,
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
    btnConnect: {
        minWidth: 100,
        textTransform: "capitalize",
        fontWeight: 500,
        minHeight: 32,
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
    displayKYCStatus,
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

    const displayWalletStatus = ({ walletIsKYCd }) => {
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
    };

    const displayConnectionButton = ({
        walletConnected,
        walletIsKYCd,
        displayKYCStatus,
    }) => {
        if (!walletConnected)
            return (
                <Button
                    type="button"
                    className={classes.btnConnect}
                    variant="contained"
                    size="small"
                    onClick={handleOnConnect}
                    data-testid="connectButton"
                >
                    Connect
                </Button>
            );
        else {
            return (
                <Box display="flex">
                    <Box>
                        <Rewards />
                    </Box>
                    <Box ml={1}>
                        <Button
                            className={classes.connectWallet}
                            type="button"
                            color="secondary"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                display="flex"
                                justify="flex-end"
                            >
                                {displayKYCStatus ? (
                                    <Grid item>
                                        {displayWalletStatus({ walletIsKYCd })}
                                    </Grid>
                                ) : null}
                                <Grid item className={classes.address}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        data-testid="addressButton"
                                    >
                                        {/* 0x121565...6456 */}
                                        {accountAddress
                                            ? addressParser(accountAddress)
                                            : "Connect"}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Button>
                    </Box>
                </Box>
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
                {displayConnectionButton({
                    walletConnected,
                    walletIsKYCd,
                    displayKYCStatus,
                })}
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
                <Hidden lgUp>
                    <MobileMenu walletIsLiquidator={walletIsLiquidator} />
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
