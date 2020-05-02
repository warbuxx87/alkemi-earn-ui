// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Container, Grid } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowingTable from "./Table";
import BorrowTableActive from "./TableActive";
import BorrowCardValue from "./CardValue";
import BorrowCardInterest from "./CardInterest";
import BorrowCardAPR from "./CardAPR";

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component

const Borrow = ({ activeBorrow, inactiveBorrow, pending, onActivate }) => (
    <Container maxWidth={false} disableGutters={true}>
        <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
                <BorrowCardValue />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <BorrowCardInterest />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
                <BorrowCardAPR />
            </Grid>

            {!!activeBorrow.length && <BorrowTableActive data={activeBorrow} />}
            {!!inactiveBorrow.length && (
                <BorrowingTable
                    inactiveBorrow={inactiveBorrow}
                    onActivate={onActivate}
                />
            )}
        </Grid>
    </Container>
);

// Section 6: Documentation with PropTypes
Borrow.propTypes = {
    onActivate: PropTypes.func.isRequired,
    activeBorrow: PropTypes.array.isRequired,
    inactiveBorrow: PropTypes.array.isRequired
};

// Section 7:  Connect styles and export
export default Borrow;
