// Main component

// Section 1: React low level imports
import React from "react";
// import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import ApplicationsList from "./ApplicationsList";
import KycWithoutKycList from "./KycWithoutKycList";

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

// Section 5: Code Component
const KycDashboard = ({
    kycApplications,
    currentNetworkName,
    previouslyKycdWallets,
    kycdWithoutApplications,
}) => {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sm={12} xs={12}>
                        <Box m={1}>
                            <Typography variant="h3" component="h3">
                                Currently on {currentNetworkName} network
                            </Typography>
                        </Box>

                        <ApplicationsList
                            kycApplications={kycApplications}
                            currentNetworkName={currentNetworkName}
                            previouslyKycdWallets={previouslyKycdWallets}
                        />

                        <br />

                        <KycWithoutKycList
                            kycdWithoutApplications={kycdWithoutApplications}
                            currentNetworkName={currentNetworkName}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

// Section 6: Documentation with PropTypes
KycDashboard.propTypes = {};

// Section 7:  Export
export default KycDashboard;
