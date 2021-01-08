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
        fontSize: "2.55rem",
        "@media (min-width:1940px)": {
            fontSize: "2.8rem",
            marginTop: 2,
        },
        marginLeft: 5,
        marginTop: 2,
        color: theme.palette.success.main,
    },
    downicon: {
        fontSize: "2.55rem",
        "@media (min-width:1940px)": {
            fontSize: "2.8rem",
            marginTop: 2,
        },
        marginLeft: 5,
        marginTop: 2,
        color: theme.palette.warning.main,
    },
    combinedApy: {
        textAlign: "left",
        "@media (min-width: 520px)": {
            textAlign: "right",
        },
    },
}));

const displayAPYIcon = (classes, combinedAPY) => {
    if (combinedAPY >= 0 || isNaN(combinedAPY)) {
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

function Overview({ aggregatedBalance, combinedAPY }) {
    const classes = useStyles();
    // Section 5: Code Component
    return (
        <Box mt={1} mb={1}>
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
                        style={{ paddingBottom: "8px" }}
                    >
                        Aggregated Value
                    </Typography>
                    <Box>
                        <Typography
                            variant="h1"
                            color="textPrimary"
                            align="left"
                        >
                            $
                            <SplitNumber
                                theNumber={aggregatedBalance}
                                centsClassName={classes.cents}
                            />
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className={classes.combinedApy}
                        style={{ paddingTop: "4px", paddingBottom: "4px" }}
                    >
                        Combined APY
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Typography variant="h1" color="textPrimary">
                            {formatPercent(combinedAPY)}
                        </Typography>
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
