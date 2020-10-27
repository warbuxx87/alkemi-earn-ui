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
    SvgIcon,
    Typography,
    makeStyles,
} from "@material-ui/core";

import { ArrowUp as Upicon } from "react-feather";
import {
    fromWei,
    formatPercent,
    formatNumber,
    format_str_to_kmb,
    formattedNumberToSplitNumber,
} from "utils/ui";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "right",
        justifyContent: "space-between",
    },
    label: {
        marginLeft: theme.spacing(1),
    },
    item: {
        textAlign: "left",
        justifyContent: "center",
    },
    cents: {
        color: "#5e6266",
    },
    upicon: {
        fontSize: "3.1rem",
        marginLeft: 5,
        marginTop: 2,
        color: theme.palette.success.main,
    },
}));

const displayAggregatedBalance = (aggregatedBalance, classes) => {
    const {
        leftOfDecimalPoint,
        rightOfDecimalPoint,
    } = formattedNumberToSplitNumber(
        formatNumber(aggregatedBalance.toString(), "ETH")
    );

    const numbersOnLeft = leftOfDecimalPoint.replace("-", "");
    let numberOnRightToDisplay = rightOfDecimalPoint;

    if (numbersOnLeft.length <= 4) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 8);
    } else if (numbersOnLeft.length <= 5) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 6);
    } else if (numbersOnLeft.length <= 7) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 4);
    } else {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 2);
    }

    return (
        <span>
            {leftOfDecimalPoint}
            <span className={classes.cents}>.{numberOnRightToDisplay}</span>
        </span>
    );
};

function Overview({ aggregatedBalance, currency, combinedAPY }) {
    const classes = useStyles();
    // Section 5: Code Component
    return (
        <Grid alignItems="center" container justify="space-between" spacing={3}>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="left"
                >
                    Aggregated Value
                </Typography>
                <Typography variant="h1" color="textPrimary" align="left">
                    ${displayAggregatedBalance(aggregatedBalance, classes)}
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="right"
                >
                    Combined APY
                </Typography>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            variant="h1"
                            color="textPrimary"
                            align="right"
                        >
                            {formatPercent(combinedAPY)}
                        </Typography>
                    </Box>
                    <Box>
                        <SvgIcon fontSize="small" className={classes.upicon}>
                            <Upicon />
                        </SvgIcon>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

// Section 6: Documentation with PropTypes
Overview.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default Overview;
