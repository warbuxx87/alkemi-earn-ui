import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/Cards/CardAPY";

import { getAggregatedBorrowAPY } from "redux/selectors/data/borrow";

const CardAPYContainer = ({ aggregatedAlkApy }) => {
    const totalBorrowAPY = useSelector(getAggregatedBorrowAPY);

    return (
        <CardAPY
            totalAPY={totalBorrowAPY}
            aggregatedAlkApy={aggregatedAlkApy}
            color="warning"
            title="Loan APY%"
        />
    );
};

export default CardAPYContainer;
