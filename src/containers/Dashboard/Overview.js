import React from "react";
import { useSelector } from "react-redux";

import Big from "big.js";

import Overview from "components/Dashboard/Overview";
import {
    getAggregatedBalance,
    getCombinedAPY,
    getCombinedAlkApy,
} from "redux/selectors/data/totalBalance";

const OverviewContainer = () => {
    const aggregatedBalance = useSelector(getAggregatedBalance);

    const combinedAPY = useSelector(getCombinedAPY);
    const combinedAlkApy = useSelector(getCombinedAlkApy);

    const [combinedApyAndAlkApy, setCombinedApyAndAlkApy] = React.useState(0);

    React.useEffect(() => {
        let combinedValues = 0;

        if (combinedAPY && !isNaN(combinedAPY))
            combinedValues = parseFloat(Big(combinedAPY).times(100).toFixed(2));

        if (combinedAlkApy) combinedValues += combinedAlkApy;

        setCombinedApyAndAlkApy(combinedValues);
    }, [combinedAPY, combinedAlkApy]);

    return (
        <Overview
            aggregatedBalance={aggregatedBalance}
            combinedAPY={combinedApyAndAlkApy}
            difference={0}
        />
    );
};

export default OverviewContainer;
