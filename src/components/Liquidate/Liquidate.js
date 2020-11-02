// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LiquidateTable from "./Table";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

// Section 5: Code Component
function Liquidate({ liquidationsList }) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item lg={12} xs={12}>
                        <LiquidateTable liquidationsList={liquidationsList} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
Liquidate.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default Liquidate;
