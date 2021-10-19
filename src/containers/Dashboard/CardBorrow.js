// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardBorrow from "components/Dashboard/CardBorrow";

// Section 3: Selectors
import { getTotalBorrow } from "redux/selectors/data/totalBalance";
import {
    getAggregatedBorrowAPY,
    getAggregatedAlkApy,
} from "redux/selectors/data/borrow";
import { isWalletConnected } from "redux/selectors/data/onboard";

import useFetchALKPrice from "hooks/useFetchALKPrice";

// Section 4: Code Component
const CardValueContainer = () => {
    useFetchALKPrice();
    const totalBorrow = useSelector(getTotalBorrow);

    const totalBorrowAPY = useSelector(getAggregatedBorrowAPY); // combined portfolio APY rate
    const aggregatedAlkApy = useSelector(getAggregatedAlkApy);
    const walletConnected = useSelector(isWalletConnected);

    return (
        <CardBorrow
            totalBorrow={totalBorrow}
            currency="USD"
            difference={0}
            apy={totalBorrowAPY}
            aggregatedAlkApy={aggregatedAlkApy}
            walletConnected={walletConnected}
        />
    );
};

export default CardValueContainer;
