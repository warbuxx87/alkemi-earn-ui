import React from "react";
import { useSelector } from "react-redux";

import Overview from "components/Dashboard/Overview";
import { getTotalDeposit, getTotalAPY } from "redux/selectors/totalBalance";

const OverviewContainer = () => {
    const totalDeposit = useSelector(getTotalDeposit);

    const totalAPY = useSelector(getTotalAPY);

    return (
        <Overview
            totalDeposit={totalDeposit}
            totalAPY={totalAPY}
            currency="USD"
            difference={0}
        />
    );
};

export default OverviewContainer;
