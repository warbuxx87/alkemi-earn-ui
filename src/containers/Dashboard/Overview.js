import React from "react";
import { useSelector } from "react-redux";

import Overview from "components/Dashboard/Overview";
import {
    getAggregatedBalance,
    getUserCollateralRatio,
    getCombinedAPY,
} from "redux/selectors/totalBalance";

const OverviewContainer = () => {
    const aggregatedBalance = useSelector(getAggregatedBalance);

    //const combinedAPY = useSelector(getUserCollateralRatio);
    const combinedAPY = useSelector(getCombinedAPY);

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
