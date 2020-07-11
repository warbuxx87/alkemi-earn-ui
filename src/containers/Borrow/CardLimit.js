import React from "react";
import { useSelector } from "react-redux";

import CardLimit from "components/Borrow/CardLimit";
import {
    getTotalBorrow,
    getTotalSupply,
    getCollateralRatio,
} from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardLimitContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalBorrowed = useSelector(getTotalBorrow);
    const totalSupplied = useSelector(getTotalSupply);
    const collateralRatio = useSelector(getCollateralRatio) / 1e18;

    const maxBorrow = totalSupplied / collateralRatio;

    let borrowLimit = ((totalBorrowed / maxBorrow) * 100).toFixed(2);
    borrowLimit = parseFloat(borrowLimit);

    return <CardLimit borrowLimit={borrowLimit} />;
};

export default CardLimitContainer;
