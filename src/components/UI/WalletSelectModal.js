import React from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import metamaskLogo from "assets/images/wallets/metamask.svg";
import walletconnectLogo from "assets/images/wallets/walletconnect-logo.svg";
import coinbaseLogo from "assets/images/wallets/coinbase.svg";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth

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
        paddingBottom: "0px",
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
            marginBottom: "16px",
        },
        "& .MuiButtonBase-root:last-child": {
            marginBottom: "24px",
        },
        "& .MuiToggleButton-label": {
            flexDirection: "column",
        },
        "& .MuiToggleButtonGroup-groupedHorizontal:nth-of-type(even)": {
            marginLeft: 16,
        },
        "& .MuiToggleButton-root": {
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            width: "270px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
            marginBotton: "240px",
        },

        "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "solid 1px rgba(255, 255, 255, .7) ",
        },
    },
    avatar: {
        backgroundColor: "transparent",
        width: "42px",
        height: "42px",
    },
    title: {
        fontWeight: "500 !important",
        paddingBottom: 8,
    },
    button: {
        marginRight: "12px",
    },
    alert: {
        margin: "0px",
    },
}));

const wallets = [
    {
        title: "MetaMask",
        name: "MetaMask",
        logo: metamaskLogo,
    },
    {
        title: "Wallet Connect",
        name: "WalletConnect",
        logo: walletconnectLogo,
    },
    {
        title: "Coinbase Wallet",
        name: "Coinbase",
        logo: coinbaseLogo,
    },
];

const walletsLabels = {
    MetaMask: "MetaMask",
    WalletConnect: "Wallet Connect",
    Coinbase: "Coinbase",
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
    const theme = useTheme();
    const mdOnly = useMediaQuery(theme.breakpoints.down("md"));

    // displays wallets and ignore metamask if not inject (it has no way of detecting if it's metamask or for example injected brave)
    const displayWallet = (wallet) => {
        if (
            wallet.name === "MetaMask" &&
            (!window.ethereum ||
                !window.ethereum.isMetaMask ||
                !window.ethereum._metamask)
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
                    orientation={mdOnly ? "vertical" : "horizontal"}
                    exclusive
                    onChange={handleWalletSelect}
                    aria-label="Wallet Select"
                    sx={{
                        "& .MuiButtonBase-root": {
                            borderRadius: "4px",
                            padding: "16px",
                            marginBottom: "24px",
                        },
                        "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child)":
                            {
                                marginLeft: "16px",
                                borderLeft:
                                    "solid 1px rgba(255, 255, 255, .12) ",
                                borderRadius: "4px",
                            },
                        "& .MuiToggleButton-root": {
                            width: "270px",
                            flexDirection: "column",
                        },

                        "& .MuiToggleButton-root.Mui-selected": {
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            border: "solid 1px rgba(255, 255, 255, .7) ",
                        },
                        "& .MuiDialogContent-root ": {
                            display: "flex",
                            justifyContent: "center",
                        },
                    }}
                >
                    {wallets.map((wallet) => displayWallet(wallet))}
                </ToggleButtonGroup>
            </DialogContent>
        );
    };

    const displayAskToConnect = () => {
        return (
            <>
                <Box>
                    <Box px={3} width={1}>
                        <Alert
                            className={classes.alert}
                            variant="outlined"
                            severity="warning"
                        >
                            Alkemi Earn needs access to your wallet, please
                            login and authorize access to your{" "}
                            {walletsLabels[lastSelectedWallet]} account to
                            continue and then click "try again".
                        </Alert>
                    </Box>
                    <Box px={3} py={2} display="flex" justifyContent="flex-end">
                        <Button
                            color="secondary"
                            autoFocus
                            onClick={handleDismiss}
                            variant="text"
                            className={classes.button}
                        >
                            Close
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => handleTryAgain(lastSelectedWallet)}
                            variant="contained"
                        >
                            Try again
                        </Button>
                    </Box>
                </Box>
            </>
        );
    };

    return (
        <div>
            <Dialog
                PaperProps={{
                    elevation: 0,
                }}
                aria-labelledby="pool-select"
                open={showWalletSelection || askToConnect}
                disableEscapeKeyDown
                maxWidth="md"
                className={classes.dialog}
            >
                <Box pt={3} pb={2}>
                    <Typography
                        variant="h4"
                        color="textPrimary"
                        align="center"
                        className={classes.title}
                    >
                        {showWalletSelection === true ? (
                            <div>Connect Wallet</div>
                        ) : null}
                        {askToConnect === true ? (
                            <div>Login and Authorize Your Wallet</div>
                        ) : null}
                    </Typography>
                    {showWalletSelection === true ? (
                        <Box px={3}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                                className={classes.title}
                            >
                                Please select a wallet to connect to Alkemi
                                Earn:
                            </Typography>
                        </Box>
                    ) : null}
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

export default WalletSelectModal;
