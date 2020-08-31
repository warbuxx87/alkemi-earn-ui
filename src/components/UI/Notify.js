import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
    Snackbar,
    Box,
    CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";

import CloseIcon from "@material-ui/icons/Close";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

const useStyles = makeStyles((theme) => ({
    Icon: {
        marginTop: 12,
    },
    Alert: {
        width: 330,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: "rgb(17, 17, 17)",
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
        marginRight: 14,
        textTransform: "capitalize",
        color: "#ffffff",
        fontSize: 12,
    },
    circle: {
        marginTop: 4,
        marginRight: 4,
        color: "#5a4fff",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PositionedSnackbar({
    variant,
    message,
    secondaryMessage,
}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        vertical: "top",
        horizontal: "center",
    });

    const { vertical, horizontal } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    // Choose the icon depending on the variant, could send the selected icon from caller if this notification snackbar is to be used from other places than utils/notify.js
    const getIcon = () => {
        switch (variant) {
            case "processing":
                return (
                    <CircularProgress size={25} className={classes.circle} />
                );
                break;
            case "success":
                return (
                    <CheckCircleOutlineOutlinedIcon className={classes.Icon} />
                );
                break;
            case "failure":
                return <ErrorOutlineOutlinedIcon className={classes.Icon} />;
                break;
            default:
                return null;
        }
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                key={vertical + horizontal}
            >
                <Alert
                    action={
                        <>
                            <Button
                                className={classes.Button}
                                color="inherit"
                                size="small"
                            >
                                Check
                            </Button>
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
                    <Box fontWeight={400} color="#b8b8b8">
                        {" "}
                        {secondaryMessage}
                    </Box>
                </Alert>
            </Snackbar>
        </>
    );
}
