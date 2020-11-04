import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/UI/Cards/CardValue";

import { getTotalBorrow } from "redux/selectors/totalBalance";

const CardValueContainer = () => {
    const totalBorrow = useSelector(getTotalBorrow);

    return (
        <CardValue
            totalValue={totalBorrow}
            title="Total Borrowed"
            currency="USD"
            difference={0}
        />
    );
};

export default CardValueContainer;
