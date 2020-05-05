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
    makeStyles
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
// import Label from "components/UI/Label";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    label: {
        marginLeft: theme.spacing(1)
    },
    item: {
        textAlign: "center",
        justifyContent: "center"
    }
}));

function TotalApr({ className, ...rest }) {
    const classes = useStyles();
    const data = {
        value: (0.0).toFixed(2),
        percentage: "%",
        difference: 10
    };

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader
                title="Avgerage Interest APR"
                className={classes.item}
            />
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
                        {data.value}
                        {data.percentage}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
TotalApr.propTypes = {
    className: PropTypes.string
};

// Section 7:  Connect styles and export
export default TotalApr;
