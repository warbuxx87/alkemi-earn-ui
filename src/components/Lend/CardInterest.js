// Sub Component

// Section 1: React low level imports
import React, { useState, useMemo, useEffect } from "react";
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

import { Skeleton } from "@material-ui/lab"; // Skeleton is still in lab and not in core (or atleast no export yet, seems that they forgot to do so)

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
        color: theme.palette.text.secondary,
    },
}));

function CardValue({
    calculatedInterest,
    fetchInterestErrorStatus,
    walletConnected,
}) {
    const classes = useStyles();
    //const data = {
    //      value: (0.0).toFixed(2),
    //      currency: "$",
    //      difference: 0,
    //   };

    const loadingSkeleton = useMemo(
        () => (
            <Skeleton variant="rect" width={137} height={25} animation="wave" />
        ),
        []
    );

    const [displayInterest, setDisplayInterest] = useState(loadingSkeleton);

    useEffect(() => {
        if (!walletConnected) {
            setDisplayInterest(
                <SplitNumber
                    theNumber={"0.00"}
                    shouldFormatNumber={false}
                    centsClassName={classes.cents}
                />
            );
        } else if (calculatedInterest) {
            setDisplayInterest(
                <SplitNumber
                    theNumber={calculatedInterest}
                    shouldFormatNumber={false}
                    centsClassName={classes.cents}
                />
            );
        } else {
            setDisplayInterest(loadingSkeleton);
        }
    }, [calculatedInterest, classes.cents, loadingSkeleton, walletConnected]);

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Interest Earned" className={classes.item} />
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
                        {/* {data.currency}
                        {data.value}*/}
                        {displayInterest}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
CardValue.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default CardValue;
