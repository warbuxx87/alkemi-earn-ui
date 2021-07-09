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
    DialogActions,
    DialogContent,
    Divider,
    Typography,
    SvgIcon,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { XCircle as XIcon } from "react-feather";

// Section 3: Components & Containers import from the application

// import Settings from "./Settings";
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
        padding: "12px 0",
        borderBottom: "1px dashed #57595d",
    },
    datarow: {
        padding: "12px 0",
        borderBottom: "1px dashed #57595d",
    },
    datarowlast: {
        padding: "12px 0",
    },
    vertcent: {
        margin: "auto",
    },
    modal: {
        "& .MuiDialog-paper": {
            minWidth: "320px",
        },
    },
}));

// Section 5: Code Component
function Rewards() {
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
                    direction="row"
                    alignItems="center"
                    display="flex"
                    justify="flex-end"
                >
                    <Grid item>
                        <Box display="flex" px={1}>
                            <img
                                className={classes.alktoken}
                                src={alktoken}
                                alt={"Alkemi Logo"}
                                height={18}
                                width={18}
                            />
                        </Box>
                    </Grid>
                    <Grid item className={classes.address}>
                        <Box
                            display="flex"
                            alignItems="center"
                            data-testid="addressButton"
                        >
                            27272.21
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
                            <SvgIcon fontSize="medium">
                                <XIcon />
                            </SvgIcon>
                        </IconButton>
                    </Box>
                </Box>
                <Divider />
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Box mt={5}>
                        <img
                            className={classes.alkicon}
                            src={icon}
                            alt={"Gnosis Icon"}
                            height={85}
                            width={85}
                        />
                    </Box>
                    <Box mt={1}>
                        <Typography variant="h4" color="textPrimary">
                            10,000 ALK
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="center"
                        >
                            $0.00
                        </Typography>
                    </Box>
                </Box>
                <Box mt={3} px={2}>
                    <Grid container className={classes.datarow}>
                        <Grid item md={6} xs className={classes.vertcent}>
                            <Typography variant="body2" color="textSecondary">
                                Alk Total Supply
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            200,000,000
                        </Grid>
                    </Grid>
                    <Grid container className={classes.datarow}>
                        <Grid item md={6} xs className={classes.vertcent}>
                            <Typography variant="body2" color="textSecondary">
                                Alk in Circulation
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            1,283,435
                        </Grid>
                    </Grid>
                    <Grid container className={classes.datarowlast}>
                        <Grid item md={6} xs className={classes.vertcent}>
                            <Typography variant="body2" color="textSecondary">
                                Alk Price
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs container justify="flex-end">
                            $0.00
                        </Grid>
                    </Grid>
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
                        onClick={handleClose}
                    >
                        Claim
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Rewards;
