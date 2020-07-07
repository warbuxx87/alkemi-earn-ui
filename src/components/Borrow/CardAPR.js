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
    fade,
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
    label: {
        fontFamily: theme.typography.fontFamily,
        alignItems: "center",
        borderRadius: 4,
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
        height: 12,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        padding: theme.spacing(2, 1),
        textTransform: "uppercase",
        color: theme.palette.error.main,
        backgroundColor: fade(theme.palette.error.main, 0.08),
    },
    item: {
        textAlign: "center",
        justifyContent: "center",
    },
}));

function CardAPR({ className, ...rest }) {
    const classes = useStyles();
    const data = {
        value: (0.0).toFixed(2),
        percentage: "%",
        difference: 10,
    };

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title="Loan APR%" className={classes.item} />
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
                    <Typography
                        variant="h3"
                        color="textPrimary"
                        className={classes.label}
                    >
                        {data.value}
                        {data.percentage}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
CardAPR.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default CardAPR;
