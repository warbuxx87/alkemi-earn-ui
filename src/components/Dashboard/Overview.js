// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, Grid, SvgIcon, Typography, makeStyles } from "@material-ui/core";

import { ArrowUp as UpIcon, ArrowDown as DownIcon } from "react-feather";
import { formatPercent } from "utils/ui";

// Section 3: Components & Containers import from the application
import SplitNumber from "components/UI/SplitNumber";
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
        color: theme.palette.text.secondary,
    },
    upicon: {
        fontSize: "3.1rem",
        marginLeft: 5,
        marginTop: 2,
        color: theme.palette.success.main,
    },
    downicon: {
        fontSize: "3.1rem",
        marginLeft: 5,
        marginTop: 2,
        color: theme.palette.warning.main,
    },
}));

const displayAPYIcon = (classes, combinedAPY) => {
    if (combinedAPY >= 0) {
        // Could add an icon for 0, but for now the green up one will be used
        return (
            <SvgIcon fontSize="small" className={classes.upicon}>
                <UpIcon />
            </SvgIcon>
        );
    } else {
        return (
            <SvgIcon fontSize="small" className={classes.downicon}>
                <DownIcon />
            </SvgIcon>
        );
    }
};

function Overview({ aggregatedBalance, currency, combinedAPY }) {
    const classes = useStyles();
    // Section 5: Code Component
    return (
        <Box mt={3} mb={1}>
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
                        Aggregated Value
                    </Typography>
                    <Typography variant="h1" color="textPrimary" align="left">
                        $
                        <SplitNumber
                            theNumber={aggregatedBalance}
                            centsClassName={classes.cents}
                        />
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
                        <Box>{displayAPYIcon(classes, combinedAPY)}</Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

// Section 6: Documentation with PropTypes
Overview.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default Overview;
