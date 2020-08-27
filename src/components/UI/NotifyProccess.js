import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    IconButton,
    Snackbar,
    Box,
    Slide,
    CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

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

export default function PositionedSnackbar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center",
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
        setTimeout(function () {
            setState({ open: false, ...newState });
        }, 2000);
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <>
            <Button
                onClick={handleClick({ vertical: "top", horizontal: "right" })}
            >
                processing
            </Button>
            <Slide direction={open ? "down" : "left"} timeout={500} in={open}>
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
                        icon={
                            <CircularProgress
                                size={25}
                                className={classes.circle}
                            />
                        }
                        severity="info"
                    >
                        <AlertTitle className={classes.Title}>
                            Processing
                        </AlertTitle>
                        <Box fontWeight={400} color="#b8b8b8">
                            {" "}
                            This is a processing message!
                        </Box>
                    </Alert>
                </Snackbar>
            </Slide>
        </>
    );
}
