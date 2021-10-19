import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/Cards/CardAPY";

import { getAggregatedDepositAPY } from "redux/selectors/data/lend";

const CardAPYContainer = ({ walletConnected, aggregatedAlkApy }) => {
    const totalDepositAPY = useSelector(getAggregatedDepositAPY);
    return (
        <CardAPY
            totalAPY={totalDepositAPY}
            aggregatedAlkApy={aggregatedAlkApy}
            walletConnected={walletConnected}
            color="success"
            title="Earning APY%"
        />
    );
};

export default CardAPYContainer;
