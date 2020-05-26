import React from "react";
import { connect } from "react-redux";

import CardSupply from "components/Dashboard/CardSupply";
import { getTotalSupply } from "redux/selectors/data";

const CardSupplyContainer = ({ totalSupply }) => {
    return <CardSupply totalSupply={totalSupply} currency="$" difference={0} />;
};

const mapStateToProps = state => ({
    totalSupply: getTotalSupply(state)
});

export default connect(mapStateToProps)(CardSupplyContainer);
