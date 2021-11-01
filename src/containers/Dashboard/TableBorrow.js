// Section 1: React/Redux low level imports
import React from "react";
import { connect, useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports
import TableBorrow from "components/Dashboard/TableBorrow";

// Section 3: Selectors
import {
    getBorrowActive,
    getAggregatedAlkApy,
} from "redux/selectors/data/borrow";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import { walletNetwork } from "redux/selectors/data/onboard";

import { getAlkApyPerMarket } from "redux/selectors/data/markets";

const TableBorrowContainer = ({ activeReserves }) => {
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const userWalletNetwork = useSelector(walletNetwork);

    const aggregatedAlkApy = useSelector(getAggregatedAlkApy);

    const alkApyPerMarket = useSelector(getAlkApyPerMarket);

    return (
        <TableBorrow
            activeReserves={activeReserves}
            /*currency="USD"*/ USDPrice={USDPrice}
            userWalletNetwork={userWalletNetwork}
            aggregatedAlkApy={aggregatedAlkApy}
            alkApyPerMarket={alkApyPerMarket}
        />
    );
};

const mapStateToProps = (state) => ({
    activeReserves: getBorrowActive(state),
});

export default compose(connect(mapStateToProps))(TableBorrowContainer);
