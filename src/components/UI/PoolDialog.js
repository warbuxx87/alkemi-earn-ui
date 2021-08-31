import React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    Link,
    SvgIcon,
    Toolbar,
    Typography,
    makeStyles,
} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Verified from "@material-ui/icons/VerifiedUser";
import Open from "@material-ui/icons/Public";

const useStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialog-paperWidthMd": {
            maxWidth: "605px",
        },
    },
    connectButton: {
        fontSize: "0.8125rem",
        maxWidth: "110px",
    },
    dialogContent: {
        paddingTop: "0px",
        paddingBottom: "16px",
    },
    toggleSubtitle: {
        textTransform: "none",
        fontSize: "0.8125rem",
        fontWeight: "300",
        color: "#cecece",
    },
    toggleTitle: {
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#ffffff",
    },
    toggleButton: {
        flexWrap: "wrap",
        "& .MuiButtonBase-root": {
            borderRadius: "4px",
            padding: "16px",
        },
        "& .MuiToggleButton-label": {
            flexDirection: "column",
        },
        "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) ": {
            marginLeft: 16,
        },
        "& .MuiToggleButton-root": {
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            width: "270px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        },

        "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "solid 1px rgba(255, 255, 255, .7) ",
        },
    },
    kyclink: {
        borderLeft: "0px",
        marginLeft: "4px !important",
        minWidth: "268px",
    },
    verIcon: {
        color: "#ffffff",
    },
    connectButton: {
        fontSize: "0.8125rem",
        minWidth: "110px",
    },
    checkBox: {
        "& .MuiFormControlLabel-label": {
            fontSize: "0.8125rem",
        },
    },
    avatar: {
        backgroundColor: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        width: "36px",
        height: "36px",
    },
}));

function PoolDialog({
    width,
    handleCheckDefaultPool,
    handlePoolChange,
    selectedPool,
    onContinue,
    open,
}) {
    const classes = useStyles();

    const isSmallScreen = /xs/.test(width);
    const buttonProps = {
        orientation: isSmallScreen ? "vertical" : "horizontal",
    };
    const boxProps = {
        order: isSmallScreen ? "0" : "3",
    };

    return (
        <div>
            <Dialog
                aria-labelledby="pool-select"
                open={open}
                disableEscapeKeyDown
                disableBackdropClick
                maxWidth="md"
                className={classes.dialog}
            >
                <Box p={4}>
                    <Typography variant="h4" color="textPrimary" align="center">
                        Select liquidity pool
                    </Typography>
                </Box>
                <DialogContent className={classes.dialogContent}>
                    <ToggleButtonGroup
                        value={selectedPool}
                        exclusive
                        onChange={handlePoolChange}
                        aria-label="Pool Select"
                        className={classes.toggleButton}
                        {...buttonProps}
                    >
                        <ToggleButton
                            value="permissioned"
                            aria-label="Verified"
                            disableRipple
                            disableFocusRipple
                        >
                            <Avatar
                                variant="rounded"
                                className={classes.avatar}
                            >
                                <Box
                                    display="flex"
                                    className={classes.avatarimg}
                                >
                                    <Verified color="primary" />
                                </Box>
                            </Avatar>{" "}
                            <Box pt={1}>
                                <Typography
                                    className={classes.toggleTitle}
                                    variant="body1"
                                >
                                    Earn Verified
                                </Typography>
                            </Box>
                            <Box pt={1}>
                                <Typography
                                    className={classes.toggleSubtitle}
                                    variant="body2"
                                >
                                    Access Earn's verified liquidity pool which
                                    requires KYC user verification.
                                </Typography>
                            </Box>
                        </ToggleButton>
                        <Box
                            pt={1.5}
                            pb={1}
                            className={classes.kyclink}
                            {...boxProps}
                        >
                            <Typography
                                className={classes.kycref}
                                variant="subtitle2"
                            >
                                <Link
                                    href="https://alkemi.network"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Get KYC Verified
                                </Link>
                            </Typography>
                        </Box>
                        <ToggleButton
                            value="open"
                            aria-label="Open"
                            disableRipple
                        >
                            <Avatar
                                variant="rounded"
                                className={classes.avatar}
                            >
                                <Box
                                    display="flex"
                                    className={classes.avatarimg}
                                >
                                    <Open color="primary" />
                                </Box>
                            </Avatar>{" "}
                            <Box pt={1}>
                                <Typography
                                    className={classes.toggleTitle}
                                    variant="body1"
                                >
                                    Earn Open
                                </Typography>
                            </Box>
                            <Box pt={1}>
                                <Typography
                                    className={classes.toggleSubtitle}
                                    variant="body2"
                                >
                                    Access Earn's open liquidity pool available
                                    to everyone with a web3 wallet.
                                </Typography>
                            </Box>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </DialogContent>
                <Divider />
                <Box
                    py={1}
                    px={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FormControlLabel
                        className={classes.checkBox}
                        value="default"
                        control={
                            <Checkbox
                                color="secondary"
                                onClick={handleCheckDefaultPool}
                            />
                        }
                        label="Set default"
                        labelPlacement="end"
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        className={classes.connectButton}
                        autoFocus
                        onClick={onContinue}
                        disabled={!selectedPool}
                    >
                        Continue
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

PoolDialog.propTypes = {
    /** The name of the current breakpoint, for example "sm" */
    width: PropTypes.string.isRequired,
};

export default withWidth()(PoolDialog);
