// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardBorrow from "components/Dashboard/CardBorrow";

// Section 3: Selectors / hooks
import { getTotalBorrow } from "redux/selectors/totalBalance";
import { getAggregatedBorrowAPY } from "redux/selectors/data/borrow";

// Section 4: Code Component
const CardValueContainer = () => {
    const totalBorrow = useSelector(getTotalBorrow);

    const totalBorrowAPY = useSelector(getAggregatedBorrowAPY); // combined portfolio APY rate

    return (
        <CardBorrow
            totalBorrow={totalBorrow}
            currency="USD"
            difference={0}
            apy={totalBorrowAPY}
        />
    );
};

export default CardValueContainer;
