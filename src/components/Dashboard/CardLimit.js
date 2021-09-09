// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Grid,
    LinearProgress,
    Paper,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";
import Help from "@material-ui/icons/HelpOutline";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    item: {
        textAlign: "center",
        justifyContent: "center",
    },
    progress: {
        margin: theme.spacing(0, 0, 0, 3),
        flexGrow: 1,
        background: "rgb(255 254 254 / 10%)",
        height: 7,
        borderRadius: 5,
        "& .MuiLinearProgress-bar": {
            borderRadius: 5,
        },
    },
    cardtitle: {
        lineHeight: 1.4,
        paddingBottom: 12,
    },
    help: {
        width: "15px",
        height: "15px",
        color: "#868998",
        marginLeft: "4px",
        marginTop: "1px",
    },
}));

function BorrowLimit({ borrowLimit }) {
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
                <Grid alignItems="center" container spacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex">
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="left"
                                className={classes.cardtitle}
                            >
                                Borrow Limit
                            </Typography>
                            <Tooltip
                                className={classes.Tooltip}
                                title="Liquidation occurs if limit equals or exceeds 100%"
                                placement="bottom"
                                arrow
                            >
                                <Help className={classes.help} />
                            </Tooltip>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h3" color="textPrimary">
                                {borrowLimit.toFixed(2)}%
                            </Typography>
                            <LinearProgress
                                className={classes.progress}
                                value={borrowLimit}
                                color="secondary"
                                variant="determinate"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

// Section 6: Documentation with PropTypes
BorrowLimit.propTypes = {
    className: PropTypes.string,
    borrowLimit: PropTypes.number,
};

// Section 7:  Connect styles and export
export default BorrowLimit;
