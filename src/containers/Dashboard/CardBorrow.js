import React from "react";
import { connect } from "react-redux";

import CardBorrow from "components/Dashboard/CardBorrow";
import { getTotalBorrow } from "redux/selectors/totalBalance";

const CardValueContainer = ({ totalBorrow }) => {
    return <CardBorrow totalBorrow={totalBorrow} currency="$" difference={0} />;
};

const mapStateToProps = state => ({
    totalBorrow: getTotalBorrow(state)
});

export default connect(mapStateToProps)(CardValueContainer);
