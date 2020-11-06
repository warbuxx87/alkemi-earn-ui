import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Lend/CardValue";

import { getTotalDeposit } from "redux/selectors/data/totalBalance";

const CardValueContainer = () => {
    const totalDeposit = useSelector(getTotalDeposit);

    return (
        <CardValue totalDeposit={totalDeposit} currency="USD" difference={0} />
    );
};

export default CardValueContainer;
