// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Grid, makeStyles } from "@material-ui/core";
import { CheckCircle, XCircle } from "react-feather";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = (props) =>
    makeStyles((theme) => ({
        label: {
            //color: theme.palette[props.color].main,
        },
        KYCIcon: {
            width: "15px",
            height: "15px",
            marginLeft: "12px",
            color: theme.palette[props.color].main,
        },
    }));

function KYCDisplay({ walletIsKYCd, ...props }) {
    const classes = useStyles(props)();

    // Section 5: Code Component
    return (
        <Grid>
            {walletIsKYCd ? (
                <CheckCircle fontSize="small" className={classes.KYCIcon} />
            ) : (
                <XCircle fontSize="small" className={classes.KYCIcon} />
            )}
        </Grid>
    );
}

// Section 6: Documentation with PropTypes
KYCDisplay.propTypes = {
    walletIsKYCd: PropTypes.bool,
    color: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default KYCDisplay;
