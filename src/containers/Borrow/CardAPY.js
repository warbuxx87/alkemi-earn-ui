import React from "react";
import { useSelector } from "react-redux";

import CardAPY from "components/UI/Cards/CardAPY";

import { getAggregatedBorrowAPY } from "redux/selectors/data/borrow";
import Big from "big.js";

const CardAPYContainer = ({ walletConnected, aggregatedAlkApy }) => {
    const totalBorrowAPY = useSelector(getAggregatedBorrowAPY);

    const [totalApy, setTotalApy] = React.useState("0.00");
    React.useEffect(() => {
        if (totalBorrowAPY && !isNaN(totalBorrowAPY))
            setTotalApy(Big(totalBorrowAPY).times(100).toFixed(2));
    }, [totalBorrowAPY]);

    return (
        <CardAPY
            totalAPY={totalApy}
            aggregatedAlkApy={aggregatedAlkApy}
            walletConnected={walletConnected}
            color="warning"
            title="Loan APY%"
            typeOfAPY={"borrow"}
        />
    );
};

export default CardAPYContainer;
