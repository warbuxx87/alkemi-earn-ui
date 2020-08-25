// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Liquidate from "components/Liquidate/Liquidate";
import useFetchLiquidations from "hooks/useFetchLiquidations";

import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors
import { walletNetworkName } from "redux/selectors/onboard";

// Section 4: Container body
const LiquidateContainer = () => {
    useFetchLiquidations(); // retrieve liquidations

    const drizzle = useContext(DrizzleContext);
    const currentNetworkName = useSelector(walletNetworkName);

    return <Liquidate currentNetworkName={currentNetworkName} />;
};

// Section 5: Exports
export default LiquidateContainer;
