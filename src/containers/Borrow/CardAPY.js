import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/CardAPY";

import { getAggregatedBorrowAPY } from "redux/selectors/data/borrow";

const CardAPYContainer = () => {
    const totalBorrowAPY = useSelector(getAggregatedBorrowAPY);

    return (
        <CardAPY totalAPY={totalBorrowAPY} color="warning" title="Loan APY%" />
    );
};

export default CardAPYContainer;
