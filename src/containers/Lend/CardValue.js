import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/UI/Cards/CardValue";

import { getTotalDeposit } from "redux/selectors/totalBalance";

const CardValueContainer = () => {
    const totalDeposit = useSelector(getTotalDeposit);

    return (
        <CardValue
            totalValue={totalDeposit}
            title="Total Deposits"
            currency="USD"
            difference={0}
        />
    );
};

export default CardValueContainer;
