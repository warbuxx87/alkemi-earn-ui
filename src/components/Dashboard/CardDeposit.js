// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

// Section 2: Material-UI imports
import { Box, Grid, Paper, Typography } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

// Section 3: Components & Containers import from the application
import SplitNumber from "components/UI/SplitNumber";
import APYDisplay from "components/UI/APYDisplay";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        marginLeft: theme.spacing(1),
    },
    item: {
        textAlign: "left",
        justifyContent: "center",
    },
    //  contentCard: {
    //      borderBottom: `1px solid ${theme.palette.success.main}`,
    //  },
    cents: {
        color: theme.palette.text.secondary,
    },
    apy: {
        color: theme.palette.success.main,
    },
    cardtitle: {
        lineHeight: 1.4,
        paddingBottom: 12,
    },
}));

function DepositBalance({
    totalDeposit,
    aggregatedAlkApy,
    apy,
    walletConnected,
}) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Paper elevation={0}>
            <Box
                className={classes.item}
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                p={2}
            >
                <Grid
                    alignItems="center"
                    container
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="left"
                            className={classes.cardtitle}
                        >
                            Lending Overview
                        </Typography>
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            align="left"
                        >
                            $
                            <SplitNumber
                                theNumber={totalDeposit}
                                centsClassName={classes.cents}
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="right"
                            className={classes.cardtitle}
                        >
                            Earning APY
                        </Typography>

                        {walletConnected === true ? (
                            <APYDisplay
                                apy={
                                    !isNaN(apy)
                                        ? Big(apy).times(100).toFixed(2)
                                        : "0.00"
                                }
                                alkApy={aggregatedAlkApy}
                                showTooltip={false}
                                typeOfAPY={"lend"}
                                typeOfLabel="NumberOnly"
                            />
                        ) : (
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="right"
                                className={classes.apy}
                            >
                                0.00%
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

// Section 6: Documentation with PropTypes
DepositBalance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default DepositBalance;
