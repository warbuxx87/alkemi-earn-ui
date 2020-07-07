import React from "react";
import { useSelector } from "react-redux";

import CardLimit from "components/Borrow/CardLimit";
import {
    getTotalBorrow,
    getAggregatedBalance,
} from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardLimitContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalBorrow = useSelector(getTotalBorrow);
    const totalLiquidity = useSelector(getAggregatedBalance);

    let borrowLimit = ((totalBorrow / totalLiquidity) * 100).toFixed(2);
    borrowLimit = parseFloat(borrowLimit);

    return <CardLimit borrowLimit={borrowLimit} />;
};

export default CardLimitContainer;
