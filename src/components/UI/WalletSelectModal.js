import React from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    Typography,
    makeStyles,
} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import metamaskLogo from "assets/images/wallets/metamask.svg";
import walletconnectLogo from "assets/images/wallets/walletconnect.svg";

const useStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialog-paperWidthMd": {
            maxWidth: "605px",
        },
    },
    connectButton: {
        fontSize: "0.8125rem",
        maxWidth: "110px",
    },
    dialogContent: {
        paddingTop: "0px",
        paddingBottom: "16px",
    },
    toggleSubtitle: {
        textTransform: "none",
        fontSize: "0.8125rem",
        fontWeight: "300",
        color: "#cecece",
    },
    toggleTitle: {
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#ffffff",
    },
    toggleButton: {
        flexWrap: "wrap",
        "& .MuiButtonBase-root": {
            borderRadius: "4px",
            padding: "16px",
        },
        "& .MuiToggleButton-label": {
            flexDirection: "column",
        },
        "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) ": {
            marginLeft: 16,
        },
        "& .MuiToggleButton-root": {
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            width: "270px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        },
        "& .MuiToggleButton-root:hover": {
            backgroundColor: "transparent",
        },

        "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "solid 1px rgba(255, 255, 255, .7) ",
        },
    },
    kyclink: {
        borderLeft: "0px",
        marginLeft: "4px !important",
        minWidth: "268px",
    },
    verIcon: {
        color: "#ffffff",
    },
    checkBox: {
        "& .MuiFormControlLabel-label": {
            fontSize: "0.8125rem",
        },
    },
    avatar: {
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        width: "36px",
        height: "36px",
    },
    title: {
        fontWeight: "500 !important",
    },
}));

const wallets = [
    {
        title: "MetaMask",
        name: "MetaMask",
        logo: metamaskLogo,
        description: "Metamask and other browser extensions",
    },
    {
        title: "Wallet Connect",
        name: "WalletConnect",
        logo: walletconnectLogo,
        description: "Gnosis WalletConnect Safe App",
    },
];

const walletsLabels = {
    MetaMask: "MetaMask",
    WalletConnect: "Wallet Connect",
};

const installMetaMask = {
    title: "Install MetaMask",
    name: "installMetaMask",
    logo: metamaskLogo,
    description:
        "You don't have MetaMask or a similar browser extension installed, click here to download from the official website.",
};

function WalletSelectModal({
    width,
    handleWalletSelect,
    showWalletSelection,
    askToConnect,
    lastSelectedWallet,
    handleTryAgain,
    handleDismiss,
}) {
    const classes = useStyles();

    const isSmallScreen = /xs/.test(width);
    const buttonProps = {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };

    // displays wallets and ignore metamask if not inject (it has no way of detecting if it's metamask or for example injected brave)
    const displayWallet = (wallet) => {
        if (
            wallet.name === "MetaMask" &&
            !window.ethereum &&
            !window.ethereum.isMetaMask &&
            !window.ethereum._metamask
        ) {
            wallet = installMetaMask;
        }

        return (
            <ToggleButton
                value={wallet.name}
                aria-label="Verified"
                disableRipple
                disableFocusRipple
                className={classes.mainButton}
                key={wallet.name}
            >
                <Avatar variant="rounded" className={classes.avatar}>
                    <img src={wallet.logo} alt={wallet.title} />
                </Avatar>{" "}
                <Box pt={1}>
                    <Typography className={classes.toggleTitle} variant="body1">
                        {wallet.title}
                    </Typography>
                </Box>
                {wallet.description ? (
                    <Box pt={1}>
                        <Typography
                            className={classes.toggleSubtitle}
                            variant="body2"
                        >
                            {wallet.description}
                        </Typography>
                    </Box>
                ) : null}
            </ToggleButton>
        );
    };

    const displayWalletSelection = () => {
        return (
            <DialogContent className={classes.dialogContent}>
                <ToggleButtonGroup
                    exclusive
                    onChange={handleWalletSelect}
                    aria-label="Wallet Select"
                    className={classes.toggleButton}
                    {...buttonProps}
                >
                    {wallets.map((wallet) => displayWallet(wallet))}
                </ToggleButtonGroup>
            </DialogContent>
        );
    };

    const displayAskToConnect = () => {
        return (
            <>
                Alkemi Earn needs access to your wallet, please login and
                authorize access to your {walletsLabels[lastSelectedWallet]}{" "}
                accounts to continue.
                <button onClick={() => handleTryAgain(lastSelectedWallet)}>
                    Try again
                </button>
                <button onClick={handleDismiss}>Dismiss</button>
            </>
        );
    };

    return (
        <div>
            <Dialog
                aria-labelledby="pool-select"
                open={showWalletSelection || askToConnect}
                disableEscapeKeyDown
                disableBackdropClick
                maxWidth="md"
                className={classes.dialog}
            >
                <Box p={4}>
                    <Typography
                        variant="h4"
                        color="textPrimary"
                        align="center"
                        className={classes.title}
                    >
                        Select Wallet
                    </Typography>
                </Box>
                {showWalletSelection === true ? displayWalletSelection() : null}
                {askToConnect === true ? displayAskToConnect() : null}
            </Dialog>
        </div>
    );
}

WalletSelectModal.propTypes = {
    /** The name of the current breakpoint, for example "sm" */
    width: PropTypes.string.isRequired,
};

export default withWidth()(WalletSelectModal);
