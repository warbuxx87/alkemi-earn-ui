// Section 1: React low level imports
import React from "react";
import _ from "lodash";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import Stats from "./CardStats";
import MarketCardSupply from "./CardSupply";
import MarketCardBorrow from "./CardBorrow";
import MarketCardCollateral from "./CardCollateral";
import MarketTable from "./TableMarkets";

import useFetchMarkets from "hooks/useFetchMarkets";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 250,
        marginRight: 10,
    },
    heading: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

const Markets = () => {
    const classes = useStyles();

    // TODO: to be moved to container
    const { supplyArray, borrowArray } = useFetchMarkets(true);

    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardSupply />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardBorrow />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardCollateral />
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Deposits" />
                        <Divider />
                        <CardContent>
                            <Box height="180px" overflow="auto" pr={3} pt={1}>
                                {supplyArray &&
                                    supplyArray.length > 0 &&
                                    supplyArray.map((supply_item) => {
                                        return (
                                            <Stats
                                                {...supply_item}
                                                key={supply_item.symbol}
                                                type={"supply"}
                                            />
                                        );
                                    })}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item lg={6} sm={6} xs={12}>
                    <Card>
                        <CardHeader title="Borrowed" />
                        <Divider />
                        <CardContent>
                            <Box height="180px" overflow="auto" pr={3} pt={1}>
                                {borrowArray &&
                                    borrowArray.length > 0 &&
                                    borrowArray.map((borrow_item) => {
                                        return (
                                            <Stats
                                                {...borrow_item}
                                                key={borrow_item.symbol}
                                                type={"borrow"}
                                            />
                                        );
                                    })}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <MarketTable />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Markets;
