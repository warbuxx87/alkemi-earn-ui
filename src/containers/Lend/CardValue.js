import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Lend/CardValue";

import { getTotalSupply } from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardValueContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalSupply = useSelector(getTotalSupply);

    return (
        <CardValue totalSupply={totalSupply} currency="USD" difference={0} />
    );
};

export default CardValueContainer;
