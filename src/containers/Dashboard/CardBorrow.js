// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import CardBorrow from "components/Dashboard/CardBorrow";

// Section 3: Selectors
import { getTotalBorrow } from "redux/selectors/totalBalance";
import { getAggregatedBorrowAPR } from "redux/selectors/data/borrow";

// Section 4: Code Component
const CardValueContainer = () => {
    const totalBorrow = useSelector(getTotalBorrow);

    const totalBorrowAPR = useSelector(getAggregatedBorrowAPR); // combined portfolio APR rate

    return (
        <CardBorrow
            totalBorrow={totalBorrow}
            currency="USD"
            difference={0}
            apr={totalBorrowAPR}
        />
    );
};

export default CardValueContainer;
