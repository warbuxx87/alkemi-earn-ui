// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
// import {
//     makeStyles
// } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { sumUpTwoNumbers } from "utils/ui";
// Section 4: Define Styles function taking theme as argument and returning an object
// const useStyles = makeStyles((theme) => ({
// }));

// Section 5: Code Component
const APYDisplay = ({ apy, alkApy }) => {
    // const classes = useStyles();

    return (
        <>
            APY: {apy}% | ALKAPY: {alkApy}% | Combined:{" "}
            {sumUpTwoNumbers(apy, alkApy, 2)}
        </>
    );
};

// Section 6: Documentation with PropTypes
APYDisplay.propTypes = {
    apy: PropTypes.string.isRequired,
    alkApy: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default APYDisplay;
