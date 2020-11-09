// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import DAI from "assets/images/DAI.svg";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    assetName: {
        marginLeft: theme.spacing(2),
        paddingTop: 1,
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    iconFont: {
        fontSize: 12,
        color: "#48D878",
    },
    assetIcon: {
        marginRight: theme.spacing(1.5),
    },
    btnDefault: {
        backgroundColor: "#3A3B3C",
        marginLeft: 12,
        padding: "4px 16px",
        color: "#B1B2B2",
        textTransform: "capitalize",
        "&:hover": {
            color: "#000",
        },
        [theme.breakpoints.down("xs")]: {
            marginLeft: 3,
        },
    },
    center: {
        textAlign: "center",
    },
    right: {
        justifyContent: "right",
        position: "relative",
        display: "grid",
    },

    smRight: {
        [theme.breakpoints.down("sm")]: {
            textAlign: "right",
            marginBottom: 20,
        },
    },
    textApy: {
        color: theme.palette.success.main,
        fontWeight: 500,
    },
}));

function CardAsset({ className }) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Box className={classes.Root}>
            <Card>
                <Box
                    position="relative"
                    display="flex"
                    alignItems="center"
                    p={2}
                >
                    <img className={classes.assetIcon} src={DAI} width={32} />
                    <Typography variant="h4" color="textPrimary">
                        DAI
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        className={classes.assetName}
                    >
                        Maker Dai
                    </Typography>
                    <Box flexGrow={1} />
                    <Button
                        className={classes.btnDefault}
                        size="small"
                        variant="contained"
                    >
                        Withdraw
                    </Button>
                    <Button
                        className={classes.btnDefault}
                        size="small"
                        variant="contained"
                    >
                        Deposit
                    </Button>
                </Box>
                <Divider />
                <Box px={2} py={2}>
                    <Grid container spacing={1}>
                        <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Typography variant="h6" color="textPrimary">
                                2,445,656.8345
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Liquidity
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={4}
                            xs={6}
                            className={classes.smRight}
                        >
                            <Typography variant="h6" color="textPrimary">
                                134,423.2465
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Wallet
                            </Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Typography variant="h6" color="textPrimary">
                                344,438.9384 DAI
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Deposit
                            </Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={4} xs={6}>
                            <Box className={classes.smRight}>
                                <Typography variant="h6" color="textPrimary">
                                    $345,455.1223
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    USD Value
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={4}
                            xs={6}
                            className={classes.smCenter}
                        >
                            <Typography variant="h6" color="textPrimary">
                                $7,666.96
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Earnings USD
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={4}
                            xs={6}
                            className={classes.smRight}
                        >
                            <Box
                                height="100%"
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Box
                                    border={1}
                                    borderRadius={4}
                                    py={0.8}
                                    px={2}
                                    borderColor="success.main"
                                >
                                    <Typography
                                        variant="h6"
                                        className={classes.textApy}
                                    >
                                        4.45% APY
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Box>
    );
}

// Section 6: Documentation with PropTypes
CardAsset.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default CardAsset;
