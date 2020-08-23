// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: Material-UI imports
import { Box, Collapse, IconButton, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

// Section 3: Components & Containers import from the application
import {
    walletAddress,
    walletNetwork,
    walletNetworkName,
} from "redux/selectors/onboard";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {},
}));

function ConnectionBanner() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const userWalletNetwork = useSelector(walletNetwork);
    const currentNetworkName = useSelector(walletNetworkName);
    const userWalletAddress = useSelector(walletAddress);

    // Section 5: Code Component
    return (
        <Box>
            {!userWalletAddress ? (
                <div>
                    <Collapse in={open}>
                        <Alert
                            className={classes.alert}
                            severity="info"
                            color="success"
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
                            Please connect using the connect button on the top
                            right.
                        </Alert>
                    </Collapse>
                </div>
            ) : null}

            {walletAddress && DEFAULT_NETWORK !== userWalletNetwork ? (
                <div>
                    <Collapse in={open}>
                        <Alert
                            severity="warning"
                            color="warning"
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
                            Incorrect Network! Please connect to the{" "}
                            {currentNetworkName} Test Network
                        </Alert>
                    </Collapse>
                </div>
            ) : null}
        </Box>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default ConnectionBanner;
