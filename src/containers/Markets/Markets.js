// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

import { format_str_to_kmb } from "utils/ui";

// Section 3: Selectors
import { walletNetwork } from "redux/selectors/data/onboard";

// Section 4: Container body
const MarketsContainer = () => {
    const {
        marketsData,
        supplyArray,
        borrowArray,
        calculationsTotals,
    } = useFetchMarkets(true); // optimize useFetchMarkets (with a throttled call in redux action) if it's used from more than one place

    const userWalletNetwork = useSelector(walletNetwork);

    const totalBorrowedContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalBorrowBalanceUSD.toString()
              )
            : 0
    }`;

    const collateralRatioContent = () => {
        let displayedValue = 0;

        if (calculationsTotals && calculationsTotals.totalBorrowBalanceUSD) {
            if (
                isFinite(calculationsTotals.totalCollateralRatio) &&
                !isNaN(calculationsTotals.totalCollateralRatio)
            )
                // Will display 0 instead of Infinity
                displayedValue = calculationsTotals.totalCollateralRatio;
        }

        return `${displayedValue}%`;
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
