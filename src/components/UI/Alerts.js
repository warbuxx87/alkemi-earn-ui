// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    alert: {
        fontSize: 14,
    },
}));

export default function TransitionAlerts() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    // Section 5: Code Component
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert
                    className={classes.alert}
                    severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    You are currently connected to the Rinkeby Testnet
                </Alert>
            </Collapse>
        </div>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
