// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports

// Section 3: Components & Containers import from the application
import { breakNumberFromDecimalPoint } from "utils/ui";

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component

// Number formatted to have the color of left part of the decimal point and the cents different
const SplitNumber = ({ theNumber, shouldFormatNumber, centsClassName }) => {
    const {
        leftOfDecimalPoint,
        numberOnRightToDisplay,
    } = breakNumberFromDecimalPoint(theNumber, shouldFormatNumber);

    return (
        <span>
            {leftOfDecimalPoint}
            <span className={centsClassName}>
                {numberOnRightToDisplay.length > 0 ? "." : ""}
                {numberOnRightToDisplay}
            </span>
        </span>
    );
};

// Section 6: Documentation with PropTypes
SplitNumber.propTypes = {
    theNumber: PropTypes.string.isRequired,
    centsClassName: PropTypes.string,
};

// Section 7:  Connect styles and export
export default SplitNumber;
