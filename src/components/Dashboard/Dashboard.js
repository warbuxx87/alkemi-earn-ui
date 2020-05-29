// Main Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import { Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import DashCardValue from "containers/Dashboard/CardValue";
import DashCardSupply from "containers/Dashboard/CardSupply";
import DashCardBorrow from "containers/Dashboard/CardBorrow";
import TableSupply from "containers/Dashboard/TableSupply";
import TableBorrow from "containers/Dashboard/TableBorrow";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }
}));

function Dashboard() {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardValue />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardSupply />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <DashCardBorrow />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    <TableSupply />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    <TableBorrow />
                </Grid>
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Dashboard;
