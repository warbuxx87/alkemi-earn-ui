import React from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    Divider,
    FormControlLabel,
    Link,
    Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Verified from "@mui/icons-material/VerifiedUser";
import Open from "@mui/icons-material/Public";

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
    verIcon: {
        color: "#ffffff",
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
    title: {
        fontWeight: "500 !important",
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
    const theme = useTheme();
    const mdOnly = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            <Dialog
                aria-labelledby="pool-select"
                open={open}
                disableEscapeKeyDown
                maxWidth="md"
                className={classes.dialog}
                PaperProps={{
                    elevation: 0,
                }}
            >
                <Box pt={3} pb={3} px={3}>
                    <Typography
                        variant="h4"
                        color="textPrimary"
                        align="center"
                        className={classes.title}
                    >
                        Select Liquidity Pool
                    </Typography>
                </Box>
                <DialogContent className={classes.dialogContent}>
                    <ToggleButtonGroup
                        orientation={mdOnly ? "vertical" : "horizontal"}
                        value={selectedPool}
                        exclusive
                        onChange={handlePoolChange}
                        aria-label="Pool Select"
                        sx={{
                            flexWrap: "wrap",
                            "& .MuiButtonBase-root": {
                                borderRadius: "4px !important",
                                padding: "16px",
                                marginBottom: "24px",
                            },
                            "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child)":
                                {
                                    marginLeft: "16px",
                                    borderLeft:
                                        "solid 1px rgba(255, 255, 255, .12) ",
                                    borderRadius: "4px !important",
                                },
                            "& .MuiToggleButton-root": {
                                width: "270px",
                                flexDirection: "column",
                                marginBottom: "0px",
                            },

                            "& .MuiToggleButton-root.Mui-selected": {
                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                border: "solid 1px rgba(255, 255, 255, .7) ",
                            },
                            "& .MuiDialogContent-root ": {
                                display: "flex",
                                justifyContent: "center",
                            },
                        }}
                    >
                        <ToggleButton
                            value="permissioned"
                            aria-label="Verified"
                            disableRipple
                            disableFocusRipple
                            className={classes.mainButton}
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
                                    Alkemi Earn's 'Verified' pool is only
                                    accessible for KYC approved users.
                                </Typography>
                            </Box>
                        </ToggleButton>
                        <Box
                            pt={1.5}
                            pb={1}
                            order={mdOnly ? "0" : "3"}
                            sx={{
                                borderLeft: "0px !important",
                                marginLeft: "4px !important",
                                minWidth: "268px !important",
                            }}
                        >
                            <Typography
                                className={classes.kycref}
                                variant="subtitle1"
                            >
                                <Link
                                    href="https://kyc.alkemi.network/#/auth/signup"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Apply for KYC Verification{" "}
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
                                    Alkemi Earn's 'Open' pool is accessible for
                                    all using Metamask.
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

export default PoolDialog;
