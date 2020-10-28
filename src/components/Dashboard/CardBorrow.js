// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { formatPercent } from "utils/ui";

// Section 3: Components & Containers import from the application
import SplitNumber from "components/UI/SplitNumber";

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
    apy: {
        color: theme.palette.warning.main,
    },
    //contentCard: {
    //    borderBottom: `1px solid ${theme.palette.warning.main}`,
    //  },
    cents: {
        color: "#969696",
    },
    cardtitle: {
        lineHeight: 1.4,
        paddingBottom: 8,
    },
}));

function BorrowBalance({ totalBorrow, currency, apy }) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Paper>
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
                    justify="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            align="left"
                            className={classes.cardtitle}
                        >
                            Borrowing Overview
                        </Typography>
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            align="left"
                        >
                            $
                            <SplitNumber
                                theNumber={totalBorrow}
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
                            Borrow APY
                        </Typography>
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            align="right"
                            className={classes.apy}
                        >
                            {formatPercent(apy)}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

// Section 6: Documentation with PropTypes
BorrowBalance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default BorrowBalance;
