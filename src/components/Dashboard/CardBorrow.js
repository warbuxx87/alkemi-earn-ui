// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { fromWei, formatPercent, format_str_to_kmb } from "utils/ui";

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
    //contentCard: {
    //    borderBottom: `1px solid ${theme.palette.warning.main}`,
    //  },
}));

function BorrowBalance({ totalBorrow, currency, apr }) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Card>
            <CardContent className={classes.contentCard}>
                <Box
                    className={classes.item}
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
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
                            >
                                Borrowing Overview
                            </Typography>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="left"
                            >
                                ${format_str_to_kmb(fromWei(totalBorrow))}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="right"
                            >
                                Borrow APY
                            </Typography>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="right"
                            >
                                {formatPercent(apr)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
BorrowBalance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default BorrowBalance;
