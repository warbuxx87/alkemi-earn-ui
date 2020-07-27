import React from "react";
import { useSelector } from "react-redux";

import CardAPR from "components/Lend/CardAPR";

import { getAggregatedDepositAPR } from "redux/selectors/data";

const CardAPRContainer = () => {
    const totalDepositAPR = useSelector(getAggregatedDepositAPR);

    return <CardAPR totalAPR={totalDepositAPR} />;
};

export default CardAPRContainer;
