import React from "react";
import { connect } from "react-redux";

import CardValue from "components/Dashboard/CardValue";
import {
    getAggregatedBalance,
    getCollateralRatio
} from "redux/selectors/totalBalance";

const CardValueContainer = ({ aggregatedBalance, collateralRatio }) => {
    return (
        <CardValue
            aggregatedBalance={aggregatedBalance}
            collateralRatio={collateralRatio}
            currency="USD"
            difference={0}
        />
    );
};

const mapStateToProps = state => ({
    aggregatedBalance: getAggregatedBalance(state),
    collateralRatio: getCollateralRatio(state)
});

export default connect(mapStateToProps)(CardValueContainer);
