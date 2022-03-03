// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

import { format_str_to_kmb } from "utils/ui";
import useFetchALKPrice from "hooks/useFetchALKPrice";

// Section 3: Selectors
import { walletNetwork } from "redux/selectors/data/onboard";
import {
    getBorrowArray,
    getCalculationsTotals,
    getMarkets,
    getSupplyArray,
    getAlkApyPerMarket,
} from "redux/selectors/data/markets";

import { getPool } from "redux/selectors/status/pool";

// Section 4: Container body
const MarketsContainer = () => {
    useFetchALKPrice();
    useFetchMarkets(true);

    const currentPool = useSelector(getPool);

    const [pool, setPool] = React.useState(currentPool);

    const marketsData = useSelector(getMarkets(pool));
    const supplyArray = useSelector(getSupplyArray(pool));
    const borrowArray = useSelector(getBorrowArray(pool));
    const calculationsTotals = useSelector(getCalculationsTotals(pool));
    const alkApyPerMarket = useSelector(getAlkApyPerMarket(pool));

    const userWalletNetwork = useSelector(walletNetwork);

    const [poolWasChanged, setPoolWasChanged] = React.useState(false); // tracks changed by user

    const totalBorrowedContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalBorrowBalanceUSD.toString()
              )
            : 0
    }`;

    const collateralRatioContent = () => {
        if (calculationsTotals && calculationsTotals.totalBorrowBalanceUSD) {
            if (
                isFinite(calculationsTotals.totalCollateralRatio) &&
                !isNaN(calculationsTotals.totalCollateralRatio)
            ) {
                const displayedValue = calculationsTotals.totalCollateralRatio;
                return `${displayedValue}%`;
            }
        }

        return "∞";
    };

    const totalDepositsContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalSupplyBalanceUSD.toString()
              )
            : 0
    }`;

    // Change of pool
    React.useEffect(() => {
        if (!poolWasChanged) setPool(currentPool);
    }, [poolWasChanged, currentPool]);

    const handleChangePool = (event) => {
        if (!poolWasChanged) setPoolWasChanged(true);

        setPool(event.target.value);
    };

    return (
        <Markets
            currentPool={currentPool}
            marketsData={marketsData}
            supplyArray={supplyArray}
            borrowArray={borrowArray}
            totalBorrowedContent={totalBorrowedContent}
            collateralRatioContent={collateralRatioContent()}
            totalDepositsContent={totalDepositsContent}
            userWalletNetwork={userWalletNetwork}
            alkApyPerMarket={alkApyPerMarket}
            handleChangePool={handleChangePool}
            pool={pool}
            setPool={setPool}
        />
    );
};

// Section 5: Exports
export default MarketsContainer;
