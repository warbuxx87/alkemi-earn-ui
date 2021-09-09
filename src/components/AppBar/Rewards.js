/// Main Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Grid,
    makeStyles,
    Dialog,
    Divider,
    Tooltip,
    Typography,
    SvgIcon,
    CircularProgress,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// Section 3: Components & Containers import from the application

// import Settings from "./Settings";
import { XCircle as XIcon } from "react-feather";
import { HelpCircle as HelpIcon } from "react-feather";
import alktoken from "assets/images/alktoken.svg";
import icon from "assets/images/alktoken.svg";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    connectWallet: {
        padding: "2px 2px 2px 0px",
        background: theme.palette.background.light,
        "& .MuiButton-label": {
            justifyContent: "flex-end",
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: 8,
        },
        [theme.breakpoints.between("sm", "md")]: {
            marginRight: 24,
        },
    },
    appBar: {
        paddingLeft: "0px",
        paddingRight: "0px",
        [theme.breakpoints.down("xs")]: {
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "8px",
        },
    },
    title: {
        textTransform: "uppercase",
    },

    dropdown: {
        marginTop: "4px",
    },
    menuitem: {
        fontSize: "0.875rem",
    },
    address: {
        fontSize: "0.875rem",
        backgroundColor: theme.palette.background.default,
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: "2px",
        display: "inline-flex",
        paddingTop: "1px",
        height: "32px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.825rem",
        },
    },
    btnConnect: {
        minWidth: 100,
        textTransform: "capitalize",
        fontWeight: 500,
        minHeight: 32,
    },
    content: {
        color: "#e0e0e0",
        paddingTop: 16,
        paddingBottom: 12,
    },
    header: {
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        fontWeight: "500",
    },
    dataRow: {
        padding: "8px 0",
        borderBottom: "1px dashed #57595d",
        alignItems: "center",
    },
    datarow: {
        padding: "8px 0",
        borderBottom: "1px dashed #57595d",
        alignItems: "center",
    },
    datarowlast: {
        padding: "8px 0",
        alignItems: "center",
    },
    vertcent: {
        margin: "auto",
        display: "flex",
        alignItems: "center",
    },
    modal: {
        "& .MuiDialog-paper": {
            minWidth: "340px",
        },
    },
    balanceheader: {
        fontWeight: 400,
        fontSize: "0.9375rem",
    },
    helpIcon: {
        width: ".8rem",
        marginLeft: "4px",
        color: "#868998",
    },
    alkTotal: {
        fontSize: "1.4rem",
        fontWeight: 500,
        paddingBottom: "4px",
    },
}));

// Section 5: Code Component
function Rewards({ claimableALKReward, onClaimALK, isDoingAction }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div>
            <Button
                className={classes.connectWallet}
                type="button"
                color="secondary"
                onClick={handleClickOpen}
            >
                <Grid
                    container
                    alignItems="center"
                    display="flex"
                    justify="flex-end"
                >
                    <Grid item>
                        <Box display="flex" px={1}>
                            <Tooltip
                                className={classes.Tooltip}
                                title="Click to claim your ALK Rewards"
                                placement="bottom"
                                arrow
                            >
                                <img
                                    className={classes.alktoken}
                                    src={alktoken}
                                    alt={"Alkemi Logo"}
                                    height={18}
                                    width={18}
                                />
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid item className={classes.address}>
                        <Box display="flex" alignItems="center">
                            {claimableALKReward} ALK
                        </Box>
                    </Grid>
                </Grid>
            </Button>
            <Dialog
                className={classes.modal}
                onClose={handleClose}
                aria-labelledby="gnosis-notification"
                open={open}
            >
                <Box
                    pl={2}
                    pr={1}
                    py={1}
                    id="gnosis-notification"
                    onClose={handleClose}
                    className={classes.header}
                    justifyContent="space-between"
                >
                    <Box>Your Alk Rewards</Box>
                    <Box>
                        <IconButton onClick={handleClose}>
                            <SvgIcon fontSize="default">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box mt={6} mb={2}>
                        <img
                            className={classes.alkicon}
                            src={icon}
                            alt={"Gnosis Icon"}
                            height={60}
                            width={60}
                        />
                    </Box>
                    <Box mt={1} pb={4}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mb={1}
                        >
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                align="center"
                                className={classes.balanceheader}
                            >
                                Total Rewards
                            </Typography>
                            <Tooltip
                                title="Your total farmed ALK Rewards"
                                placement="right"
                                arrow
                                className={classes.toolTip}
                            >
                                <HelpIcon className={classes.helpIcon} />
                            </Tooltip>
                        </Box>
                        <Typography
                            variant="h4"
                            align="center"
                            color="textPrimary"
                            className={classes.alkTotal}
                        >
                            {claimableALKReward} ALK
                        </Typography>
                        {
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >
                                = $0.00 USD
                            </Typography>
                        }
                    </Box>
                </Box>
                <Box p={2}>
                    <Button
                        autoFocus
                        type="button"
                        className={classes.btnModal}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth={true}
                        onClick={onClaimALK}
                        disabled={
                            isDoingAction || claimableALKReward === "0.000"
                        }
                    >
                        {isDoingAction ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <>
                                {claimableALKReward === "0.000" ? (
                                    "Claim"
                                ) : (
                                    <>Claim {claimableALKReward} ALK</>
                                )}
                            </>
                        )}
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Rewards;
