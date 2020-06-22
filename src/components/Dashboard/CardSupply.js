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

// Section 3: Components & Containers import from the application
import { formatMoney } from "utils/front-end";

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
    //    borderBottom: `1px solid ${theme.palette.success.main}`,
    // },
}));

function SupplyBalance({
    totalSupply,
    currency,
    apr = (0.0).toFixed(2),
    percentage = "%",
}) {
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
                                Total Suppled
                            </Typography>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="left"
                            >
                                {formatMoney(totalSupply, currency)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="right"
                            >
                                Earning APR
                            </Typography>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                align="right"
                            >
                                {apr}
                                {percentage}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
SupplyBalance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default SupplyBalance;
