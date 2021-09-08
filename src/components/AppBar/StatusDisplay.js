// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, makeStyles, Tooltip } from "@material-ui/core";
import Status from "@material-ui/icons/VerifiedUser";
import Open from "@material-ui/icons/Lens";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = (props) =>
    makeStyles((theme) => ({
        label: {
            //color: theme.palette[props.color].main,
        },
        KYCIcon: {
            width: "19px",
            height: "19px",
            color: theme.palette[props.color].main,
        },
        OpenIcon: {
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

function StatusDisplay({
    walletIsKYCd,
    tooltipTitle,
    displayKYCStatus,
    ...props
}) {
    const classes = useStyles(props)();

    // Section 5: Code Component
    return (
        <Box display="flex" px={1}>
            <Tooltip
                className={classes.Tooltip}
                title={tooltipTitle}
                placement="bottom"
                arrow
            >
                {displayKYCStatus ? (
                    <Status fontSize="small" className={classes.KYCIcon} />
                ) : (
                    <Open fontSize="small" className={classes.OpenIcon} />
                )}
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
