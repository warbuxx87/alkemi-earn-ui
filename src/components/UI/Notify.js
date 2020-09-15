import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Box, CircularProgress } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

import CloseIcon from "@material-ui/icons/Close";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const ETHERSCAN_LINK = process.env.REACT_APP_ETHERSCAN_LINK;

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
        width: 330,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "#0f0f10",
        border: "solid 1px #262628",
    },
    Title: {
        marginBottom: 0,
    },
    CloseButton: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    Button: {
        marginRight: 24,
        textTransform: "capitalize",
        color: "#ffffff",
        fontSize: 12,
    },
    Circle: {
        margin: "auto 0",
        color: "#5a4fff",
    },
    Message: {
        textTransform: "capitalize",
        fontWeight: 400,
        fontSize: 12,
        color: "#B8B8B8",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PositionedSnackbar({
    variant,
    message,
    secondaryMessage,
    txHash,
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
                    <CircularProgress size={25} className={classes.Circle} />
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

    return (
        <Alert
            action={
                <>
                    {(variant === "processing" || variant === "success") && (
                        <a
                            className={classes.Button}
                            color="inherit"
                            size="small"
                            href={`${ETHERSCAN_LINK}/tx/${txHash}`}
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
                        className={classes.CloseButton}
                        color="inherit"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
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
