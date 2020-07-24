import React from "react";
import { useSelector } from "react-redux";

import CardAPR from "components/Lend/CardAPR";

import { getAggregatedLendAPR } from "redux/selectors/data/lend";

const CardAPRContainer = () => {
    const totalLendAPR = useSelector(getAggregatedLendAPR);

    return <CardAPR totalAPR={totalLendAPR} />;
};

export default CardAPRContainer;
