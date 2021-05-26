// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Box, Typography, Grid, Tooltip } from "@material-ui/core";

import { HelpCircle as HelpIcon } from "react-feather";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component
function OriginationFeeDisplay({
    classes,
    amount,
    orginationFee,
    asset,
    formattedOrginationFee,
}) {
    return (
        <Grid container className={classes.rateRow}>
            <Grid item md={6} xs className={classes.vertCent}>
                <Box display="flex" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                        Borrow Fees
                    </Typography>
                    <Tooltip
                        title="0.1% origination fee"
                        placement="right"
                        arrow
                        className={classes.toolTip}
                    >
                        <HelpIcon
                            fontSize="small"
                            className={classes.helpIcon}
                        />
                    </Tooltip>
                </Box>
            </Grid>
            <Grid item md={6} xs container justify="flex-end">
                <Box>
                    {amount * orginationFee}{" "}
                    {asset.unit === "WETH" ? "ETH" : asset.unit}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="right"
                    >
                        {formattedOrginationFee}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

// Section 6: Documentation with PropTypes
OriginationFeeDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
    orginationFee: PropTypes.number.isRequired,
    amount: PropTypes.string.isRequired,
    asset: PropTypes.object.isRequired,
    formattedOrginationFee: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default OriginationFeeDisplay;
