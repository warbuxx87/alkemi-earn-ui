import React from "react";
import { useSelector } from "react-redux";

import CardAPR from "components/Borrow/CardAPR";

import { getAggregatedBorrowAPR } from "redux/selectors/data/borrow";

const CardAPRContainer = () => {
    const totalBorrowAPR = useSelector(getAggregatedBorrowAPR);

    return <CardAPR totalAPR={totalBorrowAPR} />;
};

export default CardAPRContainer;
