import React from "react";
import { useSelector } from "react-redux";

import CardSupply from "components/Dashboard/CardSupply";
import { getTotalSupply } from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardSupplyContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalSupply = useSelector(getTotalSupply);

    return (
        <CardSupply totalSupply={totalSupply} currency="USD" difference={0} />
    );
};

export default CardSupplyContainer;
