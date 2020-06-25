// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import { Translate } from "react-redux-i18n";

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
import Label from "components/UI/Label";

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
}));

function TotalInterest({ className, ...rest }) {
    const classes = useStyles();
    const data = {
        value: (0.0).toFixed(2),
        currency: "$",
        difference: 0,
    };

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader
                title=<Translate value="Interest_Paid" />
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
                        {data.currency}
                        {data.value}
                    </Typography>
                    <Label
                        className={classes.label}
                        color={data.difference < 0 ? "success" : "error"}
                    >
                        {data.difference > 0 ? "+" : ""}
                        {data.difference}%
                    </Label>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
TotalInterest.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default TotalInterest;
