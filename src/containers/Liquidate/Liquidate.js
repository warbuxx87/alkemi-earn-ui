// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Liquidate from "components/Liquidate/Liquidate";
import useFetchLiquidations from "hooks/useFetchLiquidations";

// Section 3: Selectors
import { getLiquidationsList } from "redux/selectors/data/liquidations";
import { walletNetwork } from "redux/selectors/data/onboard";

// Section 4: Container body
const LiquidateContainer = () => {
    useFetchLiquidations(true); // retrieve liquidations

    const liquidationsList = useSelector(getLiquidationsList);
    const userWalletNetwork = useSelector(walletNetwork);

    const [liquidationsToDisplay, setLiquidationsToDisplay] = React.useState(
        []
    );

    React.useEffect(() => {
        const filteredLiquidations = liquidationsList.filter((liquidation) => {
            return liquidation.shortfallUSD >= 1; // filters liquidations to only equal or above one dollar, could be removed once we implement UI-519
        });
        setLiquidationsToDisplay(filteredLiquidations);
    }, [liquidationsList]);

    return (
        <Liquidate
            liquidationsList={liquidationsToDisplay}
            userWalletNetwork={userWalletNetwork}
        />
    );
};

// Section 5: Exports
export default LiquidateContainer;
