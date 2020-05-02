// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTable from "./Table";
import LendTableActive from "./TableActive";
import LendCardValue from "./CardValue";
import LendCardInterest from "./CardInterest";
import LendCardAPR from "./CardAPR";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

// Section 5: Code Component
const Lend = ({ activeLend, inactiveLend, pending, onActivate }) => (
    <Container maxWidth={false} disableGutters={true}>
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
            {!!activeLend.length && (
                <Grid item lg={12} xs={12}>
                    <LendTableActive data={activeLend} />
                </Grid>
            )}
            {!!inactiveLend.length && (
                <Grid item lg={12} xs={12}>
                    <LendTable
                        data={inactiveLend}
                        loading={pending}
                        onActivate={onActivate}
                    />
                </Grid>
            )}{" "}
        </Grid>
    </Container>
);

// Section 6: Documentation with PropTypes
Lend.propTypes = {
    pending: PropTypes.array.isRequired,
    activeLend: PropTypes.array.isRequired,
    inactiveLend: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired
};

// Section 7:  Connect styles and export
export default Lend;
