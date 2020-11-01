// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardDeposit from "components/Dashboard/CardDeposit";

// Section 3: Selectors / hooks
import { getTotalDeposit } from "redux/selectors/totalBalance";
import { getAggregatedDepositAPY } from "redux/selectors/data/lend";

// Section 4: Code Component
const CardDepositContainer = () => {
    const totalDeposit = useSelector(getTotalDeposit); //

    const totalDepositAPY = useSelector(getAggregatedDepositAPY); // combined portfolio APY rate

    return (
        <CardDeposit
            totalDeposit={totalDeposit}
            currency="USD"
            difference={0}
            apy={totalDepositAPY}
        />
    );
};

export default CardDepositContainer;
