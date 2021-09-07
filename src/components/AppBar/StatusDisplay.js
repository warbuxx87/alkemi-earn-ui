// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, makeStyles, withStyles, Tooltip } from "@material-ui/core";
import Status from "@material-ui/icons/VerifiedUser";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = (props) =>
    makeStyles((theme) => ({
        label: {
            //color: theme.palette[props.color].main,
        },
        KYCIcon: {
            width: "18px",
            height: "18px",
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
        backgroundColor: theme.palette.background.light,
        color: "#ffffff",
        boxShadow: theme.shadows[1],
        marginRight: 25,
    },
    arrow: {
        color: theme.palette.background.light,
    },
}))(Tooltip);

function StatusDisplay({ walletIsKYCd, tooltipTitle, ...props }) {
    const classes = useStyles(props)();

    // Section 5: Code Component
    return (
        <Box display="flex" px={1}>
            <Tooltip title={tooltipTitle} placement="bottom" arrow>
                <Status fontSize="small" className={classes.KYCIcon} />
            </Tooltip>
        </Box>
    );
}

// Section 6: Documentation with PropTypes
StatusDisplay.propTypes = {
    walletIsKYCd: PropTypes.bool,
    color: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default StatusDisplay;
