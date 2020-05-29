import React from "react";
import { connect } from "react-redux";

import CardValue from "components/Borrow/CardValue";
import { getTotalBorrow } from "redux/selectors/totalBalance";

const CardValueContainer = ({ totalBorrow }) => {
    return (
        <CardValue totalBorrow={totalBorrow} currency="USD" difference={0} />
    );
};

const mapStateToProps = state => ({
    totalBorrow: getTotalBorrow(state)
});

export default connect(mapStateToProps)(CardValueContainer);
