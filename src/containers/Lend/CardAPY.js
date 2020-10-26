import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/Lend/CardAPY";

import { getAggregatedLendAPY } from "redux/selectors/data/lend";

const CardAPRContainer = () => {
    const totalDepositAPY = useSelector(getAggregatedLendAPY);

    return <CardAPY totalAPY={totalDepositAPY} />;
};

export default CardAPRContainer;
