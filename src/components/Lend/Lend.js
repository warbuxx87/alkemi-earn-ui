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
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import LendTable from "./Table";
import LendTableActive from "./TableActive";
import Overview from "containers/Dashboard/Overview";

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
        "& .MuiDivider-root": {
            backgroundColor: "#121316",
        },
    },
}));

const tabs = [
    { value: "tabledeposit", label: "Active Deposits" },
    { value: "tableborrow", label: "Active Borrowed" },
];

// Section 5: Code Component
function Lend({
    className,
    activeLend,
    inactiveLend,
    onActivate,
    USDPrice,
    displayAllocateButton,
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
                    <Grid item lg={12} sm={12} xs={12}>
                        <Overview />
                    </Grid>
                    <Grid item lg={12} sm={12} xs={12}>
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
                                    <LendTableActive
                                        data={activeLend}
                                        USDPrice={USDPrice}
                                    />
                                )}
                                {currentTab === "tableborrow" && (
                                    <LendTableActive
                                        data={activeLend}
                                        USDPrice={USDPrice}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Grid>
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
