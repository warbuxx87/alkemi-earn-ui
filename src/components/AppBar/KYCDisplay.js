// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, makeStyles, withStyles, Tooltip } from "@material-ui/core";
import Status from "@material-ui/icons/Lens";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = (props) =>
    makeStyles((theme) => ({
        label: {
            //color: theme.palette[props.color].main,
        },
        KYCIcon: {
            width: "14px",
            height: "14px",
            color: theme.palette[props.color].main,
        },
        Tooltip: {
            "& .MuiTooltip-tooltip": {
                backgroundColor: "#ffffff",
            },
        },
    }));

const CustomTooltip = withStyles((theme) => ({
    tooltipPlacementLeft: {
        backgroundColor: theme.palette.background.paper,
        color: "#ffffff",
        boxShadow: theme.shadows[1],
        fontSize: 11,
        marginRight: 25,
    },
    arrow: {
        color: theme.palette.background.paper,
    },
}))(Tooltip);

function KYCDisplay({ walletIsKYCd, ...props }) {
    const classes = useStyles(props)();

    // Section 5: Code Component
    return (
        <Box mr={1} pt={0.5}>
            {walletIsKYCd ? (
                <CustomTooltip
                    className={classes.Tooltip}
                    title="KYC Authorized"
                    placement="left"
                    arrow
                >
                    <Status fontSize="small" className={classes.KYCIcon} />
                </CustomTooltip>
            ) : (
                <CustomTooltip
                    className={classes.Tooltip}
                    title="Not KYC Authorized"
                    placement="left"
                    arrow
                >
                    <Status fontSize="small" className={classes.KYCIcon} />
                </CustomTooltip>
            )}
        </Box>
    );
}

// Section 6: Documentation with PropTypes
KYCDisplay.propTypes = {
    walletIsKYCd: PropTypes.bool,
    color: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default KYCDisplay;
