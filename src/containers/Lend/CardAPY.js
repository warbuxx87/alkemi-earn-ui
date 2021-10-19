import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/Cards/CardAPY";

import { getAggregatedDepositAPY } from "redux/selectors/data/lend";
import Big from "big.js";

const CardAPYContainer = ({ walletConnected, aggregatedAlkApy }) => {
    const totalDepositAPY = useSelector(getAggregatedDepositAPY);

    const [totalApy, setTotalApy] = React.useState("0.00");
    React.useEffect(() => {
        if (totalDepositAPY && !isNaN(totalDepositAPY))
            setTotalApy(Big(totalDepositAPY).times(100).toFixed(2));
    }, [totalDepositAPY]);

    return (
        <CardAPY
            totalAPY={totalApy}
            aggregatedAlkApy={aggregatedAlkApy}
            walletConnected={walletConnected}
            color="success"
            title="Earning APY%"
        />
    );
};

export default CardAPYContainer;
