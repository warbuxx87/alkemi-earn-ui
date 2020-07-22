import React from "react";
import { useSelector } from "react-redux";

import CardCollateral from "components/Markets/CardCollateral";
import {
    getAggregatedBalance,
    getUserCollateralRatio,
} from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardCollateralContainer = () => {
    useFetchPrice(); // gets current USD price

    const aggregatedBalance = useSelector(getAggregatedBalance);
    const collateralRatio = useSelector(getUserCollateralRatio);

    return (
        <CardCollateral
            aggregatedBalance={aggregatedBalance}
            collateralRatio={collateralRatio}
            currency="USD"
            difference={0}
        />
    );
};

export default CardCollateralContainer;
