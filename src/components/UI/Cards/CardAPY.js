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

import { formatPercent } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = (props) =>
    makeStyles((theme) => ({
        root: {
            padding: theme.spacing(3),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        label: {
            // fontFamily: theme.typography.fontFamily,
            alignItems: "center",
            borderRadius: 4,
            display: "inline-flex",
            flexGrow: 0,
            whiteSpace: "nowrap",
            cursor: "default",
            flexShrink: 0,

            justifyContent: "center",
            letterSpacing: 0.5,
            minWidth: 20,
            padding: theme.spacing(0, 1),
            textTransform: "uppercase",
            color: theme.palette[props.color].main,
            backgroundColor: fade(theme.palette[props.color].main, 0.08),
        },
        item: {
            textAlign: "center",
            justifyContent: "center",
        },
    }));

function CardAPY({ totalAPY, ...props }) {
    const classes = useStyles(props)();

    // Section 5: Code Component
    return (
        <Card>
            <CardHeader title={props.title} className={classes.item} />
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
                        {formatPercent(totalAPY)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

// Section 6: Documentation with PropTypes
CardAPY.propTypes = {
    totalAPY: PropTypes.string,
};

// Section 7:  Connect styles and export
export default CardAPY;
