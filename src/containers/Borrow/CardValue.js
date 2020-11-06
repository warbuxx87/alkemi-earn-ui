import React from "react";
import { useSelector } from "react-redux";

import CardValue from "components/Borrow/CardValue";
import { getTotalBorrow } from "redux/selectors/data/totalBalance";

const CardValueContainer = () => {
    const totalBorrow = useSelector(getTotalBorrow);

    return (
        <CardValue totalBorrow={totalBorrow} currency="USD" difference={0} />
    );
};

export default CardValueContainer;
