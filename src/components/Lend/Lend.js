// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTable from "./Table";
import LendTableActive from "./TableActive";
import LendCardValue from "containers/Lend/CardValue";
import LendCardInterest from "./CardInterest";
import LendCardAPR from "containers/Lend/CardAPR";
import LendCardAsset from "./CardAsset";

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
function Lend({ className, activeLend, inactiveLend, onActivate, USDPrice }) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <LendCardValue />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <LendCardInterest />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <LendCardAPR />
                </Grid>
                <Grid item lg={12} sm={6} xs={12}>
                    <LendCardAsset />
                </Grid>
                {!!activeLend.length && (
                    <Grid item lg={12} xs={12}>
                        <LendTableActive
                            data={activeLend}
                            USDPrice={USDPrice}
                        />
                    </Grid>
                )}
                {!!inactiveLend.length && (
                    <Grid item lg={12} xs={12}>
                        <LendTable
                            data={inactiveLend}
                            onActivate={onActivate}
                        />
                    </Grid>
                )}{" "}
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
Lend.propTypes = {
    className: PropTypes.string,
    activeLend: PropTypes.array.isRequired,
    inactiveLend: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default Lend;
