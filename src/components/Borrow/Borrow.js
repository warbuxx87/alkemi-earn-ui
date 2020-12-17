// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import BorrowTable from "./Table";
import BorrowTableActive from "./TableActive";
import BorrowCardValue from "containers/Borrow/CardValue";
import BorrowCardLimit from "containers/Borrow/CardLimit";
import BorrowCardAPY from "containers/Borrow/CardAPY";

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
function Borrow({ activeBorrow, inactiveBorrow, onActivate, USDPrice, txs }) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <BorrowCardValue />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <BorrowCardLimit />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <BorrowCardAPY />
                    </Grid>
                    {!!activeBorrow.length && (
                        <Grid item lg={12} xs={12}>
                            <BorrowTableActive
                                data={activeBorrow}
                                USDPrice={USDPrice}
                            />
                        </Grid>
                    )}
                    {!!inactiveBorrow.length && (
                        <Grid item lg={12} xs={12}>
                            <BorrowTable
                                data={inactiveBorrow}
                                onActivate={onActivate}
                                txs={txs}
                            />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}

// Section 6: Documentation with PropTypes
Borrow.propTypes = {
    className: PropTypes.string,
    activeBorrow: PropTypes.array.isRequired,
    inactiveBorrow: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default Borrow;
