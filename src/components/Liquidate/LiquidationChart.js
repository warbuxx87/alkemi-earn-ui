// TODO: make a chart that use the received data to display a breakdown

// Section 1: React low level imports
import React from "react";

const LiquidationChart = ({ supplyList, borrowList }) => {
    console.log("supplyList, borrowList :", supplyList, borrowList);
    /*
        Is the composition chart meant to show the the users collateral makeup or their loan makeup?

        If collateral makeup then use supply array

        if loan makeup then use borrow array
    */

    // Section 5: Code Component
    return <>Chart goes here</>;
};

// Section 6: Documentation with PropTypes
// Liquidate.propTypes = {
//     classes: PropTypes.object.isRequired
// };

// Section 7:  Connect styles and export
export default LiquidationChart;
