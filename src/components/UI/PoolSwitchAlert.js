import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
    makeStyles,
} from "@material-ui/core";

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

export default function PoolSwitchAlert({ handleConfirm, open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };

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
                    disableTypography
                    className={classes.header}
                >
                    Exiting the verified pool
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body1" className={classes.content}>
                        Warning, you are switching from the safe verified pool
                        to the open and public one.
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleConfirm}>Approve</Button>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
