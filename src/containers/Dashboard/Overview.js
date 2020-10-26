import React from "react";
import { useSelector } from "react-redux";

import Overview from "components/Dashboard/Overview";
import {
    getAggregatedBalance,
    getUserCollateralRatio,
} from "redux/selectors/totalBalance";

const OverviewContainer = () => {
    const aggregatedBalance = useSelector(getAggregatedBalance);
    const combinedAPY = useSelector(getUserCollateralRatio);

    return (
        <Overview
            aggregatedBalance={aggregatedBalance}
            combinedAPY={combinedAPY}
            currency="USD"
            difference={0}
        />
    );
};

export default OverviewContainer;
