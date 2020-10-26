import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/Borrow/CardAPY";

import { getAggregatedBorrowAPR } from "redux/selectors/data/borrow";

const CardAPYContainer = () => {
    const totalBorrowAPR = useSelector(getAggregatedBorrowAPR);

    return <CardAPY totalAPR={totalBorrowAPR} />;
};

export default CardAPYContainer;
