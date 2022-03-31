import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import icon from "assets/images/wallets/walletconnect.svg";

const useStyles = makeStyles((theme) => ({
    content: {
        color: "#e0e0e0",
        paddingTop: 16,
        paddingBottom: 12,
    },
    image: {
        maxWidth: "28px",
        marginRight: "12px",
    },
    header: {
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        fontWeight: "500",
    },
}));

export default function AlertDialog({ open, handleClose }) {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="gnosis-notification"
                open={open}
            >
                <DialogTitle
                    id="gnosis-notification"
                    onClose={handleClose}
                    className={classes.header}
                >
                    <img
                        className={classes.image}
                        src={icon}
                        alt={"Gnosis Icon"}
                    />
                    Gnosis Transaction
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body1" className={classes.content}>
                        You are currently connected to Gnosis via WalletConnect.
                        To complete this transaction, you will need to signoff
                        on this transaction from within your Gnosis wallet.
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
