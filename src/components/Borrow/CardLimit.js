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
    Typography,
    makeStyles,
} from "@material-ui/core";

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
        margin: theme.spacing(0, 1, 0, 3),
        flexGrow: 1,
        background: "rgb(255 254 254 / 10%)",
        height: 7,
        borderRadius: 5,
    },
}));

function BorrowLimit({ borrowLimit }) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Borrow Limit" className={classes.item} />
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
                    <Typography variant="h2" color="textPrimary">
                        {borrowLimit.toFixed(2)}%
                    </Typography>
                    <LinearProgress
                        className={classes.progress}
                        value={borrowLimit}
                        color="secondary"
                        variant="determinate"
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
BorrowLimit.propTypes = {
    className: PropTypes.string,
    borrowLimit: PropTypes.number,
};

// Section 7:  Connect styles and export
export default BorrowLimit;
