//Wraps (button), while managing disabled state (using span wrapper)
// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Tooltip } from "@material-ui/core";

const ToolTipWrapper = ({ children, walletIsKYCd, toolTipTitle }) => {
    return (
        <>
            {walletIsKYCd !== true ? (
                <Tooltip title={toolTipTitle} placement="left" arrow>
                    <span>{children}</span>
                </Tooltip>
            ) : (
                children
            )}
        </>
    );
};

// Section 6: Documentation with PropTypes
ToolTipWrapper.propTypes = {
    walletIsKYCd: PropTypes.bool.isRequired,
};

// Section 7:  Connect styles and export
export default ToolTipWrapper;
