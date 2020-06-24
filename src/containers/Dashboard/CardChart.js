import React from "react";
import { connect } from "react-redux";

import CardChart from "components/Dashboard/CardChart";
import {
    getAggregatedBalance,
    getCollateralRatio,
} from "redux/selectors/totalBalance";

const CardChartContainer = ({ aggregatedBalance, collateralRatio }) => {
    return (
        <CardChart
            aggregatedBalance={aggregatedBalance}
            collateralRatio={collateralRatio}
            currency="USD"
            difference={0}
        />
    );
};

const mapStateToProps = (state) => ({
    aggregatedBalance: getAggregatedBalance(state),
    collateralRatio: getCollateralRatio(state),
});

export default connect(mapStateToProps)(CardChartContainer);
