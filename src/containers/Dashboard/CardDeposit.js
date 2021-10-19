// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardDeposit from "components/Dashboard/CardDeposit";

// Section 3: Selectors / hooks
import { getTotalDeposit } from "redux/selectors/data/totalBalance";
import {
    getAggregatedDepositAPY,
    getAggregatedAlkApy,
} from "redux/selectors/data/lend";
import { isWalletConnected } from "redux/selectors/data/onboard";

import useFetchALKPrice from "hooks/useFetchALKPrice";

import useFetchMarkets from "hooks/useFetchMarkets";

// Section 4: Code Component
const CardDepositContainer = () => {
    useFetchALKPrice();
    useFetchMarkets(true);

    const totalDeposit = useSelector(getTotalDeposit); //

    const totalDepositAPY = useSelector(getAggregatedDepositAPY); // combined portfolio APY rate
    const aggregatedAlkApy = useSelector(getAggregatedAlkApy);
    const walletConnected = useSelector(isWalletConnected);

    return (
        <CardDeposit
            totalDeposit={totalDeposit}
            currency="USD"
            difference={0}
            apy={totalDepositAPY}
            aggregatedAlkApy={aggregatedAlkApy}
            walletConnected={walletConnected}
        />
    );
};

export default CardDepositContainer;
