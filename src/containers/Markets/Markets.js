// Section 1: React/Redux low level imports
import React from "react";

// Section 2: internal imports
import Markets from "components/Markets/Markets";

import useFetchMarkets from "hooks/useFetchMarkets";

import { format_str_to_kmb } from "utils/markets";

// Section 3: Selectors

// Section 4: Container body
const MarketsContainer = () => {
    const { supplyArray, borrowArray, calculationsTotals } = useFetchMarkets(
        true
    );

    const totalBorrowBalanceContent = `$${
        calculationsTotals && calculationsTotals.totalBorrowBalanceUSD
            ? format_str_to_kmb(
                  calculationsTotals.totalBorrowBalanceUSD.toString()
              )
            : 0
    }`;

    return (
        <Markets
            supplyArray={supplyArray}
            borrowArray={borrowArray}
            totalBorrowBalanceContent={totalBorrowBalanceContent}
        />
    );
};

// Section 5: Exports
export default MarketsContainer;
