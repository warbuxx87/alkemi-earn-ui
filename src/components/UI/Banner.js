// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import { Box, Collapse, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

// Section 3: Components & Containers import from the application

import constants from "constants/constant.json";

// Section 4: Define Styles function taking theme as argument and returning an object

function Banner({
    userWalletNetwork,
    currentNetworkName,
    userWalletAddress,
    DEFAULT_NETWORK,
    DISPLAY_FREEZE_OF_TXS,
}) {
    const [open, setOpen] = React.useState(true);

    const displayMustConnectMessage = () => {
        return (
            <div>
                <Collapse in={open}>
                    <Alert
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
        );
    };

    const displayWrongNetworkMessage = () => {
        return (
            <div>
                <Collapse in={open}>
                    <Alert
                        severity="info"
                        color="info"
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
                        You are connected to the{" "}
                        {constants.network_type[userWalletNetwork]} network.
                    </Alert>
                </Collapse>
            </div>
        );
    };

    const displayFreezeWarning = () => {
        return (
            <div>
                <Collapse in={open}>
                    <Alert
                        severity="info"
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
                        Transactions on mainnet will be frozen on 8 September to
                        prepare for TGE.
                    </Alert>
                </Collapse>
            </div>
        );
    };

    const selectMessageToDisplay = () => {
        if (["true", true].includes(DISPLAY_FREEZE_OF_TXS)) {
            return displayFreezeWarning();
        } else {
            return (
                <>
                    {!userWalletAddress && displayMustConnectMessage()}

                    {userWalletAddress &&
                        DEFAULT_NETWORK !== userWalletNetwork &&
                        displayWrongNetworkMessage()}
                </>
            );
        }
    };

    // Section 5: Code Component
    return <Box>{selectMessageToDisplay()}</Box>;
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Banner;
