import React from "react";
import { connect } from "react-redux";

import CardValue from "components/Dashboard/CardValue";
import { getAggregatedBalance } from "redux/selectors/totalBalance";

const CardValueContainer = ({ aggregatedBalance }) => {
    return (
        <CardValue
            aggregatedBalance={aggregatedBalance}
            dayChange="0"
            currency="USD"
            difference={0}
        />
    );
};

const mapStateToProps = state => ({
    aggregatedBalance: getAggregatedBalance(state)
});

export default connect(mapStateToProps)(CardValueContainer);
