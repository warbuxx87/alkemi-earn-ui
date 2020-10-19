import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Dashboard/CardValue";
import {
    getAggregatedBalance,
    getUserCollateralRatio,
} from "redux/selectors/totalBalance";

const CardValueContainer = () => {
    const aggregatedBalance = useSelector(getAggregatedBalance);
    const collateralRatio = useSelector(getUserCollateralRatio);

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
