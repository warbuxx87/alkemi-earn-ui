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
    Typography,
    makeStyles,
} from "@material-ui/core";

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
        textAlign: "center",
        justifyContent: "center",
    },
    cents: {
        color: "#5e6266",
    },
}));

function TotalValue({
    className,
    totalDeposit,
    currency,
    difference,
    ...rest
}) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Total Deposits" className={classes.item} />
            <Divider />
            <CardContent>
                <Box
                    className={classes.item}
                    mt={2}
                    mb={1}
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <Typography variant="h3" color="textPrimary">
                        $
                        <SplitNumber
                            theNumber={totalDeposit}
                            centsClassName={classes.cents}
                        />
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
TotalValue.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default TotalValue;
