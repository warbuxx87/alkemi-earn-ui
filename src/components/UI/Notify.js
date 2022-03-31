import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { IconButton, Box, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
    Success: {
        color: theme.palette.success.main,
        margin: "auto 0",
        fontSize: "2rem",
    },
    Error: {
        color: theme.palette.error.main,
        margin: "auto 0",
        fontSize: "2rem",
    },
    Alert: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        backgroundColor: "transparent",
        margin: "0px",
        minWidth: "310px",
    },
    Title: {
        marginBottom: 0,
        fontSize: "0.8125rem",
        color: "#000000 !important",
        fontWeight: 600,
    },
    IconButton: {
        position: "absolute",
        marginTop: "8px",
        marginRight: "8px",
        top: 0,
        right: 0,
        color: "#000000",
    },
    CloseButton: {
        fontSize: "1rem",
    },
    Button: {
        marginRight: 24,
        textTransform: "capitalize",
        color: "#000000",
        fontSize: 12,
    },
    Circle: {
        margin: "auto 0",
        marginRight: 2,
        color: "#6E44FF",
    },
    Message: {
        textTransform: "capitalize",
        fontWeight: 400,
        fontSize: 11,
        color: "#7d7d7d",
    },
}));

function Alert(props) {
    return <MuiAlert variant="filled" {...props} />;
}

export default function PositionedSnackbar({
    variant,
    message,
    secondaryMessage,
    txHash,
    currentNetworkName,
}) {
    const classes = useStyles();
    const [state, setState] = React.useState({});

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    // Choose the icon depending on the variant, could send the selected icon from caller if this notification snackbar is to be used from other places than utils/notify.js
    const getIcon = () => {
        switch (variant) {
            case "processing":
                return (
                    <CircularProgress
                        thickness={5}
                        size={27}
                        className={classes.Circle}
                    />
                );
            case "success":
                return (
                    <CheckCircleOutlineOutlinedIcon
                        className={classes.Success}
                    />
                );
            case "failure":
                return <ErrorOutlineOutlinedIcon className={classes.Error} />;
            default:
                return null;
        }
    };

    const generateEtherscanLink = ({ currentNetworkName, txHash }) => {
        let subdomain = `${currentNetworkName}.`;

        if (currentNetworkName === "main" || currentNetworkName === "mainnet") {
            subdomain = "";
        }

        return `https://${subdomain}etherscan.io/tx/${txHash}`;
    };

    return (
        <Alert
            action={
                <Box>
                    {(variant === "processing" || variant === "success") &&
                        txHash !== undefined &&
                        currentNetworkName !== undefined && (
                            <a
                                className={classes.Button}
                                color="inherit"
                                size="small"
                                href={generateEtherscanLink({
                                    currentNetworkName,
                                    txHash,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Check
                            </a>
                        )}
                    <IconButton
                        size="small"
                        onClick={handleClose}
                        className={classes.IconButton}
                        color="inherit"
                    >
                        <CloseIcon
                            fontSize="small"
                            className={classes.CloseButton}
                        />
                    </IconButton>
                </Box>
            }
            className={classes.Alert}
            icon={getIcon()}
            severity="info"
        >
            <AlertTitle className={classes.Title}>{message}</AlertTitle>
            <Box className={classes.Message}> {secondaryMessage}</Box>
        </Alert>
    );
}
