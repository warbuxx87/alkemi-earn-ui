// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Liquidate from "components/Liquidate/Liquidate";
import useFetchLiquidations from "hooks/useFetchLiquidations";

import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors
import { getLiquidationsList } from "redux/selectors/data/liquidations";

// Section 4: Container body
const LiquidateContainer = () => {
    useFetchLiquidations(); // retrieve liquidations

    const liquidationsList = useSelector(getLiquidationsList);

    const drizzle = useContext(DrizzleContext);

    return <Liquidate liquidationsList={liquidationsList} />;
};

// Section 5: Exports
export default LiquidateContainer;
