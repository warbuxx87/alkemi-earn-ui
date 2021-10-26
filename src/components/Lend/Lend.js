// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, Container, Grid, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTable from "./Table";
import LendTableActive from "./TableActive";
import LendCardValue from "containers/Lend/CardValue";
import LendCardInterest from "./CardInterest";
import LendCardAPY from "containers/Lend/CardAPY";

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
function Lend({
    activeLend,
    inactiveLend,
    onActivate,
    USDPrice,
    displayAllocateButton,
    txs,
    needKYC,
    walletIsKYCd,
    userWalletNetwork,

    calculatedInterest,
    fetchInterestErrorStatus,
    marketsData,
    walletConnected,

    alkApyPerMarket,
    aggregatedAlkApy,
}) {
    const classes = useStyles();
    return (
        <Container maxWidth={false} className={classes.container}>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={6} xs={12}>
                        <LendCardValue />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <LendCardAPY
                            walletConnected={walletConnected}
                            aggregatedAlkApy={aggregatedAlkApy}
                        />
                    </Grid>
                    <Grid item lg={4} sm={6} xs={12}>
                        <LendCardInterest
                            calculatedInterest={calculatedInterest}
                            fetchInterestErrorStatus={fetchInterestErrorStatus}
                            walletConnected={walletConnected}
                        />
                    </Grid>
                    {!!activeLend.length && (
                        <Grid item lg={12} xs={12}>
                            <LendTableActive
                                data={activeLend}
                                USDPrice={USDPrice}
                                userWalletNetwork={userWalletNetwork}
                                alkApyPerMarket={alkApyPerMarket}
                            />
                        </Grid>
                    )}
                    {!!inactiveLend.length && (
                        <Grid item lg={12} xs={12}>
                            <LendTable
                                data={inactiveLend}
                                onActivate={onActivate}
                                displayAllocateButton={displayAllocateButton}
                                txs={txs}
                                walletIsKYCd={walletIsKYCd}
                                needKYC={needKYC}
                                userWalletNetwork={userWalletNetwork}
                                marketsData={marketsData}
                                walletConnected={walletConnected}
                                alkApyPerMarket={alkApyPerMarket}
                            />
                        </Grid>
                    )}{" "}
                </Grid>
            </Box>
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
