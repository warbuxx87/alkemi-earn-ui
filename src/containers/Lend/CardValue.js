import React from "react";
import { connect } from "react-redux";

import CardValue from "components/Lend/CardValue";
import { getTotalSupply } from "redux/selectors/totalBalance";

const CardValueContainer = ({ totalSupply }) => {
    return (
        <CardValue totalSupply={totalSupply} currency="USD" difference={0} />
    );
};

const mapStateToProps = state => ({
    totalSupply: getTotalSupply(state)
});

export default connect(mapStateToProps)(CardValueContainer);
