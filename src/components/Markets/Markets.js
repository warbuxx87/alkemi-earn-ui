// Main component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

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
    MenuItem,
    TextField,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import Stats from "./CardStats";
import MarketsCard from "./MarketsCard";
import MarketsTable from "./TableMarkets";

// Section 4: Define Styles function taking theme as argument and returning an object
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
    containerRow: {
        marginTop: 12,
    },
}));
const pools = [
    {
        value: "combined",
        label: "Combined Pools",
    },
    {
        value: "verified",
        label: "Verified Pool",
    },
    {
        value: "open",
        label: "Open Pool",
    },
];

// Section 5: Code Component
const Markets = ({
    marketsData,
    supplyArray,
    borrowArray,
    totalBorrowedContent,
    collateralRatioContent,
    totalDepositsContent,
    userWalletNetwork,
    alkApyPerMarket,
}) => {
    const classes = useStyles();
    const [pool, setPool] = React.useState("Combined Pools");

    const handleChange = (event) => {
        setPool(event.target.value);
    };

    return (
        <Container maxWidth={false} className={classes.container}>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                display="flex"
                justifyContent="flex-end"
            >
                <div>
                    <TextField
                        id="pool-select"
                        select
                        value={pool}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        className={classes.assetField}
                        color="secondary"
                    >
                        {pools.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <MarketsCard
                            title="Total Protocol Deposits"
                            cardContent={totalDepositsContent}
                        />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <MarketsCard
                            title="Total Protocol Borrows"
                            cardContent={totalBorrowedContent}
                        />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <MarketsCard
                            title="Collateral Ratio"
                            cardContent={collateralRatioContent}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    mt={4}
                    className={classes.containerRow}
                >
                    <Grid item lg={6} sm={6} xs={12}>
                        <Card>
                            <CardHeader title="Deposits" />
                            <Divider />
                            <CardContent>
                                <Box
                                    height="180px"
                                    overflow="auto"
                                    pr={3}
                                    pt={1}
                                >
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
                                <Box
                                    height="180px"
                                    overflow="auto"
                                    pr={3}
                                    pt={1}
                                >
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
                        <MarketsTable
                            marketsData={marketsData}
                            userWalletNetwork={userWalletNetwork}
                            alkApyPerMarket={alkApyPerMarket}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

// Section 6: Documentation with PropTypes
Markets.propTypes = {
    supplyArray: PropTypes.array.isRequired,
    borrowArray: PropTypes.array.isRequired,
    userWalletNetwork: PropTypes.number.isRequired,
};

// Section 7:  Export
export default Markets;
