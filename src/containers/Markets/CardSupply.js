// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardDeposit from "components/Markets/CardSupply";

// Section 3: Selectors / hooks
import { getTotalDeposit } from "redux/selectors/totalBalance";
import { getAggregatedDepositAPR } from "redux/selectors/data/lend";

// Section 4: Code Component
const CardDepositContainer = () => {
    const totalDeposit = useSelector(getTotalDeposit); //

    const totalDepositAPR = useSelector(getAggregatedDepositAPR); // combined portfolio APR rate

    return (
        <CardDeposit
            totalDeposit={totalDeposit}
            currency="USD"
            difference={0}
            apr={totalDepositAPR}
        />
    );
};

export default CardDepositContainer;
