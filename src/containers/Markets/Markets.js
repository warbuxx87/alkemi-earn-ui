// Section 1: React/Redux low level imports
import React from "react";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

// Section 3: Selectors

// Section 4: Container body
const MarketsContainer = () => {
    const { supplyArray, borrowArray } = useFetchMarkets(true);

    return <Markets supplyArray={supplyArray} borrowArray={borrowArray} />;
};

// Section 5: Exports
export default MarketsContainer;
