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
    LinearProgress,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { formatMoney, formatPercent } from "utils/front-end";

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
    progress: {
        margin: theme.spacing(0, 1, 0, 3),
        flexGrow: 1,
        background: "#414244",
    },
}));

function Balance({ aggregatedBalance, currency, collateralRatio }) {
    const classes = useStyles();
    const data = {
        value: 50,
    };

    // Section 5: Code Component
    return (
        <Card>
            <CardContent className={classes.contentCard}>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="left"
                >
                    Borrow Limit
                </Typography>
                <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Typography variant="h3" color="textPrimary">
                        {data.value}%
                    </Typography>
                    <LinearProgress
                        className={classes.progress}
                        value={data.value}
                        color="primary"
                        variant="determinate"
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
Balance.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default Balance;
