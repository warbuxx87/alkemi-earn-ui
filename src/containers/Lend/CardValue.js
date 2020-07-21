import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Lend/CardValue";

import { getTotalDeposit } from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardValueContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalDeposit = useSelector(getTotalDeposit);

    return (
        <CardValue totalDeposit={totalDeposit} currency="USD" difference={0} />
    );
};

export default CardValueContainer;
