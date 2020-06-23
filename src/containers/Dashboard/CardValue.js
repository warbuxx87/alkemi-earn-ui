import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Dashboard/CardValue";
import {
    getAggregatedBalance,
    getCollateralRatio,
} from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardValueContainer = () => {
    useFetchPrice(); // gets current USD price

    const aggregatedBalance = useSelector(getAggregatedBalance);
    const collateralRatio = useSelector(getCollateralRatio);

    return (
        <CardValue
            aggregatedBalance={aggregatedBalance}
            collateralRatio={collateralRatio}
            currency="USD"
            difference={0}
        />
    );
};

export default CardValueContainer;
