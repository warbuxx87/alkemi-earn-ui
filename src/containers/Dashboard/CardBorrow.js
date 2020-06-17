import React from "react";
import { useSelector } from "react-redux";

import CardBorrow from "components/Dashboard/CardBorrow";
import { getTotalBorrow } from "redux/selectors/totalBalance";

import useFetchPrice from "hooks/useFetchPrice";

const CardValueContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalBorrow = useSelector(getTotalBorrow);

    return (
        <CardBorrow totalBorrow={totalBorrow} currency="USD" difference={0} />
    );
};

export default CardValueContainer;
