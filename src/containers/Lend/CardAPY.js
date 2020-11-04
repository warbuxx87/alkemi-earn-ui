import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/CardAPY";

import { getAggregatedDepositAPY } from "redux/selectors/data/lend";

const CardAPYContainer = () => {
    const totalDepositAPY = useSelector(getAggregatedDepositAPY);

    return (
        <CardAPY
            totalAPY={totalDepositAPY}
            color="success"
            title="Earning APY%"
        />
    );
};

export default CardAPYContainer;
