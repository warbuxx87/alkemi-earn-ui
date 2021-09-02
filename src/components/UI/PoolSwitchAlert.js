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
    Link,
    FormControlLabel,
    Checkbox,
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
    checkBox: {
        "& .MuiFormControlLabel-label": {
            fontSize: "0.8125rem",
        },
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
        permissioned: "Entering verified pool",
        open: "Exiting the verified pool",
    };

    const bodies = {
        permissioned: (
            <>
                You are entering the verified pool, if you are not KYC'd yet,
                feel free to do so by following this link:&nbsp;
                <Link
                    href="https://alkemi.network"
                    target="_blank"
                    rel="noreferrer"
                >
                    Get KYC Verified
                </Link>
            </>
        ),
        open: (
            <>
                Warning, you are switching from the safe verified pool to the
                open and public one.
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
                    className={classes.header}
                >
                    {headers[chosenPool]}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body1" className={classes.content}>
                        {bodies[chosenPool]}
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <FormControlLabel
                        className={classes.checkBox}
                        value="default"
                        control={
                            <Checkbox
                                color="secondary"
                                onClick={handleCheckDoNotShow}
                            />
                        }
                        label="Do not show anymore"
                        labelPlacement="end"
                    />
                    <Button onClick={handleConfirm}>Approve</Button>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
