// Sub Component

// Section 1: React low level imports
import React from "react";

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
    Paper,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import AreaChart from "./Chart";

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
    contentCard: {
        borderBottom: `1px solid ${theme.palette.common.white}`,
    },
}));

function CardChart({ aggregatedBalance, currency, collateralRatio }) {
    const classes = useStyles();
    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Account Liquidity" className={classes.header} />
            <Divider />
            <CardContent className={classes.contentCard}>
                <Paper
                    className={classes.item}
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <AreaChart />
                </Paper>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default CardChart;
