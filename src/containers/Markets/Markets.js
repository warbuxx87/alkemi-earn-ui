// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

import { format_str_to_kmb } from "utils/ui";

// Section 3: Selectors
import { walletNetwork } from "redux/selectors/data/onboard";
import {
    getBorrowArray,
    getCalculationsTotals,
    getMarkets,
    getSupplyArray,
} from "redux/selectors/data/markets";

// Section 4: Container body
const MarketsContainer = () => {
    useFetchMarkets(true);
    const marketsData = useSelector(getMarkets);
    const supplyArray = useSelector(getSupplyArray);
    const borrowArray = useSelector(getBorrowArray);
    const calculationsTotals = useSelector(getCalculationsTotals);

    const userWalletNetwork = useSelector(walletNetwork);

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

    return (
        <Markets
            marketsData={marketsData}
            supplyArray={supplyArray}
            borrowArray={borrowArray}
            totalBorrowedContent={totalBorrowedContent}
            collateralRatioContent={collateralRatioContent()}
            totalDepositsContent={totalDepositsContent}
            userWalletNetwork={userWalletNetwork}
        />
    );
};

// Section 5: Exports
export default MarketsContainer;
