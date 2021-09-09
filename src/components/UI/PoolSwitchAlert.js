import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    makeStyles,
    Link,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
    content: {
        color: "#e0e0e0",
        paddingTop: 8,
        paddingBottom: 8,
    },
    image: {
        maxWidth: "28px",
        marginRight: "12px",
    },
    title: {
        display: "flex",
        alignItems: "center",
        fontWeight: "500",
        paddingTop: "24px",
        paddingBottom: "16px",
    },
    icon: {
        color: theme.palette.warning.main,
        marginRight: "12px",
    },
    button: {
        marginRight: "12px",
    },
    link: {
        fontSize: "0.875rem",
    },
}));

export default function PoolSwitchAlert({
    handleConfirm,
    open,
    setOpen,
    chosenPool,
    handleCheckDoNotShow,
    handleClose,
}) {
    const classes = useStyles();

    const headers = {
        permissioned: "Switch to Verified Pool",
        open: "Switch to Open Pool",
    };

    const bodies = {
        permissioned: (
            <>
                Now disconnecting from Alkemi Earn's 'Open' pool; KYC approval
                is required to access the 'Verified' pool.:&nbsp;&nbsp;
                <Link
                    href="https://kyc.alkemi.network/#/auth/signup"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.link}
                >
                    Apply for KYC Verification here
                </Link>
            </>
        ),
        open: (
            <>
                Now disconnecting from Alkemi Earn's KYC 'Verified' pool;
                switching to the 'Open' pool.
            </>
        ),
    };

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
                    disableTypography
                    className={classes.title}
                >
                    {" "}
                    <WarningIcon fontSize="large" className={classes.icon} />
                    <Typography
                        color="inherit"
                        variant="h4"
                        className={classes.header}
                    >
                        {headers[chosenPool]}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" className={classes.content}>
                        {bodies[chosenPool]}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Box p={1}>
                        <Button
                            color="secondary"
                            autoFocus
                            onClick={handleClose}
                            variant="text"
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="secondary"
                            onClick={handleConfirm}
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}
