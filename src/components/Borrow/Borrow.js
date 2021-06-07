// Main Component

// Section 1: React low level imports
import React, { useState } from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs,
} from "@material-ui/core";

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
    tabs: {
        "& .MuiTab-root": {
            textTransform: "capitalize",
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            "@media (min-width:1940px)": {
                fontSize: "0.875rem",
            },
        },
        "& .MuiDivider-root": {
            backgroundColor: "#121316",
        },
    },
}));

const tabs = [
    { value: "tableverified", label: "Verified" },
    { value: "tableopen", label: "Open" },
];

// Section 5: Code Component
function Borrow({
    activeBorrow,
    inactiveBorrow,
    onActivate,
    USDPrice,
    txs,
    walletIsKYCd,
    userWalletNetwork,
}) {
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState("tabledeposit");
    const handleTabsChange = (event, value) => {
        setCurrentTab(value);
    };

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
                                userWalletNetwork={userWalletNetwork}
                            />
                        </Grid>
                    )}
                    {!!inactiveBorrow.length && (
                        <Grid item lg={12} xs={12}>
                            <Box className={classes.tabs}>
                                <Box mt={5}>
                                    <Tabs
                                        onChange={handleTabsChange}
                                        scrollButtons="auto"
                                        value={currentTab}
                                        textColor="secondary"
                                        variant="scrollable"
                                        className={classes.tabs}
                                    >
                                        {tabs.map((tab) => (
                                            <Tab
                                                key={tab.value}
                                                label={tab.label}
                                                value={tab.value}
                                            />
                                        ))}
                                    </Tabs>
                                </Box>
                                <Divider />
                                <Box py={1} pb={6}>
                                    {currentTab === "tabledeposit" && (
                                        <BorrowTable
                                            data={inactiveBorrow}
                                            onActivate={onActivate}
                                            txs={txs}
                                            walletIsKYCd={walletIsKYCd}
                                            userWalletNetwork={
                                                userWalletNetwork
                                            }
                                        />
                                    )}
                                    {currentTab === "tableborrow" && (
                                        <BorrowTable
                                            data={inactiveBorrow}
                                            onActivate={onActivate}
                                            txs={txs}
                                            walletIsKYCd={walletIsKYCd}
                                            userWalletNetwork={
                                                userWalletNetwork
                                            }
                                        />
                                    )}
                                </Box>
                            </Box>
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
